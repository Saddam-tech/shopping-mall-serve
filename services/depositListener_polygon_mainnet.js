const Web3 = require("web3");
const { web3: web3API, wss_rpcURL } = require("../configs/configweb3");
const { contractaddr } = require("../configs/addresses");
const { abi: abierc20 } = require("../contracts/abi/ERC20");
const db = require("../models");
const { rmqenqueuemessage } = require("../services/rmqpub-admin");
let { nettype } = require("../configs/net");
// const nettype = "POLYGON_MAINNET";
// const rpcURL =
//   "wss://polygon-mainnet.g.alchemy.com/v2/lDhL3gYIjMiEHvhXY1z0J-ad9ugoU-Ec";
const { getethrep } = require("../utils/eth");
const { findone } = require("../utils/db");

async function getConfirmations(txHash) {
  try {
    // Instantiate web3 with HttpProvider
    const web3 = new Web3(web3API);

    // Get transaction details
    const trx = await web3.eth.getTransaction(txHash);

    // Get current block number
    const currentBlock = await web3.eth.getBlockNumber();

    // When transaction is unconfirmed, its block number is null.
    // In this case we return 0 as number of confirmations
    return trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber;
  } catch (error) {
    console.log(error);
  }
}
const { N_CONFIRMS_FOR_FINALITY_DEF } = require("./configs-tx-listners");
async function confirmEtherTransaction(
  jdata,
  confirmations = N_CONFIRMS_FOR_FINALITY_DEF
) {
  // 10) {
  let { uid, rxaddr, senderaddr, amount, txhash } = jdata;
  console.log("@@@@@@@@@@jdata", jdata);
  setTimeout(async () => {
    // Get current number of confirmations and compare it with sought-for value
    const trxConfirmations = await getConfirmations(txhash);
    console.log(
      "Transaction with hash " +
        txhash +
        " has " +
        trxConfirmations +
        " confirmation(s)"
    );

    if (trxConfirmations >= confirmations) {
      // Handle confirmation event according to your business logic
      await db["transactions"].update(
        {
          status: 1,
        },
        {
          where: {
            txhash: txhash,
            nettype,
          },
        }
      );
      await db["balances"].increment(["total", "avail"], {
        by: amount,
        where: { uid, typestr: "LIVE", nettype },
      });
      console.log(
        "Transaction with hash " + txhash + " has been successfully confirmed"
      );

      return;
    }
    // Recursive call
    return confirmEtherTransaction(jdata, confirmations);
  }, 30 * 1000);
}

const watchTokenTransfers = async () => {
  let jdata;
  console.log("watchstarted");
  // const web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/zhUm6jYUggnzx1n9k8XdJHcB0KhH5T7d'));
  const web3ws = new Web3(new Web3.providers.WebsocketProvider(wss_rpcURL));
  const tokenContract = new web3ws.eth.Contract(
    abierc20,
    contractaddr["USDT_BINOPT"],
    (error, result) => {
      if (error) console.log(error);
    }
  );
  let userWalletList = [];
  const options = {
    filter: {},
    fromBlock: "latest",
  };
  tokenContract.events.Transfer(options, async (err, ev) => {
    if (err) {
      console.log(err);
      return;
    }
    let txhash = ev.transactionHash;
    let { _value, _from, _to } = ev.returnValues;
    console.log(`Detected Deposit from ${_from} to ${_to} amount of ${_value}`);

    db["userwallets"]
      .findOne({
        where: { walletaddress: _to },
        raw: true,
      })
      .then(async (resp) => {
        if (resp) {
        } else {
          return;
        }
        let { uid } = resp;
        jdata = { uid, rxaddr: _to, senderaddr: _from, amount: _value, txhash };
        db["transactions"].create({
          uid: uid,
          amount: _value,
          // unit,
          type: 3,
          typestr: "DEPOSIT_FROM_OTHER_EXCHANGES",
          status: 0,
          txhash: txhash,
          rxaddr: _to,
          senderaddr: _from,
          nettype,
        });

        let userinfo = await findone("users", { id: uid });
        let amount = +getethrep(_value);
        rmqenqueuemessage({
          type: "CRYPTO-DEPOSIT",
          nettype, //
          ...jdata,
          amount, // : get ethrep ( _value ) ,
          username: userinfo.username,
        });
        if (true) {
          let respfee = await findone("feesettings", {
            key_: "FEE_CURRENCY_DEPOSIT_IN_BP",
          });
          if (respfee) {
            let feerate = +respfee.value_;
            if (feerate > 0) {
              let feeamount = (amount * feerate) / 10000;
              amount -= feerate;
              db["logfees"].create({
                // betId: id, //  payer_uid: uid, //  recipient_uid: winner_referer_uid,
                feeamount, // : fee_to_referer,
                typestr: "FEE_CURRENCY_DEPOSIT",
                txhash,
                nettype, //  betamount: v.amount, //  bet_expiry: expiry, //  assetId,
              });
            } else {
            }
          } else {
          }
        }

        true &&
          (await db["balances"].increment(["total", "avail"], {
            by: amount,
            where: { uid, typestr: "LIVE" },
          }));
        return;
        confirmEtherTransaction(jdata);
      });
  });
};

watchTokenTransfers();

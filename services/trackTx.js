const Web3 = require("web3");
const { web3: web3API // , wss _rpcURL
	, wss_rpcURLs
 } = require("../configs/configweb3");
const { contractaddr } = require("../configs/addresses");
const { abi: abierc20 } = require("../contracts/abi/ERC20");
let { nettype } = require("../configs/net");
const db = require("../models");
let { respok, resperr } = require("../utils/rest");

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

async function confirmEtherTransaction(
  res,
  txHash,
  uid,
  amount,
  confirmations = 10
) {
  setTimeout(async () => {
    // Get current number of confirmations and compare it with sought-for value
    const trxConfirmations = await getConfirmations(txHash);
    console.log(
      "Transaction with hash " +
        txHash +
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
            txhash: txHash,
            nettype,
          },
        }
      );
      await db["balances"].increment(["total", "avail"], {
        by: amount,
        where: { uid, typestr: "LIVE", nettype },
      });

      console.log(
        "Transaction with hash " + txHash + " has been successfully confirmed"
      );
      console.log(await web3API.eth.getTransaction(txHash));
      console.log(await web3API.eth.getTransactionReceipt(txHash));
      respok(res, "LISTENING-STARTED", "asdf", { txHash });

      return "Finished";
    }
    // Recursive call
    return // confirmEtherTransaction(res, txHash, uid, amount, confirmations);
  }, 30 * 1000);
}

function watchTransfers( { to, target, uid, res , nettype } ) {
  console.log("watchstarted");
  console.log("watchstarted");
	let wss_rpcURL = 	wss_rpcURLs [ nettype ] 
  const web3ws = new Web3(new Web3.providers.WebsocketProvider ( wss_rpcURL ));

  const tokenContract = new web3ws.eth.Contract(
    abierc20,
    contractaddr["USDT"],
    (error, result) => {
      if (error) console.log(error);
    }
  );

  const options = {
    filter: {
      _to: to,
    },
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
    await db["transactions"]
      .findOne({
        where: {
          txhash: txhash,
          nettype,
        },
      })
      .then(async (findDupe) => {
        if (!findDupe) {
          await db["transactions"].create({
            uid: uid,
            amount: _value,
            unit: target,
            type: 1,
            typestr: "DEPOSIT",
            txhash: txhash,
            status: 0,
            nettype,
          });
          confirmEtherTransaction(res, ev.transactionHash, uid, _value);

          return;
        } else {
          return;
        }
      });

    return;
  });
}

module.exports = {
  watchTransfers,
};

const Web3 = require("web3");
const { web3: web3API, // wss_rpcURL , 
	wss_rpcURLs
} = require("../configs/configweb3");
const { contractaddr } = require("../configs/addresses");
const { abi: abierc20 } = require("../contracts/abi/ERC20");
let { nettype } = require("../configs/net");
const db = require("../models");
const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");

async function getConfirmations(socket, txHash) {
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
    socket.emit("transactions", false);
    console.log(error);
  }
}

async function confirmEtherTransaction(
  socket,
  txHash,
  uid,
  amount,
  confirmations = 10
) {
  setTimeout(async () => {
    // Get current number of confirmations and compare it with sought-for value
    const trxConfirmations = await getConfirmations(socket, txHash);
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
        where: { uid, typestr: "LIVE" , // nettype 
				},
      });

      console.log(
        "Transaction with hash " + txHash + " has been successfully confirmed"
      );
      socket.emit("transactions", { txHash });

      // let messageBody = `[WITHDRAW ON GOING]
      //   user id: ${id}
      //   amount: ${amount / 10 ** 6}
      //   token: ${tokentype}
      //   admin address: ${ADMINADDR}
      //   to address: ${rxaddr}
      //   txhash: ${txhash}
      //   wit hdraw fee: ${feeamount}
      // `
      // sendTelegramBotMessage(messageBody)

      return "Finished";
    }
    // Recursive call
    return // confirmEtherTransaction(socket, txHash, uid, amount, confirmations);
  }, 30 * 1000);
}

function watchTransfers( { to
		, target
		, uid
		, txId
		, socket 
		, nettype } ) {
  console.log("watchstarted");
  console.log("watchstarted");
  // const web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/zhUm6jYUggnzx1n9k8XdJHcB0KhH5T7d'));
	if ( nettype ) {}
	else { throw '@nettype not specified@tracktx socket' ; return }
	let  wss_rpcURL = wss_rpcURLs [ nettype ]
 const web3ws = new Web3(new Web3.providers.WebsocketProvider(wss_rpcURL));

  const tokenContract = new web3ws.eth.Contract(
    abierc20,
    contractaddr["USDT_BINOPT"],
    (error, result) => {
      if (error) console.log(error);
    }
  );

  // to : 0xEED598eaEa3a78215Ae3FD0188C30243f48C23a5
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
    if (!txId) {
      await db["transactions"]
        .findOne({
          where: {
            txhash: txhash,
          },
        })
        .then(async (findDupe) => {
          console.log(findDupe);
          if (!findDupe) {
            await db["transactions"]
              .create({
                uid: uid,
                amount: _value,
                unit: target,
                type: 1,
                typestr: "DEPOSIT",
                txhash: txhash,
                status: 0,
                nettype,
              })
              .catch((err) => {
                console.log(err);
              });
            confirmEtherTransaction(socket, ev.transactionHash, uid, _value);

            return;
          } else {
            return;
          }
        });
      return;
    } else {
      await db["transactions"].update(
        {
          txhash: txhash,
          verifier: uid,
        },
        {
          where: {
            id: txId,
            nettype,
          },
        }
      );
      confirmEtherTransaction(socket, ev.transactionHash, uid, _value);
      return;
    }
    return;
  });
}

module.exports = {
  watchTransfers,
};

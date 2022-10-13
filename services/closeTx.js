const awaitTransaction = require("await-transaction-mined");
const { jweb3 , web3 } = require("../configs/configweb3");
const db = require("../models");

const TXREQSTATUS_POLL_INTERVAL = 3000;
const TXREQSTATUS_BLOCKCOUNT = 1; // 2 // 4 // 6
const TX_POLL_OPTIONS = {
  interval: TXREQSTATUS_POLL_INTERVAL,
  blocksToWait: TXREQSTATUS_BLOCKCOUNT,
};
const ASSETID_SYMBOL = [
  "___SKIPPER___",
  "BTC-USD",
  "ETH-USD",
  "XRP-USD",
  "EURUSD=X",
  "JPY=X",
  "GBPUSD=X",
  "CAD=X",
  "CHF=X",
  "9988.HK",
  "601398.SS",
  "601288.SS",
  "0700.HK",
  "600519.SS",
];

const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");

//closeTx({txhash, type:"DEPOSIT", tokentype: tokentype, userid: id, senderaddr, amount})
const closeTx = async (jargs) => {
  console.log("@@@@@@@@@@@@@@@@@@closeTx");
  let { txhash, type, tokentype, userid, senderaddr, amount, nettype } = jargs;
	let web3 = jweb3 [ nettype ] 
	if ( web3 ) {}
	else { LOGGER(`@undefined nettype @closeTx`) ; throw '@undefined nettype @closeTx'; return }
  console.log("jargs", jargs);
  awaitTransaction
    .awaitTx(web3, txhash, TX_POLL_OPTIONS)
    .then(async (txreceipt) => {
      let { status } = txreceipt;
      console.log(status, type);
			if ( status ) {}
			else { LOGGER(`@tx failed -${txhash} `) ; return }
      switch (type) {
        case "DEPOSIT":
          if (status) {
            await db["transactions"]
              .update(
                {                  status: 1,                },
                {                  where: {                    txhash: txhash,
//                    nettype,
                  },
                }
              )
              .then((_) => {
                db["balances"]
                  .increment(["total", "avail"], {
                    by: amount,
                    where: { uid: userid, typestr: "LIVE" // , nettype 
},
                  })
                  .then((_) => {
                    let messageBody = `[DEPOSIT SUCCESS]
                          user id: ${userid}
                          amount: ${amount / 10 ** 6}
                          token: ${tokentype}
                          senderaddr address: ${senderaddr}
                          txhash: ${txhash}
                          nettype: ${nettype}
                        `;
                    sendTelegramBotMessage(messageBody);
                    console.log(
                      `DEPOSIT:: UID: ${userid} to ADMIN, amount of ${amount} ${tokentype}. [nettype] : ${nettype}`
                    );
                  });
              });
          } else {
            await db["transactions"].update(
              {                status: 1 , // 2,
              },
              {                where: {                  txhash: txhash,
//                  nettype,
                },
              }
            );
          }
          break;
        case "TRANSFER":
          if (status) {
            let tx = await db["transactions"].findOne({
              where: { txhash, // nettype 
	},
            });
            tx.update({
              status: 1,
            });
            await db["balances"].increment(["avail", "total"], {
              by: amount,
              where: { uid: tx.uid, typestr: "LIVE", nettype },
            });
          }
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      console.log(err, jargs.txhash);
    });
};

module.exports = {
  closeTx,
};

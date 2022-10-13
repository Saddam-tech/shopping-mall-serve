const cron = require("node-cron");
const axios = require("axios");
const db = require("../models");
const { redisconfig } = require("../configs/redis.conf");
const cliredisa = require("async-redis").createClient(redisconfig);
const moment = require("moment");
let sec = 0;
let jNpoints = {};
const { get_time_closest_ticker } = require("../utils/tickers");
const get30secPrice = async (assetId, expiry, starting, i, temp) => {
  return new Promise((resolve, reject) => {
    db["assets"]
      .findOne({
        where: { active: 1, id: assetId },
        raw: true,
      })
      .then(async (resp) => {
        let { name, dispSymbol, socketAPISymbol, APISymbol: symbol } = resp;
        let currentPrice = await cliredisa.hget(
          "STREAM_ASSET_PRICE",
          socketAPISymbol
        );
        let timenow = moment().unix();
        //				let currentPrice = await get_time_closest_ticker( { symbol , reftimepointsec : timenow, output_is_object_or_scalar : 'scalar', timelengthinsec : 5
        //} )
        if (temp[name] && temp[name].length) {
          temp[name].push(currentPrice);
        } else {
          temp[name] = [currentPrice];
        }

        if (i === 29) {
          let periodPrice = JSON.stringify(temp[name]);
          db["tickers"].create({
            assetId,
            name,
            symbol: dispSymbol,
            periodPrice,
            expiryTime: expiry,
            startingTime: starting,
          });
          temp = {};
        }
        // console.log('temp', temp);
        //      return temp;
        resolve(temp);
      });
  });
};

const bettingHistory = (assetId, starting, expiry) => {
  let temp = {};
  let dur = expiry - starting;
  dur = (dur / 30).toFixed(0);
  // console.log(assetId, dur);
  // let temp = new Array(30);
  for (let i = 0; i < 30; i++) {
    let timeout = Number(i * dur * 1000);

    setTimeout(async (_) => {
      temp = await get30secPrice(assetId, expiry, starting, i, temp);
    }, timeout);
    /**     setTimeout(async () => {
      temp = await get30secPrice(assetId, expiry, i, temp);
    }, timeout); */
  }
};

cron.schedule("0 * * * * *", async () => {
  let time_now_unix = moment().startOf("minute").unix();
  await db["bets"]
    .findAll({
      where: { starting: time_now_unix },
      raw: true,
    })
    .then((resp) => {
      if (resp) {
        resp.map((bet) => {
          let { expiry, assetId } = bet;
          bettingHistory(assetId, time_now_unix, expiry);
        });
      }
    });
});
module.exports = { get30secPrice };

// cron.schedule('30-59 * * * * *', async () => {
//   let now = moment().format('HH:mm:ss');
//   sec++;
//   // console.log('now', now, temp, '/', sec);
//   get30secPrice();

//   if (sec === 30) {
//     await db['assets']
//       .findAll({
//         where: { active: 1 },
//         raw: true,
//       })
//       .then((resp) => {
//         let now_unix = moment().add(1, 'second').unix();
//         resp.forEach((el) => {
//           let { name, dispSymbol, id } = el;
//           let periodPrice = JSON.stringify(temp[name]);
//           db['tickers'].create({
//             assetId: id,
//             name,
//             symbol: dispSymbol,
//             periodPrice,
//             expiryTime: now_unix,
//           });
//         });
//         temp = {};
//         sec = 0;
//       });
//   }
//   // setInterval(async () => {
//   //   await db['assets']
//   //     .findAll({
//   //       where: { active: 1 },
//   //       raw: true,
//   //     })
//   //     .then((resp) => {
//   //       let now_unix = moment().unix();
//   //       resp.forEach((el) => {
//   //         let { name, dispSymbol, id } = el;
//   //         let periodPrice = JSON.stringify(temp[name]);
//   //         db['tickers'].create({
//   //           assetId: id,
//   //           name,
//   //           symbol: dispSymbol,
//   //           periodPrice,
//   //           expiryTime: now_unix,
//   //         });
//   //       });
//   //       temp = {};
//   //     });
//   // }, 30000);
// });

// CREATE TABLE `tickers` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `assetId` int(11) DEFAULT NULL,
//   `name` varchar(40) DEFAULT NULL,
//   `symbol` varchar(20) DEFAULT NULL,
//   `periodPrice` varchar(300) DEFAULT NULL,
//   `expiryTime` varchar(20) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

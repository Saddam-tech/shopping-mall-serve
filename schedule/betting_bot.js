const moment = require('moment');
const cron = require('node-cron');
const db = require('../models');
const cliredisa = require('async-redis').createClient();
const { ASSETID_REDIS_SYMBOL } = require('../utils/ticker_symbol');
const axios = require('axios');
// const ASSETID_REDIS_SYMBOL = [
//   '__SKIPPER__',
//   'btcusdt',
//   'ethusdt',
//   'xrpusdt',
//   'EUR/USD',
//   'USD/JPY',
//   'GBP/USD',
//   'USD/CAD',
//   'USD/CHF',
// ];

const betbot = async () => {
  let now = moment().format('MM/DD HH:mm:ss');
  let expiry_unix = moment().add(2, 'minutes').set('second', 0).unix();

  let starting_unix = moment().add(1, 'minutes').set('second', 0).unix();

  let assetList = await db['assets']
    .findAll({
      where: { id: 1, active: 1 },
      raw: true,
    })
    .then((resp) => {
      resp.forEach(async (el) => {
        let { id, APISymbol } = el;
        let currentPrice = await cliredisa.hget(
          'STREAM_ASSET_PRICE_PER_MIN',
          APISymbol
        );
        // for (let i = 0; i < 4; i++) {
        //   let uid_list = [93, 94, 95, 114];
        //   let amount = (
        //     Math.floor((Math.random() + 1) * 10 ** 2) *
        //     10 ** 6
        //   ).toFixed(0);
        //   let side = 'HIGH';
        //   if (i % 2 === 0) side = 'LOW';
        //   console.log('@@@@@@@@@@@amount =============', amount);
        //   await axios.post(
        //     `http://users.options1.net:30708/bets/bot/join/LIVE/1/${amount}/10/${side}/${uid_list[i]}`
        //   );
        //   // db['bets'].create({
        //   //   uid: uid_list[i],
        //   //   assetId: id,
        //   //   amount,
        //   //   starting: starting_unix,
        //   //   expiry: expiry_unix,
        //   //   side,
        //   //   type: 'LIVE',
        //   //   startingPrice: currentPrice,
        //   // });
        // }
        await axios.post(
          `http://users.options1.net:30708/bets/bot/join/LIVE/1/100000000/8/HIGH/93`
        );
        await axios.post(
          `http://users.options1.net:30708/bets/bot/join/LIVE/1/100000000/8/HIGH/94`
        );
        await axios.post(
          `http://users.options1.net:30708/bets/bot/join/LIVE/1/100000000/8/HIGH/95`
        );
        await axios.post(
          `http://users.options1.net:30708/bets/bot/join/LIVE/1/100000000/8/LOW/114`
        );
      });
    });
  // for (let j = 1; j <= 8; j++) {
  //   let currentPrice = await cliredisa.hget(
  //     'STREAM_AS SET_PRICE_PER_MIN',
  //     ASSETID_REDIS_SYMBOL[j]
  //   );
  //   for (let i = 0; i < 4; i++) {
  //     let uid_list = [93, 94, 95, 114];
  //     let amount = Math.floor(Math.random() * 10 ** 2) * 10 ** 6;
  //     let side = 'HIGH';
  //     if (i % 2 === 0) side = 'LOW';
  //     db['bets'].create({
  //       uid: uid_list[i],
  //       assetId: j,
  //       amount,
  //       starting: now_unix,
  //       expiry: timenow_unix,
  //       side,
  //       type: 'LIVE',
  //       startingPrice: currentPrice,
  //     });
  //   }
  // }
};

cron.schedule('15 * * * * *', async () => {
  let timenow_unix = moment().add(1, 'minutes').set('second', 0).unix();
  console.log('@betting_bot', timenow_unix);
  // betbot();
});

module.exports = { betbot };

// 15|betting_bot            | now 07/18 10:57:48
// 15|betting_bot            | now 07/18 10:58:00

// CREATE TABLE `demoUsers` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `uuid` varchar(100) default NULL,
//   PRIMARY KEY (`id`),
//   UNIQUE KEY `uuid` (`uuid`)
// )

// CREATE TABLE `balances` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `uid` int(11) unsigned NOT NULL,
//   `total` bigint(20) DEFAULT 0,
//   `locked` bigint(20) DEFAULT 0,
//   `avail` bigint(20) DEFAULT 0,
//   `typestr` varchar(20) DEFAULT NULL,
//   `isMember` tinyint(4) DEFAULT NULL,
//   PRIMARY KEY (`id`),
//   KEY `FK_users_uid` (`uid`),
//   CONSTRAINT `FK_users_uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
// )

// ALTER TABLE betlogs ADD CONSTRAINT `FK_demoUsers_uuid_bets` FOREIGN KEY (`uuid`) REFERENCES `demoUsers` (`uuid`) ON DELETE CASCADE;

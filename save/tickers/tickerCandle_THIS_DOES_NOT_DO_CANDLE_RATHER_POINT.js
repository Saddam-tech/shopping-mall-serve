const cron = require('node-cron');
const db = require('../models');
const cliredisa = require('async-redis').createClient();
const moment = require('moment');

const make1MinCandle = async () => {
  let now_unix = moment().unix()
  await db['assets']
    .findAll({
      where: { active: 1 },
      raw: true,
    })
    .then(async (resp) => {
      resp.map(async (el) => {
        let { APISymbol, id } = el;
				if ( APISymbol ) {}
				else { return null  }
        let price = await cliredisa.hget('STREAM_ASSET_PRICE', APISymbol);
        if(price) {
          db['tickercandles'].create({
            symbol: APISymbol,
            price: price,
            assetId: id,
            timestamp: now_unix
          });
        }
      });
      // await Promise.all(promises);
    });
};

cron.schedule('0 * * * * *', async () => {
  console.log('make1MinCandle');
  make1MinCandle();
});

// CREATE TABLE `tickercandles` (
//   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `symbol` varchar(50) DEFAULT NULL,
//   `price` varchar(40) DEFAULT NULL,
//   `assetId` int(11) unsigned DEFAULT NULL,
//   `timestamp` varchar(20) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// )
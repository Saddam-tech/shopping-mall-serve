const cron = require('node-cron');
const db = require('../models');
const cliredisa = require('async-redis').createClient();
const moment=require('moment')

const getTickerPrice_sec = async () => {
	let timestamp = moment().unix()
  await db['assets']
    .findAll({
      where: { active: 1 },
      raw: true,
    })
    .then(async (resp) => {
      resp.map(async (el) => {
        let { socketAPISymbol, APISymbol, id } = el;
				if ( socketAPISymbol ) {}
				else { return null  }
        let price = await cliredisa.hget('STREAM_ASSET_PRICE', socketAPISymbol);
				let volume = await cliredisa.hget('STREAM_ASSET_VOLUME' ,  socketAPISymbol )
        if(price) {
          await db['tickerprice'].create({
            symbol: socketAPISymbol,
            price: price,
            assetId: id
						, timestamp
						, volume : volume ? volume : null
          });
        }
      });
      // await Promise.all(promises);
    });
};

cron.schedule('* * * * * *', async () => {
  getTickerPrice_sec();
});

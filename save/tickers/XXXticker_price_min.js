const cron = require('node-cron');
const axios = require('axios');
const db = require('../models');
const cliredisa = require('async-redis').createClient();

const getTickerPrice = async () => {
  const assetList = await db['assets']
    .findAll({
      where: { active: 1 },
      raw: true,
    })
    .then(async (resp) => {
      resp.forEach(async (el) => {
        let { APISymbol } = el;
				if ( APISymbol ) {}
				else { return }
        let price = await cliredisa.hget('STREAM_ASSET_PRICE', APISymbol);
        if(price) {
          cliredisa.hset('STREAM_ASSET_PRICE_PER_MIN', APISymbol, price);
        }
      });
    });
};
cron.schedule('0 * * * * *', async () => {
  getTickerPrice();
});

module.exports = { getTickerPrice };
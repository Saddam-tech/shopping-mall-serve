const WebSocket = require('ws');
// const cr on = require('node-cr on');
const db = require('../models');
// const socket = new WebSocket('wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0');
const twelvedataSocket = new WebSocket(
  'wss://ws.twelvedata.com/v1/quotes/price?apikey=c092ff5093bf4eef83897889e96b3ba7'
);
const moment = require('moment');
const cliredisa = require('async-redis').createClient();
const getAssetSymbolList = async () => {
  let assetSymbolList = [];
  await db['assets'].findAll({
    where: { active: 1, group: 3 },
    raw: true,
  }).then((resp) => {
    resp.map((el) => {
      let { APISymbol } = el;
      assetSymbolList.push(APISymbol);
    })
  })
  let result = assetSymbolList.join()
  console.log(result);
  return result
}

const sendTwelveDataSocketEvent = async () => {
  let symbolList = await getAssetSymbolList();

  if(symbolList === '') {
    return;
  } else {}
  twelvedataSocket.addEventListener('open', function (event) {
    twelvedataSocket.send(
      JSON.stringify({ action: 'subscribe', params: { symbols: symbolList } })
    );
  });
  // Listen for messages
  twelvedataSocket.addEventListener('message', function (event) {
    let data = JSON.parse(event.data)
    let now = moment().format('HH:mm:ss')
    // let { event, symbol, price } = data
    if(data.event === 'price') {
      console.log('@twelvefetcher', now, '=>', data.exchange, data.symbol, data.price , data );
      cliredisa.hset('STREAM_ASSET_PRICE', data.symbol, data.price);
    }
  });
}

sendTwelveDataSocketEvent();

module.exports = { sendTwelveDataSocketEvent };

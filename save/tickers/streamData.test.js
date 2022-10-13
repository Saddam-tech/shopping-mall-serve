const cliredisa = require('async-redis').createClient();
const WebSocket = require('ws');
const cron = require('node-cron');
const db = require('../models');
let { Op } = db.Sequelize;
const axios = require('axios');
const moment = require('moment')

// const twelvedataSocket = new WebSocket(
//   'wss://ws.twelvedata.com/v1/quotes/price?apikey=8b2c34ddd230444a843f80a12d8c38b2'
// );
const twelvedataSocket = new WebSocket(
  'wss://ws.twelvedata.com/v1/quotes/price?apikey=c092ff5093bf4eef83897889e96b3ba7'
);
const finnhubSocket = new WebSocket(
  'wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0'
);

// finnhubSocket.addEventListener('open', function (event) {
//   finnhubSocket.send(
//     // JSON.stringify({ type: 'subscribe', symbol: 'BINANCE:BTCUSDT' })
//     JSON.stringify({ type: 'subscribe', symbol: 'GBP/USD' })
//     // JSON.stringify({ type: 'subscribe', symbol: '700.HK' })
//     // JSON.stringify({ type: 'subscribe', symbol: 'B' })
//     // 'BINANCE:BTCUSDT'
//   );
// });

// finnhubSocket.addEventListener('message', function (event) {
//   let resp = JSON.parse(event.data).data;
// // console.log(resp);
//   if(resp) {
//     resp.forEach((el) => {
//       let { p, s, t} = el;
//       t = moment(t).format('HH:mm:ss')
//       console.log(t, s, p);
//     })
//   }
// });

const getStreamStockData = async () => {
  await db['assets']
    .findAll({
      where: { active: 1, groupstr: 'stock' },
      raw: true,
    })
    .then((resp) => {
      if (resp) {
        // console.log(resp);
        resp.forEach((el) => {
          let { socketAPISymbol } = el;
          twelvedataSocket.addEventListener('open', function (event) {
            twelvedataSocket.send(
              JSON.stringify({
                action: 'subscribe',
                params: { symbols: socketAPISymbol },
              })
            );
          });
        });
      }
    });
};

twelvedataSocket.addEventListener('open', function (event) {
  twelvedataSocket.send(
    JSON.stringify({
      action: 'subscribe',
      params: { symbols: '0700' },
    })
  );
});

twelvedataSocket.addEventListener('message', function (event) {
  // console.log('Message from server ', JSON.parse(event.data));
  let data = JSON.parse(event.data);

  if (data.event === 'price') {
    console.log(data.symbol, data.price);
    // cliredisa.hset('STREAM_ ASSET_PRICE', data.symbol, data.price);
    // db['tickerprice'].create({
    //   symbol: data.symbol,
    //   price: data.price,
    // });
  }
});

const getStreamData = async () => {
  await db['assets']
    .findAll({
      where: { active: 1, groupstr: { [Op.not]: 'stock' } },
      raw: true,
    })
    .then((resp) => {
      if (resp) {
        resp.forEach((el) => {
          let { APISymbol, tickerSrc, groupstr, socketAPISymbol } = el;
          let socketSymbol = `${tickerSrc}:${APISymbol}`;
          tickerSrc = tickerSrc.toUpperCase();
          if (groupstr === 'crypto') {
            socketSymbol = `${tickerSrc}:${socketAPISymbol}`;
          }
          // console.log(socketSymbol);
          finnhubSocket.addEventListener('open', function (event) {
            finnhubSocket.send(
              JSON.stringify({ type: 'subscribe', symbol: socketSymbol })
              // JSON.stringify({ type: 'subscribe', symbol: 'B' })
              // 'BINANCE:BTCUSDT'
            );
          });
        });
      }
    });
};

// Listen for messages
// finnhubSocket.addEventListener('message', function (event) {
//   let resp = JSON.parse(event.data).data;
//   if (resp) {
//     resp.forEach((v) => {
//       let { s, p } = v;
//       s = s.split(':')[1];
//       p = p.toFixed(5);
//       // console.log(s, p);
//       cliredisa.hset('STRE AM_ASSET_PRICE', s, p);
//       // db['tickerprice'].create({
//       //   symbol: s,
//       //   price: p,
//       // });
//     });
//   }
// });

var unsubscribe = function (symbol) {
  finnhubSocket.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }));
};

// getStreamData();
// getStreamStockData();


// cron.schedule('* * * * * *', async () => {
//   getTwelveData();
// });

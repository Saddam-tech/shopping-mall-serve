// const cliredisa = require('async-redis').createClient();
// const WebSocket = require('ws');
// const cron = require('node-cron');
// const db = require('../models');
// let { Op } = db.Sequelize;
// const axios = require('axios');

// const twelvedataSocket = new WebSocket(
//   'wss://ws.twelvedata.com/v1/quotes/price?apikey=c092ff5093bf4eef83897889e96b3ba7'
// );
// const finnhubSocket = new WebSocket(
//   'wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0'
// );

// const getStreamStockData = async () => {
//   await db['assets']
//     .findAll({
//       where: { active: 1, groupstr: 'stock' },
//       raw: true,
//     })
//     .then((resp) => {
//       if (resp) {
//         // console.log(resp);
//         resp.forEach((el) => {
//           let { socketAPISymbol } = el;
//           twelvedataSocket.addEventListener('open', function (event) {
//             twelvedataSocket.send(
//               JSON.stringify({
//                 action: 'subscribe',
//                 params: { symbols: socketAPISymbol },
//               })
//             );
//           });
//         });
//       }
//     });
// };

// twelvedataSocket.addEventListener('message', function (event) {
//   // console.log('Message from server ', JSON.parse(event.data));
//   let data = JSON.parse(event.data);
//   // console.log(data);
//   if (data.event === 'price') {
//     cliredisa.hset('STREA M_ASSET_PRICE', data.symbol, data.price);
//     // db['tickerprice'].create({
//     //   symbol: data.symbol,
//     //   price: data.price,
//     // });
//   }
// });

// const getStreamData = async () => {
//   await db['assets']
//     .findAll({
//       where: { active: 1, groupstr: { [Op.not]: 'stock' } },
//       raw: true,
//     })
//     .then((resp) => {
//       if (resp) {
//         resp.forEach((el) => {
//           let { APISymbol, tickerSrc, groupstr, socketAPISymbol } = el;
//           let socketSymbol = `${tickerSrc}:${APISymbol}`;
//           tickerSrc = tickerSrc.toUpperCase();
//           if (groupstr === 'crypto') {
//             socketSymbol = `${tickerSrc}:${socketAPISymbol}`;
//           }
//           // console.log(socketSymbol);
//           finnhubSocket.addEventListener('open', function (event) {
//             finnhubSocket.send(
//               JSON.stringify({ type: 'subscribe', symbol: socketSymbol })
//               // JSON.stringify({ type: 'subscribe', symbol: 'B' })
//               // 'BINANCE:BTCUSDT'
//             );
//           });
//         });
//       }
//     });
// };

// // Listen for messages
// finnhubSocket.addEventListener('message', function (event) {
//   let resp = JSON.parse(event.data).data;
//   if (resp) {
//     resp.forEach((v) => {
//       let { s, p } = v;
//       s = s.split(':')[1];
//       p = p.toFixed(5);
//       // console.log(s, p);
//       cliredisa.hset('STREA M_ASSET_PRICE', s, p);
//       // db['tickerprice'].create({
//       //   symbol: s,
//       //   price: p,
//       // });
//     });
//   }
// });

// var unsubscribe = function (symbol) {
//   finnhubSocket.send(JSON.stringify({ type: 'unsubscribe', symbol: symbol }));
// };

// // getStreamData();
// // getStreamStockData();


// const getTwelveData = async () => {
//   await db['assets'].findAll({
//     where: { active: 1 },
//     raw: true,
//   }).then(async (resp) => {
//     resp.forEach(async (el) => {
//       let { APISymbol } = el;
//       // console.log(APISymbol);
//       if(APISymbol) {}
//       else { return }

//       await axios.get(`https://api.twelvedata.com/price?symbol=${APISymbol}&apikey=c092ff5093bf4eef83897889e96b3ba7`)
//       .then((resp) => {
//         let { price } = resp.data;
//         // console.log(APISymbol, price);
//         if(price) {
//           cliredisa.hset('STREAM _ASSET_PRICE', APISymbol, price);
//         }
//       })
//     })
//   })
// }


// cron.schedule('* * * * * *', async () => {
//   getTwelveData();
// });

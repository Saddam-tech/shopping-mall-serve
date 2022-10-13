const db = require('../models');
let { Op } = db.Sequelize;
let moment = require('moment');
const LOGGER = console.log;
const { ASSETID_SYMBOL } = require('../utils/ticker_symbol');
let timenow = moment().startOf('minute');
let now_unix = moment().startOf('minute').unix();
const { calculate_dividendrate } = require('../schedule/XXX-calculateDividendRate');
module.exports = (io, socket) => {
  socket.on('dividendrate', async (data) => {    // console.log(    //   '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',    //   socket.id,    //   'ON'    // );
    let { assetList, min } = data;
    let expiry_time = moment().add(min + 1, 'minutes').set('second', 0).unix();
    if (Array.isArray(assetList)) {
     let dividendrate = await calculate_dividendrate(
        assetList,
        'LIVE',
        expiry_time
      );
      socket.emit('dividendrate', dividendrate);       // console.log(      //   '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',      //   socket.id,      //   'SEND'      // );
 /**      socket.emit('dividendrate', null );       // console.log(      //   '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',      //   socket.id,      //   'SEND'      // );
*/
    }
  });
};
/** const calculate_dividendrate_sec = async (assetList, type) => {
  let result = [];
  for (let i = 0; i < assetList.length; i++) {
    await db['bets']
      .findAll({
        where: {
          assetId: assetList[i],
          type,
        },
        raw: true,
      })
      .then(async (resp) => {
        let sorted_bets = {};
        resp.map((bet) => {
          let { expiry } = bet;

          // let expiry_date = moment.unix(expiry).format('YYYY-MM-DD HH:mm:ss');
          if (!sorted_bets[expiry]) {
            sorted_bets[expiry] = [bet];
          } else {
            sorted_bets[expiry].push(bet);
          }
        });

        if (Object.keys(sorted_bets).length === 0) {
          // LOGGER(v, '@no bets');
        } else {
          result.push(calculatebets(assetList[i], sorted_bets, type));
        }
      });
  }
  return result;
}; */

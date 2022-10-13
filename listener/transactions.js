const db = require('../models');
const { watchTransfers } = require('../services/trackTx_socket');
let { Op } = db.Sequelize;
let moment = require('moment');
const { redisconfig } = require('../configs/redis.conf' )
const cliredisa = require('async-redis').createClient(redisconfig );
module.exports = (io, socket) => {
  socket.on('transactions', async (data, cb) => {
    if (!socket.decoded) {      new Error('Authentication error');
    }
    let { id, wallet , nettype } = socket.decoded;
    let { type, txId } = data;
    console.log('type', type);    console.log('id', id);    console.log('@@@@@@@@@@@@@@@@@@transactions');
    await watchTransfers( { to : wallet
			, target : type
			, uid : id
			, txId
			, socket
			, nettype } );
  });
  socket.on('bet', async (data, cb) => {
    if (!socket.decoded) {      new Error('Authentication error');    }
    let id;    let respdata;
    if (socket.decoded.id) {      id = socket.decoded.id;
      respdata = await db['bets'].findAll({ // all bets of the user
        where: {          uid: id,        },
        include: [          {            model: db['assets'],            attributes: ['name', 'socketAPISymbol'],            nest: true,          },        ],
        order: [['id', 'DESC']],
        nest: true,        raw: true,
      });
      if (!respdata) {        return;
      }
    }
    if (socket.decoded.demo_uuid) {       let uuid = socket.decoded.demo_uuid;
      respdata = await db['bets'].findAll({ // all bets of the user
        where: {          uuid: uuid,        },
        include: [          {            model: db['assets'],            attributes: ['name', 'socketAPISymbol'],            nest: true,          },        ],
        order: [['id', 'DESC']],
        nest: true,        raw: true,
      });
      if (!respdata) {        return;      }
    }     // let curre ntPrice = Math.random();//현재 시세
    let list = await Promise.all (
      respdata.map(async (v) => {         // console.log(v);
        let currentPrice = await cliredisa.hget(
          'STREAM_ASSET_PRICE',
          v.asset.socketAPISymbol
        );
        let high_bet_amount = await db['bets'].findAll({
          where: {            expiry: v.expiry,            type: v.type,            assetId: v.assetId,            side: 'HIGH',          },
          attributes: [            'amount',            [              db.Sequelize.fn('sum', db.Sequelize.col('amount')),              'high_bet_amount',            ],          ],
          raw: true,
        });
        let low_bet_amount = await db['bets'].findAll({
          where: {            expiry: v.expiry,            assetId: v.assetId,            type: v.type,            side: 'LOW',          },
          attributes: [            'amount',            [              db.Sequelize.fn('sum', db.Sequelize.col('amount')),              'low_bet_amount',            ],          ],
          raw: true,
        });
        high_bet_amount = high_bet_amount[0].high_bet_amount / 10 ** 6;
        low_bet_amount = low_bet_amount[0].low_bet_amount / 10 ** 6;        // console.log(winnerTotalAmount, loserTotalAmount);        // let diffRate = 0;        // if (!winnerTotalAmount || !loserTotalAmount) {        //   diffRate = 0;        // } else {        //   diffRate = Number(loserTotalAmount) / Number(winnerTotalAmount);        // }
        return {          ...v,
          high_bet_amount,
          low_bet_amount,
          currentPrice // : curre ntPrice,
        };
      })
    );    // console.log('list', list);
    cb(list);
  });
};

//  {
//     id: 423980,
//     createdat: 2022-07-26T09:07:16.000Z,
//    updatedat: 2022-07-26T09:07:16.000Z,
//    uid: 114,
//    assetId: 1,
//    amount: 28000000,
//     starting: 1658826420,
//    expiry: 1658826480,
//    startingPrice: '21091.90000',
//     side: 'HIGH',
//     type: 'LIVE',
//     uuid: null,
//     diffRate: '249.23',
//     asset: { name: 'Bitcoin', socketAPISymbol: 'BTCUSDT' },
//    winnerTotalAmount: 929,
//    loserTotalAmount: 2118,
//     curre ntPrice: '21065.30000'
//   },

/*


GET:: /transactions/branch/list

유저-> 총판 입금 기록 입니다.

Header:: {JWTtoken}

*/
        // let winnerTotal = await db['bets'].findAll({
        //   where: {
        //     expiry: v.expiry,
        //     [Op.or]: [
        //       {
        //         [Op.and]: [
        //           { startingPrice: { [Op.lt]: curren tPrice } },
        //           { side: 'LOW' },
        //         ],
        //       },
        //       {
        //         [Op.and]: [
        //           { startingPrice: { [Op.gt]: curre ntPrice } },
        //           { side: 'HIGH' },
        //         ],
        //       },
        //     ],
        //   },
        //   attributes: [
        //     'amount',
        //     [db.Sequelize.fn('sum', db.Sequelize.col('amount')), 'winnerTotal'],
        //   ],
        //   raw: true,
        // });

        // let loserTotal = await db['bets'].findAll({
        //   expiry: v.expiry,
        //   where: {
        //     [Op.or]: [
        //       {
        //         [Op.and]: [
        //           { startingPrice: { [Op.gt]: curren tPrice } },
        //           { side: 'LOW' },
        //         ],
        //       },
        //       {
        //         [Op.and]: [
        //           { startingPrice: { [Op.lt]: cur rentPrice } },
        //           { side: 'HIGH' },
        //         ],
        //       },
        //     ],
        //   },
        //   attributes: [
        //     'amount',
        //     [db.Sequelize.fn('sum', db.Sequelize.col('amount')), 'loserTotal'],
        //   ],
        //   raw: true,
        // });


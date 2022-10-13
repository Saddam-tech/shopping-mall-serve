// var express = require('express'); // const jwt = require('jsonwebtoken'); // const { auth } = require('../utils/authMiddleware');
const db = require("../models");
var moment = require("moment");
const LOGGER = console.log;
const cron = require("node-cron");
let { Op } = db.Sequelize; // const timenow = moment().startOf('minute');
const { ASSETID_SYMBOL } = require("../utils/ticker_symbol");
const { redisconfig } = require('../configs/redis.conf' )
const cliredisa = require("async-redis").createClient( redisconfig );
const { findall, createrow } = require("../utils/db");
const {  get_valid_tickers_with_min_timediff_from_reftime,
	get_time_closest_ticker
} = require("../utils/tickers");
const B_WRITE_TO_BETS_TABLE = false
const calculate_dividendrate = async (assetList, type, expiry) => {
  let result = []; // let [date0, date1] = round;
  for (let i = 0; i < assetList.length; i++) {    // timenow_unix = moment().add(1, 'minutes').set('second', 0).unix();
    await db["bets"]      .findAll({
        where: { assetId: assetList[i], expiry, type },
        raw: true,
    })
     .then(async (resp) => {
        if (resp.length === 0) {
          result.push({
            assetId: assetList[i],
            round: expiry,
            low_side_amount: 0,
            high_side_amount: 0,
            dividendrate: {
              low_side_dividendrate: 0,
              high_side_dividendrate: 0,
            },
            bet_count: 0,
          }); // await d b['bets'].upd ate(          //   { diff Rate: 0 },          //   {          //     where: {          //       assetId: assetList[i],          //       expiry,          //       side: 'HIGH',          //       type,          //     },          //   }          // );          // await d b['bets'].up date(          //   { di ffRate: 0 },          //   {          //     where: { assetId: assetList[i], expiry, side: 'LOW', type },          //   }          // );
        }
        let sorted_bets = {};
        resp.map((bet) => {
          let { expiry } = bet; // let expiry_date = moment.unix(expiry).format('YYYY-MM-DD HH:mm:ss');
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
};
let jtickers_by_i = {};
let jtickers_by_symbol = {};
const ISFINITE=Number.isFinite
const get_tickers_uses_timestamped_tickers = async ({ reftimepointsec }) => {
/**  let jtickers_by_symbol =    await get_valid_tickers_with_min_timediff_from_reftime({
      reftimepointsec,
      timedeltarequiredsec: 1000,
    }); // jsymbol_ticker */
  let list_assets = await findall("assets", { active: 1 , APISymbol : { [ Op.ne ] : null } });
  list_assets.forEach(async (elem) => {
    let { APISymbol: symbol, id } = elem;
		if ( symbol ) {} else { return }
    let price = await get_time_closest_ticker( { symbol // : ''
			, reftimepointsec
			, output_is_object_or_scalar : 'scalar'
			, timelengthinsec : 1  
//			, timelengthinsec : 5 // '5' 
		} )// cliredisa.hgetall("STREAM_ASSE T_PRICE");
		if ( ISFINITE( +price ) ) {} // && list_i tickers[symbol] ){}
		else { return }
//    let price = lis t_tickers[symbol];
    jtickers_by_symbol[ symbol  ] = price;
    jtickers_by_i[ id ] = price;
  });
};
/** const get_tickers_legacy = async () => {
  let list_assets = await findall("assets", { active: 1 });
  let list_tickers = await cliredisa.hgetall("STR EAM_ASSET_PRICE");
  list_assets.forEach((elem) => {
    let { APISymbol: symbol, id } = elem;
    let price = list_tickers[symbol];
    jtickers_by_symbol[symbol] = price;
    jtickers_by_i[id] = price;
  }); // LOGGER('jtickers_by_i', jtickers_by_i);  // LOGGER('jtickers_by_symbol', jtickers_by_symbol);
  return { jtickers_by_i, jtickers_by_symbol }; // true
}; */
let get_tickers = get_tickers_uses_timestamped_tickers;
const tell_win_lose = (bet) => {
  // win : 1 , tie : 0 , lose : -1
  let deltaprice =
    Number(jtickers_by_i[bet?.assetId]) - Number(bet.startingPrice);
  let { side } = bet;
  let win_lose;
  if (deltaprice > 0) {
    if (side == "LOW") {
      win_lose = -1; // return -1;
    } else if (side == "HIGH") {
      win_lose = 1; // return +1;
    }
  } else if (deltaprice < 0) {
    if (side == "LOW") {
      win_lose = 1; // return +1;
    } else if (side == "HIGH") {
      win_lose = -1; // return -1;
    }
  } else if (deltaprice === 0) {
    win_lose = 0; // return 0;
  } // console.log(bet.uid,bet.startingPrice,jtickers_by_i[bet?.assetId], deltaprice, win_lose);
  return win_lose;
};
const calculatebets = (i, sorted_bets, type) => {
  // console.log('sorted_bets', sorted_bets);
  let result;
  let rounds = Object.keys(sorted_bets); // LOGGER('@rounds', rounds);
  let start_price;
  const calculate_sorted_bet = async (index, round, bets) => {
    // console.log('bets', round, bets);
    let expiry_;
    let bet_count = 0;
    let low_side_amount = 0;
    let high_side_amount = 0;
    let win_side_amount = 0;
    let lose_side_amount = 0;
    let low_side_dividendrate = 0;
    let high_side_dividendrate = 0;
    let win_side_dividenedrate = 0;
    let lose_side_dividenedrate = 0;
    bets.map(async (bet, i) => {
      let { id, side, amount, expiry, startingPrice } = bet;
      start_price = startingPrice;
      amount = amount / 10 ** 6;
      expiry_ = expiry; // console.log(expiry_, bet);
      let win_lose = tell_win_lose(bet);
      let case_combo = `${win_lose}_${side}`;
      ++bet_count;
      switch (case_combo) {
        case "1_HIGH":
          high_side_amount += amount; // win_side_amount += amount;
          break;
        case "-1_HIGH":
          high_side_amount += amount; // lose_side_amount += amount;
          break;
        case "1_LOW":
          low_side_amount += amount; // win_side_amount += amount;
          break;
        case "-1_LOW":
          low_side_amount += amount; // lose_side_amount += amount;
          break;
      }
      // console.table({ win_lose });
			if ( B_WRITE_TO_BETS_TABLE ) { 
      if (win_lose === 1) {
        win_side_amount += amount;
        await db["bets"].update({ status: 1 }, { where: { id: id } });
      } else if (win_lose === -1) {
        lose_side_amount += amount;
        await db["bets"].update({ status: 0 }, { where: { id: id } });
      } else if (win_lose === 0) {
        await db["bets"].update({ status: 2 }, { where: { id: id } });
      }
			}
      /**      if (side === 'HIGH') {        bet_count++;      high_side_amount += amount;      } else if (side === 'LOW') {        bet_count++;        low_side_amount += amount;      } */
      // d b['bets'].upd ate(      //   { di ffRate: low_side_dividendrate },      //   { where: { assetId: index, expiry: expiry_, side: 'LOW', type } }      // );
    });
    if (lose_side_amount === 0) {      win_side_dividenedrate = "0";
    } else {      win_side_dividenedrate = (        (lose_side_amount / win_side_amount) *        100      ).toFixed(2);
    } // lose_side_dividenedrate = (    //   (win_side_amount / lose_side_amount) *    //   100    // ).toFixed(2);
    lose_side_dividenedrate = 0;
    if (win_side_amount === 0) {      win_side_dividenedrate = "0";    }
    low_side_dividendrate = (      (high_side_amount / low_side_amount) *      100    ).toFixed(2);
    high_side_dividendrate = (      (low_side_amount / high_side_amount) *      100    ).toFixed(2);
    if (low_side_amount !== 0 || high_side_amount !== 0) {
      if (low_side_amount === 0) {        low_side_dividendrate = high_side_amount;
      }
      if (high_side_amount === 0) {        high_side_dividendrate = low_side_amount;
      }
    }
    if (low_side_amount === 0 && high_side_amount === 0) {
      high_side_dividendrate = 0;
      low_side_dividendrate = 0;
    } // console.log('win_side_dividenedrate', round, win_side_dividenedrate);    // console.log('lose_side_dividenedrate', lose_side_dividenedrate);    // d b['logrounds'].create({    //   assetId: index,    //   totalLowAmount: low_side_amount,    //   totalHighAmount: high_side_amount,    //   expiry: expiry_,    //   type,    //   lowDiffRate: low_side_dividendrate,    //   highDiffRate: high_side_dividendrate,    //   startingPrice:start_price,    // });
    result = {
      assetId: index,
      round,
      low_side_amount,
      high_side_amount,
      lose_side_dividenedrate,
      win_side_dividenedrate,
      dividendrate: { low_side_dividendrate, high_side_dividendrate },
      bet_count,
    };
		if ( B_WRITE_TO_BETS_TABLE ) { 
	    await db["bets"].update(      { diffRate: win_side_dividenedrate },      { where: { status: 1, expiry: expiry_ } }
  	  );
	    await db["bets"].update(      { diffRate: lose_side_dividenedrate },      { where: { status: 0, expiry: expiry_ } }
  	  );
	    await db["bets"].update(      { diffRate: "0" },      { where: { status: 2, expiry: expiry_ } }
  	  );
		}
  };
  rounds.map((round) => {
    // console.log(i, round, sorted_bets[round]);
    calculate_sorted_bet(i, round, sorted_bets[round]);
  });
  return result;
}; // end func calculatebets
const calculate_dividendrate_sec = async (assetList, type) => {
  let result = [];
  for (let i = 0; i < assetList.length; i++) {
    await db["bets"]      .findAll({
        where: {
          assetId: assetList[i],
          type,
        },
        raw: true,
      })
      .then(async (resp) => {
        let sorted_bets = {};
        resp.map((bet) => {
          let { expiry } = bet; // let expiry_date = moment.unix(expiry).format('YYYY-MM-DD HH:mm:ss');
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
};
const calculate_dividendrate_my = async (userId, type) => {
  let result = [];
  for (let i = 0; i < assetList.length; i++) {
    await db["bets"]      .findAll({
        where: {
          // assetId: assetList[i],
          uid: userId,
          type,
        },
        raw: true,
      })
      .then(async (resp) => {
        let sorted_bets = {};
        resp.map((bet) => {
          let { expiry } = bet; // let expiry_date = moment.unix(expiry).format('YYYY-MM-DD HH:mm:ss');
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
};
/** false && cr on.schedule("* * * * * *", async () => {
  // LOGGER('@Calculate dividendrates', moment().format('HH:mm:ss', '@binopt'));
  const reftimepointsec = moment().startOf("second").unix();
  await get_tickers({ reftimepointsec });
	//	LOGGER( '@jtickers' , jtickers_by_i , jtickers_by_symbol  )

  let assetList = await db["assets"]    .findAll({
      where: {
        active: 1,
      },
      attributes: ["id"],
      raw: true,
    })
    .then((resp) => {
      let result = [];
      resp.map((el) => {
        result.push(el.id);
      });
      return result;
    }); // console.log('assetList', assetList);  // calcul ate_dividendrate(assetList, 'LIVE', expiry);  // calcul ate_dividendrate(assetList, 'DEMO', expiry);
  calculate_dividendrate_sec(assetList, "LIVE");
  calculate_dividendrate_sec(assetList, "DEMO");
}); */

module.exports = {
  calculate_dividendrate, // => listener/divdendrate , routes/queries , schedule/closeBets
  calculate_dividendrate_sec, // => schedule/closeBets
  //  ge t_tickers,
  //  calculate_dividendrate_my,
};
/** functions in here 
const calculate_dividendrate = async (assetList, type, expiry) => {
const ge t_tickers = async () => {
const tell_win_lose = (bet) => {  // win : 1 , tie : 0 , lose : -1
const calculatebets = (i, sorted_bets, type) => {  // console.log('sorted_bets', sorted_bets);
const calculate_dividendrate_sec = async (assetList, type) => {
const calculate_dividendrate_my = async (userId, type) => {
*/

var express = require('express');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/authMiddleware');
const db = require('../models');
var moment = require('moment');
const LOGGER = console.log;
const cron = require('node-cron');
const axios = require('axios');
const { findone}=require('../utils/db')
let { Op } = db.Sequelize;
let { I_LEVEL } = require('../configs/userlevel');
const {
  ASSETID_API_SYMBOL,
  ASSETID_MARKET,
  ASSETID_REDIS_SYMBOL,
} = require('../utils/ticker_symbol');
// const cli redisa = require('async-redis').createClient();
const { // calculate_divid endrate, 
calculate_dividendrate_sec } = require('./XXX-calculateDividendRate');
const EXPONENT_FOR_PREC_DEF = 6;
const MAP_SIGN_OF_DELTA_PRICES_TO_SIDE = { 1: 'HIGH', 0: 'TIE', '-1': 'LOW' };

const B_REFERENCE_BRANCH_TABLE = false 
const B_IS_ROUNDDOWN_PROFIT = true
const B_ROUNDDOWN_PROFIT_DECIMALPOINT = 3 // 2 // 3

const B_DESTROY_IN_BULK = true
const B_CREATE_LOGFEES_IN_BULK = true
const B_CREATE_BULK1_OR_PIECE0 = 1 

/** const B_DESTROY_IN_BULK = false 
const B_CREATE_LOGFEES_IN_BULK = false
const B_CREATE_BULK1_OR_PIECE0 = 0 */

let arrbulktocreate=[] , arrbulktodelete=[], arrbulklogfees=[]
	let jfeesets // = await getfeesettings( )
const { get_valid_tickers_with_min_timediff_from_reftime 
	, get_valid_tickers_with_orderterm
} =require('../utils/tickers')
const GET_DECIMAL_REP = variable => (+variable/10**EXPONENT_FOR_PREC_DEF).toFixed(1)
const TelegramBot = require('node-telegram-bot-api');
const token = '5476345761:AAHu7pgjWdMFXZF-FvugQI3pM9t12FWI3Rw';
const bot = new TelegramBot(token);
const bot_option = true
const ISFINITE = Number.isFinite 
const { updatelogdaily } = require('../utils/logdaily');
const { convaj } = require( '../utils/common' )
 
cron.schedule('0 * * * * *', async () => {
	const timerefsec = moment().startOf('minute').unix()
  closeBet( ( { timerefsec } ));
  console.log('@Round Checkings', moment().format('HH:mm:ss'), '@binopt');
});
const rounddown_at_nth_decimal_place=({num , nth })=>{
	num = ''+num
	num = num.slice(0, (num.indexOf(".")) + nth ); //With 3 exposing the hundredths place
	return Number(num)
}
const getfeesettings=async _=>{
	let resp = await db[ 'feesettings' ].findAll ({raw:true,where:{}})
	let jfeesets = convaj ( resp , 'key_' , 'value_' )
	return jfeesets
}
const MAP_TYPEINT_TYPESTR= { 0 : 'LIVE' , 1 : 'DEMO' } 
let admin
const closeBet = async ( { timerefsec  } ) => {
  const timenow = moment().startOf('minute');
  console.log('closeBets', timenow.unix());
	arrbulktocreate=[] , arrbulktodelete=[], arrbulklogfees=[]
	jfeesets = await getfeesettings( )
  // 총판 수수료 설정 불러오기 //  let FEE_TO_BRANCH = await d b['feese ttings']    .findOne({      where: { key_: 'FEE_TO_BRANCH' },      raw: true,    })    .then((resp) => {      let { value_ } = resp;      return value_;    });
  // 본사 수수료 설정 불러오기 //  let FEE_TO_ADMIN = await d b['feeset tings']    .findOne({      where: { key_: 'FEE_TO_ADMIN' },      raw: true,    })    .then((resp) => {      let { value_ } = resp;      return value_;    });
	let FEE_TO_BRANCH = jfeesets ['FEE_TO_BRANCH' ]  
	let FEE_TO_ADMIN = jfeesets ['FEE_TO_ADMIN' ]
	admin = await db['users'].findOne({               where: { isadmin: 2 },               raw: true,             });
  // 베팅 지원 종목 리스트 불러오기
	let jsymbol_ticker  /**	jsymbol_ticker = await get_valid_tickers_with_min_timediff_from_reftime ( { 		reftimepointsec : timerefsec 		, timedeltarequiredsec : 1000  } ) */
	jsymbol_ticker = await get_valid_tickers_with_orderterm ({			reftimepointsec : timerefsec 		, timedeltarequiredsec : 10		, orderterm : 'gt'
	}) //  let assetList = 	await 
		db['assets']    .findAll({      where: { active: 1 },      raw: true,    })
    .then(async (resp) => {      let assetList = [];
      resp.map((el) => {        assetList.push(el.id);      });
//      calculate_dividendrate_sec(assetList, 'LIVE');
  //    calculate_dividendrate_sec(assetList, 'DEMO');
      for (let type = 0; type < 2; type++) {        if (type === 0) {          type = 'LIVE';        } else if (type === 1) {          type = 'DEMO';        }
        resp.map(async (v, i) => {
          let { id, APISymbol, name } = v; let symbol = APISymbol
          let exists = new Promise(async (resolve, reject) => {            // 종목별로 만료시간(expiry) 가 지금인 베팅들 조회// type,
            await db['bets'] .findAll({ where: { assetId: id, expiry: timenow.unix(),},                raw: true,
              })
              .then(async (bets) => {
                if (bets.length === 0) {  return; }
                // 현재 0초 종목 가격 조회
								let currentPrice = jsymbol_ticker [ symbol ]
								if ( ISFINITE( +currentPrice ) ){}
								else { LOGGER (`@closing price not available-bet: ${symbol} ,${timerefsec}`) ; return }  //                let currentPrice = await cli redisa.hget(                  'STREAM_AS SET_PRICE_PER_MIN',                  APISymbol                );
                // status 0: 패 / 1: 승 / 2: 무
                let status;                let live_demo = [0, 0];                let sumBetAmount_lose_win = [0, 0];                let dividendrate_high;                let dividendrate_low;                let startPrice;                let totalAmount = 0;
                // 조회한 베팅들 시작가 종가 비교하여 승패 결정                // winside, loseside 총 베팅금액 합산
                // 배당률 기록                // bets 테이블 => bet logs 테이블로 이동
for ( let idx =0 ; idx < bets.length ; idx ++){
	let elem = bets [ idx ]
	startPrice = elem.startingPrice
	let signdprice_betside_combo = `${Math.sign( currentPrice - elem.startingPrice)}_${elem.side}`
	let amount = + elem.amount
	totalAmount += amount;
	switch ( signdprice_betside_combo ){
		case '0_HIGH' : status =2  ;		break //			sumBetAmount_lose_win[1] += v.amount;
		case '0_LOW' : status = 2;		break
		case '1_HIGH' : status = 1;			sumBetAmount_lose_win[1] += amount;		break
		case '-1_HIGH' : status = 0;			sumBetAmount_lose_win[0] += amount;		break
		case '1_LOW' : status = 0;			sumBetAmount_lose_win[0] += amount;		break
		case '-1_LOW' : status = 1;			sumBetAmount_lose_win[1] += amount;		break
	}
} 
let amt_either_side_0 = sumBetAmount_lose_win[ 0] < 1 || sumBetAmount_lose_win[ 1] < 1  // let B_CREATE_BULK1_OR_PIECE0 = 1 , arrbu lktocreate=[] , arrbulktodelete=[], arrbulklogfees=[]
                for(let i = 0; i < bets.length; i++) {
                  let v = bets[i]
                  startPrice = v.startingPrice;
                  if (!startPrice) {
                    console.log('@@@ no startingPrice');
                  }
                  if (v.expiry == timenow.unix() ) {
                    if (v.startingPrice == currentPrice) {                      status = 2;
                      if (v.side.toUpperCase() == 'HIGH') {                         dividendrate_high = v.diffRate; //                        totalAmount += v.amount;//                        sumBetAmount_lose_win[1] += v.amount;
                      } else {                         dividendrate_low = v.diffRate; //                        totalAmount += v.amount;//                        sumBetAmount_lose_win[0] += v.amount;
                      }
                    } else if (v.startingPrice > currentPrice) {                      //가격이 떨어짐
                      if (v.side.toUpperCase() == 'HIGH') {                        dividendrate_high = v.diffRate;                        status = 0; //                        sumBetAmount_lose_win[0] += v.amount;  //                      totalAmount += v.amount;
                      } else {                        dividendrate_low = v.diffRate;                        status = 1; //                        sumBetAmount_lose_win[1] += v.amount;  //                      totalAmount += v.amount;
                      }
                    } else if (v.startingPrice < currentPrice) {
                      if (v.side.toUpperCase() == 'HIGH') {                        status = 1;                        dividendrate_high = v.diffRate; //                        sumBetAmount_lose_win[1] += v.amount; //                        totalAmount += v.amount;
                      } else {                        status = 0;                        dividendrate_low = v.diffRate; //                        totalAmount += v.amount;//                        sumBetAmount_lose_win[0] += v.amount;
                      }
                    } else {                      status = 3;
                    }
                    let winAmount;
if ( amt_either_side_0 == true ){	winAmount = 0
} else {
                    if(status === 0) {       winAmount = 0
} else if(status === 1) {winAmount = (((+v.amount / 10 ** EXPONENT_FOR_PREC_DEF) *+v.diffRate) / 100).toFixed(2)
                    } else if(status === 2) {winAmount = 0
                    }
}  /**                    if(status === 0) {                      winAmount = 0                    } else if(status === 1) {                      winAmount = (((+v.amount / 10 ** EXPONENT_FOR_PREC_DEF) *                      +v.diffRate) /                    100).toFixed(2)                    } else if(status === 2) {                      winAmount = 0                    } */
                    if (v.type === 'LIVE') {
                      live_demo[0] = live_demo[0] + 1;
												let jdata={                 
uid: v.uid,                          assetId: v.assetId,                          amount: v.amount,                          starting: v.starting,                          expiry: v.expiry,                          startingPrice: v.startingPrice,                          side: v.side,                          type: v.type,
                          assetName: name,                          endingPrice: currentPrice,                          status: status,                          diffRate: amt_either_side_0 ? '0' : v.diffRate ,                           winamount: amt_either_side_0 ? 0 : winAmount,													sha256id : v.sha256id? v.sha256id : null													, outcome : amt_either_side_0 ? 'DRAW' : ( status ? 'WIN' : 'LOSE' )                         } // v.diffRate,
///////////// 
	if ( B_CREATE_BULK1_OR_PIECE0 == 0 ){   await db['betlogs'] .create( jdata ) }
	else { arrbulktocreate.push ( jdata ) }  //                        .then(async (resp) => {
                          if(bot_option) {
														let { email , nickname } = await findone ( 'users' , { id: v.uid } ) //  status: ${status} // resp.dataValues.
														if ( nickname && nickname.match ( /^testbot/ ) ){}
														else {                             await bot.sendMessage(                              -1001775593548,                              `[BET END]                               user_id: ${v.uid} (${email})                               bet_id: ${v.sha256id}                               asset: ${name}                               amount: ${v.amount / 10 ** 6}                               startingPrice: ${v.startingPrice}                               endingPrice: ${currentPrice}                               side: ${v.side}                                winamount: ${winAmount} sumBetAmtLose: ${ (+sumBetAmount_lose_win[ 0 ] /10**6).toFixed(2) } sumBetAmtWin: ${  (+sumBetAmount_lose_win[ 1 ] /10**6).toFixed(2) },`                              );
														}
                          }
if( B_DESTROY_IN_BULK  ) {	arrbulktodelete.push ( v.id )}
else {											await db['bets'].destroy({ where: { id: v.id } });}
//                        });
                    } else if (v.type === 'DEMO') {
                      live_demo[1] = live_demo[1] + 1;
                      if (v.uid) {
												let jdata={                            
uid: v.uid,                            assetId: v.assetId,                            assetName: name,                            amount: v.amount,                            starting: v.starting,                            expiry: v.expiry,                            startingPrice: v.startingPrice,                            side: v.side,                            type: v.type,                          uuid: v.uuid, // added
                            endingPrice: currentPrice,
                            status: status,                          	diffRate: amt_either_side_0 ? '0' : v.diffRate , // v.diffRate, //                            diffRate: v.diffRate,
                            uuid: v.uuid,                             winamount: winAmount,														sha256id : v.sha256id? v.sha256id : null													, outcome : amt_either_side_0 ? 'DRAW' : ( status ? 'WIN' : 'LOSE' ) // added
}
	if ( B_CREATE_BULK1_OR_PIECE0 == 0 ){                        await db['betlogs']                          .create( jdata ) }
	else { arrbulktocreate.push ( jdata ) } //                          .then(async (resp) => {//                            await d b['bets'].dest roy({ where: { id: v.id } });
if( B_DESTROY_IN_BULK  ) {	arrbulktodelete.push ( v.id )}
else {											await db['bets'].destroy({ where: { id: v.id } });}
  //                        });
                      }
                      if (v.uuid) {
												let jdata= {                            
assetId: v.assetId,                            assetName: name,                            amount: v.amount,                            starting: v.starting,                            expiry: v.expiry,                            startingPrice: v.startingPrice,                            side: v.side,                            type: v.type,                            uuid: v.uuid, // already there
                            endingPrice: currentPrice,
                            status: status,                          	diffRate: amt_either_side_0 ? '0' : v.diffRate ,                             winamount: winAmount,														sha256id : v.sha256id? v.sha256id : null// v.diffRate,                            diffRate: v.diffRate,
                          }
	if ( B_CREATE_BULK1_OR_PIECE0 == 0 ) {                      await db['betlogs']                          .create( jdata ) }
	else { arrbulktocreate.push ( jdata ) } //                          .then(async (resp) => {
if( B_DESTROY_IN_BULK  ) {	arrbulktodelete.push ( v.id )}
else {											await db['bets'].destroy({ where: { id: v.id } });}
  //                        });
                      }
                    }
                  }
                } // end for bets
if ( arrbulktocreate.length ) {	await db[ 'betlogs'].bulkCreate ( arrbulktocreate , { raw : true } ) } else {}
if ( arrbulktodelete.length ) { await db[ 'bets' ].destroy ( { where: { id: arrbulktodelete }}) } else {}
if ( arrbulklogfees.length ) { await db[ 'logfees'].bulkCreate( arrbulklogfees , { raw : true } ) } else {}                // bets.map(async (v) => {                // });
                resolve({                  i: id,                  now: timenow.unix(),                  sumBetAmount_lose_win: sumBetAmount_lose_win,                  status,                  dividendrate_high,                  dividendrate_low,                  currentPrice,                  startPrice,                  totalAmount,                  live_demo,amt_either_side_0 
                });
              });
          }).then((value) => {
            let {              i,              now,              sumBetAmount_lose_win,              status,              dividendrate_high,              dividendrate_low,              currentPrice,              startPrice,              totalAmount,              live_demo,
            } = value;
            // loground 생성
            movelogrounds(              i,              now,              sumBetAmount_lose_win,              dividendrate_high,              dividendrate_low,              currentPrice,              startPrice,              type,              totalAmount
            );
            // bet logs 로 옮긴 후 승자 패자 베팅금 분배, 수수료 지급
            settlebets(              i,              now,              sumBetAmount_lose_win,              FEE_TO_BRANCH,              FEE_TO_ADMIN,              type,              status,              live_demo
            );
          });
          if (exists) {          } else {          }
        });
      } // END for type
    }); // END findall assets
};
const movelogrounds = async (
  i,
  expiry,
  sumBetAmount_lose_win,
  dividendrate_high,
  dividendrate_low,
  currentPrice,
  startPrice,
  type,
  totalAmount
) => {
  console.log('@move to logrounds', {
    assetId: i,
    totalLowAmount: sumBetAmount_lose_win[0],
    totalHighAmount: sumBetAmount_lose_win[1],
    expiry,
    type,
    lowDiffRate: dividendrate_low,
    highDiffRate: dividendrate_high,
    startingPrice: startPrice,
    endPrice: currentPrice,
    totalAmount: totalAmount,
  });

  await db['logrounds']    .findOne({
      where: {
        assetId: i,
        expiry,
      },
      raw: true,
    })
    .then(async (resp) => {
      // if (!resp && totalAmount !== 0) {
      if (!resp) {
        let signofdeltaprices = Math.sign(+currentPrice - +startPrice);
        await db['logrounds'].create({
          assetId: i,
          totalLowAmount: sumBetAmount_lose_win[0],
          totalHighAmount: sumBetAmount_lose_win[1],
          expiry,
          type,
          lowDiffRate: dividendrate_low,
          highDiffRate: dividendrate_high,
          startingPrice: startPrice,
          endPrice: currentPrice,
          totalAmount,
          side: MAP_SIGN_OF_DELTA_PRICES_TO_SIDE[signofdeltaprices],
        });
        await updatelogdaily({
          fieldname: 'sumbets',
          incvalue:
            (+sumBetAmount_lose_win[0] + +sumBetAmount_lose_win[1]) / 10 ** 6,
        });
        await updatelogdaily({
          fieldname: 'sumbetswinside',
          incvalue: +sumBetAmount_lose_win[1] / 10 ** 6,
        });
        await updatelogdaily({
          fieldname: 'sumbetsloseside',
          incvalue: +sumBetAmount_lose_win[0] / 10 ** 6,
        });
      } else {
        return;
      }
    });
};
/*    Status
    0-> 짐
    1-> 이김
    2-> 비김
    3-> 짐
*/
const settlebets = async (
  assetId,
  expiry,
  sumBetAmount_lose_win,
  FEE_TO_BRANCH,
  FEE_TO_ADMIN,
  type,
  status,
  live_demo , amt_either_side_0 
) => {
  let winnerTotalAmount = sumBetAmount_lose_win[1];
  let loserTotalAmount = sumBetAmount_lose_win[0];
  console.log({
    assetId,
    expiry,
    sumBetAmount_lose_win,
    FEE_TO_BRANCH,
    FEE_TO_ADMIN,
    type,
    live_demo,
  });
  FEE_TO_ADMIN = Number(FEE_TO_ADMIN)
  FEE_TO_BRANCH = Number(FEE_TO_BRANCH)
  /////////////////////////////////////////////////////////// DRAW (LIVE && DEMO)
  /////////////////////////////////////////////////////////// LIVE
  if (live_demo[0]) {    console.log('LIVE');
    type = 'LIVE';
    if (winnerTotalAmount === 0 || loserTotalAmount === 0) {
      let listdraws = await db['betlogs'].findAll({
        where: {          assetId,          expiry,          type, //          status: 2,
        },        raw: true,
      })
  //    .then(async (dr awusers) => {         // console.log('===================== DRAW =====================', drawu sers);
//        if ( listdraws.length < 1) {}          // return;        }
        listdraws.map(async (v) => {
//          await d b['balances'].incr ement('locked', {by: -1 * v.amount,            where: { uid: v.uid, typestr: v.type },          });
  //        await d b['balances'].inc rement('avail', { by: + v.amount,            where: { uid: v.uid, typestr: v.type },          });
					await db.sequelize.query ( `update balances set locked=locked-${v.amount}, avail=avail+${v.amount} where uid=${v.uid} and typestr='${v.type}'` )
					await db['betlogs'].update ( { winamount : 0 , diffRate : 0 } , { where : { id : v.id } } ) 
        });
//      });
/****************************/
//    } else if (winnerTotalAmount !== 0 || loserTotalAmount !== 0) {
    } else if (winnerTotalAmount > 0 && loserTotalAmount > 0) {
      /////////////////////////////////////////// DRAW
      let listdraws = await db['betlogs'].findAll({        where: {          assetId,          expiry,          type,          status: 2,        },        raw: true,
      })
//      .then(async (drawus ers) => {         // console.log('===================== DRAW =====================', drawus ers);
//        if ( listdrawusers.length < 1) {} //          return;        }
        listdraws.map(async (v) => {
//          await d b['balances'].incr ement('locked', {by: -1 * v.amount,            where: { uid: v.uid, typestr: v.type },          });
  //        await d b['balances'].inc rement('avail', { by: + v.amount,            where: { uid: v.uid, typestr: v.type },          });
					await db.sequelize.query ( `update balances set locked=locked-${v.amount}, avail=avail+${v.amount} where uid=${v.uid} and typestr='${v.type}'` )
					await db['betlogs'].update ( { winamount : 0 , diffRate : 0 } , { where : { id : v.id } } ) 
        });
//      });
      /////////////////////////////////////////// LOSER
      console.log(assetId, expiry, type);
      let listlosers = await db['betlogs']        .findAll({          where: {            assetId,            expiry,            type,            status: 0,          },          raw: true,        })
//        .then(async (losers) => {
          listlosers.map(async (v) => {
            // console.log('===================== LOSE =====================', v);
            await db['balances'].decrement(['total', 'locked'], {              by: v.amount,              where: { uid: v.uid, typestr: v.type },            });
						await db['betlogs'].update ( { winamount : -1 * GET_DECIMAL_REP( v.amount ) , diffRate: '-100' } , { where : { id : v.id } } ) 
	        });
  //      });
      /////////////////////////////////////////// WINNER
			let listwinners =       await db['betlogs']        .findAll({          where: {            assetId,            expiry,            type,            status: 1,          },          raw: true,        })
//        .then(async (winners) => {
      listwinners.map(async (v) => {
            // console.log('===================== WIN =====================', v);
            let { id, uid, assetId, winamount } = v;
//            let earned = Math.ceil(              (loserTotalAmount * v.amount) / winnerTotalAmount            );
						let earned = (loserTotalAmount * v.amount) / winnerTotalAmount
						if ( B_IS_ROUNDDOWN_PROFIT ) {
							earned = rounddown_at_nth_decimal_place({num : earned , nth : B_ROUNDDOWN_PROFIT_DECIMALPOINT  })
						}
            let fee_to_admin = (earned * FEE_TO_ADMIN) / 10000;
            let fee_to_branch;
            let fee_to_referer;
            let earned_after_fee = earned - fee_to_admin;
            // 총판 속한 유저 수수료 (본사,총판,추천인)
            let betUser = await db['users'].findOne({
              where: { id: uid },
              raw: true,
            });
            // 수수료 지급 기준
            // 본사 유저 (isbranch = 0) => 본사(2.5 %) + 추천인 (n %)
            // 총판 유저 (isbranch = 1 or 2) => 본사(2.5 %) + 총판 (n %) + 추천인 (2.5 - n %)
            // Fee to admin and update admin's balance
//            let admin = await d b['users'].findOne({               where: { isadmin: 2 },               raw: true,             });
            if(Number(winamount) !== 0) {
let jlogfeedata = {
                betId: id,
                payer_uid: uid,
                recipient_uid: admin.id ,
                feeamount: fee_to_admin,
                typestr: 'FEE_TO_ADMIN',
                betamount: v.amount,
                bet_expiry: expiry,
                assetId,
                fee_value: FEE_TO_ADMIN,
              }
////////////////////
if( B_CREATE_LOGFEES_IN_BULK ) { arrbulklogfees.push ( jlogfeedata ) } 
else {              await db['logfees'].create( jlogfeedata ); }
              await updatelogdaily({
                fieldname: 'sumfeeadmin',
                incvalue: +fee_to_admin / 10 ** 6,
              });
              await db['balances'].increment( ['total', 'avail'], { by: fee_to_admin, where: { uid: admin.id , typestr: v.type },                }
              )
            }
            // 총판 유저 (총판에게 수수료 지급)
           if (betUser.isbranch === 1 || betUser.isbranch === 2) {
              fee_to_branch = (earned * FEE_TO_BRANCH) / 10000;
              earned_after_fee = earned_after_fee - fee_to_branch;
              let branch=  await db['referrals'] .findOne({ where: { referral_uid: uid, isRefererBranch: betUser.isbranch }, raw: true,})  //.then((resp) => {                if (resp) { branch = resp; }              });
let jlogfeedata={
                betId: id,
                payer_uid: uid,
                recipient_uid: branch?.referer_uid,
                feeamount: fee_to_branch,
                typestr: 'FEE_TO_BRANCH',
                betamount: v.amount,
                bet_expiry: expiry,
                assetId,
                fee_value: FEE_TO_BRANCH,
              }
if( B_CREATE_LOGFEES_IN_BULK ) { arrbulklogfees.push ( jlogfeedata ) } 
else			{              await db['logfees'].create( jlogfeedata ); }
///////////
              await updatelogdaily({
                fieldname: 'sumfeebranch',
                incvalue: +fee_to_branch / 10 ** 6,
              });
              await db['balances'].increment(                ['total', 'avail'],                {                  by: fee_to_branch,                  where: { uid: branch?.referer_uid, typestr: v.type },                }
              );
            }
            // 추천인 수수료 지급
            await db['referrals']              .findOne({                where: { referral_uid: uid, isRefererBranch: 0 /* isRefererBranch = 0  =>  일반회원 추천인 */ },
                raw: true,               })
              .then(async (resp) => {
                if (resp) {
                  let winner_referer_uid = resp.referer_uid;
                  await db['users']                    .findOne({
                      where: { id: winner_referer_uid },
                      raw: true,
                    })
                    .then(async (resp) => {
                      let referer_level = resp.level;
                      let referer_fee_type = `FEE_TO_REFERER_${I_LEVEL[referer_level]}`;
											let FEE_TO_REFERER = jfeesets [  referer_fee_type ] 
//                      let FEE_TO_REFERER = await d b['fees ettings']                        .findOne({                          where: { key_: referer_fee_type },                          raw: true,                        })                        .then((resp) => {                          let { value_ } = resp;                          return value_;                        });

                      fee_to_referer = (earned * FEE_TO_REFERER) / 10000;
                      earned_after_fee = earned_after_fee - fee_to_referer;
let jlogfeedata={
                          betId: id,
                          payer_uid: uid,
                          recipient_uid: winner_referer_uid,
                          feeamount: fee_to_referer,
                          typestr: 'FEE_TO_REFERER',
                          betamount: v.amount,
                          bet_expiry: expiry,
                          assetId,
                          fee_value: FEE_TO_REFERER
                        }
if( B_CREATE_LOGFEES_IN_BULK ) { arrbulklogfees.push ( jlogfeedata ) } 
else			{              await db['logfees'].create( jlogfeedata ); }
 
                      await updatelogdaily({
                        fieldname: 'sumfeeuser',
                        incvalue: +fee_to_referer / 10 ** 6,
                      });
                      await db['balances'].increment( ['total', 'avail'], { by: fee_to_referer, where: { uid: winner_referer_uid, typestr: v.type, }, }                                                    );
                    });
                }
              });
            let total = Number(earned_after_fee) + Number(v.amount);
            // update winner's balance
//            await d b['balances'].incr ement( 'locked', { by: -1 * v.amount,     where: { uid: v.uid, typestr: v.type },              }            );
  //          await d b['balances'].incr ement( 'avail',  { by: total, where: { uid: v.uid, typestr: v.type } }            );
    //        await d b['balances'].incre ment( 'total',  { by: +earned_after_fee, where: { uid: v.uid, typestr: v.type },              }            );
					 await	db.sequelize.query ( `update balances set locked=locked-${v.amount}, avail=avail+${total}, total=total+${earned_after_fee} where uid=${v.uid} and typestr='${v.type}'`)
            let winAmount = (earned_after_fee / 10 ** 6).toFixed(3); 
            await db['betlogs'].update({ winamount: ( +earned_after_fee /10**6 ).toFixed(2) , // winAmount , 
							diffRate : (100* earned_after_fee / +v.amount).toFixed(2)						 },{ where: { id: v.id } })
          });
//        });
    }
    /////////////////////////////////////////////////////////// DEMO
  } else if (live_demo[1]) {
    console.log('DEMO');
    type = 'DEMO';
    if (winnerTotalAmount === 0 && loserTotalAmount === 0) {
    } else if (winnerTotalAmount !== 0 || loserTotalAmount !== 0) {
      try {
        /////////////////////////////////////////// DRAW
        await db['betlogs'].findAll({
          where: {
            assetId,
            expiry,
            type,
            status: 2,
          },
          raw: true,
        })
        .then(async (drawusers) => {
          console.log('===================== DRAW =====================', drawusers);
          if (drawusers.length < 1) {
            return;
          }
          drawusers.map(async (v) => {
            if(v.uid) {
// await d b['balances'].incre ment('locked', { by: -1 * v.amount,where: { uid: v.uid, typestr: v.type },              });
// await d b['balances'].incr ement('avail', { by: v.amount,     where: { uid: v.uid, typestr: v.type },              });
await db.sequelize.query ( `update balances set locked=locked-${v.amount}, avail=avail+${v.amount} where uid=${v.uid} and typestr='${v.type}'` )
            } else if(v.uuid) {
// await d b['balances'].incre ment('locked', { by: -1 * v.amount,where: { uuid: v.uuid, typestr: v.type },              });
// await d b['balances'].incr ement('avail', { by: v.amount,where: { uuid: v.uuid, typestr: v.type },              });
await db.sequelize.query ( `update balances set locked=locked-${v.amount}, avail=avail+${v.amount} where uid=${v.uuid} and typestr='${v.type}'` )
            }
          });
        });

        let listlosers = await db['betlogs'].findAll({ where: { assetId, expiry, type, status: 0,            },            raw: true,          })
  //        .then(async (losers) => {
				listlosers.map(async (v) => {
              if(v.id) {            await db['balances'].increment(  ['total', 'locked'], {  by: -1 * v.amount,                    where: { uid: v.uid, typestr: v.type },                  }
                );
              } else if(v.uuid) {		await db['balances'].increment(  ['total', 'locked'], {  by: -1 * v.amount,                    where: { uuid: v.uuid, typestr: v.type },                  }
                );
              }
            });
//          });
				let listwinners =        await db['betlogs'].findAll({ where: { assetId, expiry, type, status: 1,            },            raw: true,          })
//          .then(async (winners) => {
        listwinners.map(async (v) => {
//              let earned =              Math.ceil((loserTotalAmount * v.amount) / winnerTotalAmount) ||              0;
							let earned = (loserTotalAmount * v.amount) / winnerTotalAmount
							if ( B_IS_ROUNDDOWN_PROFIT ) {
								earned = rounddown_at_nth_decimal_place({num : earned , nth : B_ROUNDDOWN_PROFIT_DECIMALPOINT  })
							}
              if(v.uid) {                // update winner's balance
								await db.sequelize.query ( `update balances set locked=locked-${v.amount}, avail=avail+${earned}, total=total+${v.amount} where uid=${v.uid} and typestr='${v.type}'` )
/**                await d b['balances'].inc rement( 'locked', { by: -1 * v.amount, where: { uid: v.uid, typestr: v.type },                  }                );
                await d b['balances'].incre ment(    'avail',  { by: v.amount + earned, where: { uid: v.uid, typestr: v.type } }                );
                await d b['balances'].incre ment(    'total',  { by: v.amount,      where: { uid: v.uid, typestr: v.type },                  }                );
*/                let winamount = (earned / 10 ** 6).toFixed(2)
                 await db['betlogs'].update({ winamount: winamount , diffRate : (100 * earned/+v.amount).toFixed(2) },{ where: { id: v.id } })
              }

              if(v.uuid) {                  // update winner's balance
								await db.sequelize.query ( `update balances set locked=locked-${v.amount}, avail=avail+${earned}, total=toal+${v.amount} where uuid=${v.uuid} and typestr='${v.type}'`)
/**                await d b['balances'].inc rement( 'locked', { by: -1 * v.amount,                    where: { uuid: v.uuid, typestr: v.type },                  }               );
                await d b['balances'].incre ment(    'avail',  { by: v.amount + earned, where: { uuid: v.uuid, typestr: v.type } }                );
                await d b['balances'].incre ment(    'total',  { by: v.amount,                    where: { uuid: v.uuid, typestr: v.type },                  }                );
*/                let winAmount = (earned / 10 ** 6).toFixed(2)
                await db['betlogs'].update({ winamount: winAmount , diffRate : (100 * earned/+v.amount).toFixed(2) },{ where: { id: v.id } })
              }
            });
//          });
      } 
catch (error) {        console.log(error);      }
    }
  }
};

module.exports = {
  closeBet,
};

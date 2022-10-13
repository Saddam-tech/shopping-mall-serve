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
const EXPONENT_FOR_PREC_DEF = 6;
const MAP_SIGN_OF_DELTA_PRICES_TO_SIDE = { 1: 'HIGH', 0: 'TIE', '-1': 'LOW' };

const B_REFERENCE_BRANCH_TABLE = false 
const B_IS_ROUNDDOWN_PROFIT = true
const B_ROUNDDOWN_PROFIT_DECIMALPOINT = 3 // 2 // 3

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
const KEYS = Object.keys 
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
	KEYS ( jfeesets ).forEach ( key =>{ jfeesets[ key ] = +jfeesets[ key ] } )
	return jfeesets
}
const MAP_TYPEINT_TYPESTR= { 0 : 'LIVE' , 1 : 'DEMO' } 
let admin
let jlogdaily = {sumfeeadmin:0  
	, sumfeebranch:0 
	, sumfeeuser:0 
	, sumbets:0 
	, sumbetswinside:0 
	, sumbetsloseside:0}
const closeBet = async ( { timerefsec  } ) => {
  const timenow = moment().startOf('minute');
  console.log('closeBets', timenow.unix());
	arrbulktocreate=[] ; arrbulktodelete=[] ; arrbulklogfees=[]
	jfeesets = await getfeesettings( )
	admin = await db['users'].findOne({               where: { isadmin: 2 },               raw: true,             });
	jlogdaily = {sumfeeadmin:0,sumfeebranch:0,sumfeeuser:0,sumbets:0,sumbetswinside:0,sumbetsloseside:0}
  // 베팅 지원 종목 리스트 불러오기
	let jsymbol_ticker  /**	jsymbol_ticker = await get_valid_tickers_with_min_timediff_from_reftime ( { 		reftimepointsec : timerefsec 		, timedeltarequiredsec : 1000  } ) */
	jsymbol_ticker = await get_valid_tickers_with_orderterm ({			reftimepointsec : timerefsec 		, timedeltarequiredsec : 10		, orderterm : 'gt'	}) //  let assetList = 	await 
	let assets= await	db['assets']    .findAll({      where: { active: 1 },      raw: true,    })
  for (let typeint = 0; typeint < 2; typeint ++) {        let typestr = MAP_TYPEINT_TYPESTR [ typeint ]
		sumfeeadmin  = 0
		for ( let idxasset = 0; idxasset<assets.length; idxasset ++ ) { let { id : assetId , name :assetName }=assets[ idxasset ]
			let listbets = await db[ 'bets'].findAll ( { raw: true , where: { assetId , expiry : timerefsec , type : typestr } } )
			if ( listbets.length ) {} else { continue}
			let currentprice = + jsymbol_ticker[ symbol ]
			if ( ISFINITE ( currentprice ) ){}
			else { LOGGER (`@closing price not available-bet: ${symbol} ,${timerefsec}`) ; continue }
			let status
			let sumBetAmount_lose_win = [ 0 , 0 ]
			let jbetidx_status = {}
			for ( let idx =0 ; idx < bets.length ; idx ++){
				let elem = bets [ idx ]
				startPrice = elem.startingPrice
				let signdprice_betside_combo = `${Math.sign( currentprice - elem.startingPrice)}_${elem.side}`
				let amount = + elem.amount
				totalAmount += amount;
				switch ( signdprice_betside_combo ){
					case '0_HIGH'	: status = 2;				break //			sumBetAmount_lose_win[1] += v.amount;
					case '0_LOW'	: status = 2;		break
					case '1_HIGH' : status = 1;			sumBetAmount_lose_win[1] += amount;		break
					case '-1_HIGH': status = 0;			sumBetAmount_lose_win[0] += amount;		break
					case '1_LOW'	: status = 0;			sumBetAmount_lose_win[0] += amount;		break
					case '-1_LOW'	: status = 1;			sumBetAmount_lose_win[1] += amount;		break
				}
				jbetidx_status [ idx ] =status;
			}
			let amt_either_side_0 = sumBetAmount_lose_win[ 0] < 1 || sumBetAmount_lose_win[ 1] < 1  // let B_CREATE_BULK1_OR_PIECE0 = 1 , arrbu lktocreate=[] , arrbulktodelete=[], arrbulklogfees=[]
			let divrate = 0 
			if ( amt_either_side_0 ) { }
			else { divrate = sumBetAmount_lose_win[ 1 ] / sumBetAmount_lose_win[ 0 ] }
			for ( let idx =0;idx < bets.length ; idx ++ ) {
				let bet = bets [ idx ]
//				++ live_demo [ MAP_LIVEDEMO_STR_INT [ bet.type ] ]
				let status= jbetidx_status [ idx ]				
				let jdata={ uid: bet.uid,					assetId: bet.assetId,					amount: bet.amount,					starting: bet.starting,					expiry: bet.expiry,					startingPrice: bet.startingPrice,					side: bet.side,					type: bet.type,
          assetName: assetName,					endingPrice: currentprice,					status: status  ,
					diffRate : amt_either_side_0 ? '0' : ( status ? divrate : 0 ) ,// 
					winamount: amt_either_side_0 ? 0 : ( status ? +bet.amount * divrate / 10**EXPONENT_FOR_PREC_DEF : 0 ),
					sha256id : bet.sha256id? bet.sha256id : null, 
					outcome : amt_either_side_0 ? 'DRAW' : ( status ? 'WIN' : 'LOSE' ) ,
					sumBetAmount_lose_win
				} // 
				arrbulktocreate.push ( jdata )
				arrbulktodelete.push ( bet.id )
			} // live/demo type
			if ( arrbulktocreate.length ) { await dosettle ( arrbulktocreate) }
			if ( arrbulktodelete.length ) { await db[ 'bets' ].destroy ( { where: { id: arrbulktodelete }}) } else {}
			if ( arrbulklogfees.length ) { await db[ 'logfees' ].bulkCreate( arrbulklogfees , { raw: true } ) }
			await movelogrounds(
				{	i : assetId ,
					expiry : timerefsec ,
					sumBetAmount_lose_win,				//  dividendrate_high : ,					//dividendrate_low : ,
					currentPrice : currentprice ,
					startPrice : null ,
					type : typestr ,
					totalAmount : sumBetAmount_lose_win[0] + sumBetAmount_lose_win[1]
				})
			if ( true ) { arrbulktocreate=[] ; arrbulktodelete=[] ; arrbulklogfees=[] }
		} // end for each asset
  	await db['balances'].increment( ['total', 'avail'], { by: sumfeeadmin , where: { uid: admin.id , typestr },} )
	} // end for each type
  let datestr= moment().format('YYYY-MM-DD');
	let resplogdaily = await db['logdaily'].findOne({ raw: true , where : {datestr} })
	if ( resplogdaily ) { await db['logdaily'].increment ({ ... jlogdaily } , { id : resplogdaily.id } )  }
	else { await db['logdaily'].create ( { ... jlogdaily, datestr } )} //
}
let sumfeeadmin 
let jusercache={}
const getuserinfo = async uid =>{ 
	if ( jusercache[ uid] ) { return  jusercache[ uid] }
	else {
		let resp = await db['users'].findOne( { raw: true ,where: { id : uid } } )
		jusercache [ uid ] =resp
		return resp
	}
}
const dowin =async ({ jbetlog , idx } ) =>{
	let { winamount , amount , uid , divrate } = jbetlog
	let adminshare = 0 ; let earned_after_fee = winamount
	if ( B_IS_ROUNDDOWN_PROFIT ) {
		let earned_proper = rounddown_at_nth_decimal_place({num : winamount , nth : B_ROUNDDOWN_PROFIT_DECIMALPOINT  })
		adminshare = winamount - +earned_proper 
		winamount = earned_proper 
	}
	adminshare += winamount * jfeesets [ 'FEE_TO_ADMIN' ] / 10**4
	arrbulklogfees .push ( {		betId: id,    payer_uid: uid,    betamount: jbetlog.amount,    bet_expiry: jbetlog.expiry,    assetId: jbetlog.assetId ,
		recipient_uid: admin.id ,
    feeamount: adminshare ,
    typestr: 'FEE_TO_ADMIN',
    fee_value: jfeesets [ 'FEE_TO_ADMIN' ],
	}) 
	sumfeeadmin += adminshare
	jlogdaily [ 'sumfeeadmin'] += adminshare
	earned_after_fee -= adminshare
/*****************/
	let {  mybranch , myreferer }=await getuserinfo ( uid )
	if ( mybranch ) {
		let branchshare = winamount * jfeesets[ 'FEE_TO_BRANCH' ] / 10 ** 4
		arrbulklogfees .push ( {		betId: id,    payer_uid: uid,    betamount: jbetlog.amount,    bet_expiry: jbetlog.expiry,    assetId: jbetlog.assetId ,
			recipient_uid: mybranch ,
	    feeamount:  branchshare ,
  	  typestr: 'FEE_TO_BRANCH',
	    fee_value: jfeesets [ 'FEE_TO_BRANCH' ],
		})
		await db['balances'].increment( ['total', 'avail'], { by: branchshare , where: { uid: mybranch , typestr: jbetlog.type }, } )
		jlogdaily [ 'sumfeebranch'] += branchshare
		earned_after_fee -= branchshare
	} else {}
/*****************/
	if ( myreferer ) {
		let { level } = getuserinfo ( myreferer )
		let referershare = winamount * jfeesets [ `FEE_TO_REFERER_${I_LEVEL[level] }`	]
		arrbulklogfees .push ( {		betId: id,    payer_uid: uid,    betamount: jbetlog.amount,    bet_expiry: jbetlog.expiry,    assetId: jbetlog.assetId ,
			recipient_uid: myreferer ,
	    feeamount:  referershare ,
  	  typestr: 'FEE_TO_REFERER',
	    fee_value: jfeesets [ 'FEE_TO_REFERER' ],
		})
		await db['balances'].increment( ['total', 'avail'], { by: referershare , where: { uid: myreferer , typestr: jbetlog.type, }, } )
		jlogdaily [ 'sumfeeuser'] += referershare
		earned_after_fee -= referershare
	} else {} 	
	await	db.sequelize.query ( `update balances set locked=locked-${amount}, avail=avail+${earned_after_fee + amount}, total=total+${earned_after_fee} where uid=${uid} and typestr='${jbetlog.type}'`)
	arrbulktocreate[ idx ].winamount = earned_after_fee
	arrbulktocreate[ idx ].diffRate= divrate * earned_after_fee / winamount
} // end dowin
const dosettle =async arrbulktocreate=>{
	for ( let idx = 0; idx <arrbulktocreate.length ; idx ++ ){
		let jbetlog = arrbulktocreate [ idx ]
		let { outcome , status , amount , uid , type : typestr } = jbetlog
		switch ( outcome ) {
			case 'DRAW' : await db.sequelize.query ( `update balances set locked=locked-${amount}, avail=avail+${amount} where uid=${uid} and typestr='${typestr}'` ) 
			break
			case 'LOSE' : await db['balances'].decrement(['total', 'locked'], { by: amount, where: { uid: uid, typestr }, });
			break
			case 'WIN' : await dowin( {jbetlog , idx} ) 
			break
		}	
	}
//	db[ 'logfees' ].bulkCreate( arrbulklogfees , { raw: true } )
} // end dosettle

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
  let resp = await db['logrounds']    .findOne({      where: {        assetId: i,        expiry,      },      raw: true,    })
//    .then(async (resp) => {      // if (!resp && totalAmount !== 0) {
      if (resp) { return }
			else {
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
	let sumbets = (sumBetAmount_lose_win[0]+sumBetAmount_lose_win[1] ) / 10**EXPONENT_FOR_PREC_DEF  
	jlogdaily[ 'sumbets' ] += sumbets
	jlogdaily[ 'sumbetsloseside'] += sumBetAmount_lose_win[0] / 10**EXPONENT_FOR_PREC_DEF   
	jlogdaily[ 'sumbetswinside' ] += sumBetAmount_lose_win[1] / 10**EXPONENT_FOR_PREC_DEF 
//        await updatelogdaily({          fieldname: 'sumbets',          incvalue:            (+sumBetAmount_lose_win[0] + +sumBetAmount_lose_win[1]) / 10 ** 6,        });
  //      await updatelogdaily({          fieldname: 'sumbetswinside',          incvalue: +sumBetAmount_lose_win[1] / 10 ** 6,        });
    //    await updatelogdaily({          fieldname: 'sumbetsloseside',          incvalue: +sumBetAmount_lose_win[0] / 10 ** 6,        });
      } 
} // end func movelogrounds
module.exports = {
  closeBet,
};
/*    Status
    0-> 짐
    1-> 이김
    2-> 비김
    3-> 짐
*/


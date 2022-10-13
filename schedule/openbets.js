var express = require('express');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/authMiddleware');
const db = require('../models');
var moment = require('moment');
const LOGGER = console.log;
const cron = require('node-cron');
const axios = require('axios');
let { Op } = db.Sequelize;
let { I_LEVEL } = require('../configs/userlevel');
const {
  ASSETID_API_SYMBOL,
  ASSETID_MARKET,
  ASSETID_REDIS_SYMBOL,
} = require( '../utils/ticker_symbol' );
// const cli redisa = require('async-redis').createClient();
// const { calcu late_dividendrate, calc ulate_dividendrate_sec } = require('./calcula teDividendRate');
const { get_valid_tickers_with_min_timediff_from_reftime
	, get_valid_tickers_with_orderterm
	, get_latest_tickers_redis
//	, get_a_ticker_with_order_terms
} =require('../utils/tickers')
const EXPONENT_FOR_PREC_DEF = 6;
const MAP_SIGN_OF_DELTA_PRICES_TO_SIDE = { 1: 'HIGH', 0: 'TIE', '-1': 'LOW' };
const B_REFERENCE_BRANCH_TABLE = false 
// const { updaterow , fi ndone } = require( '../utils/db' )
const TelegramBot = require('node-telegram-bot-api');
const token = '5476345761:AAHu7pgjWdMFXZF-FvugQI3pM9t12FWI3Rw';
const bot = new TelegramBot(token);
const bot_option = true
const { updatelogdaily } = require('../utils/logdaily');
const { getunixtimemili } = require('../utils/common' )
// const { f indall } = require( '../utils/db')
const ISFINITE =Number.isFinite

const openbets=async ({timerefsec })=>{
	let jsymbol_ticker 
	let transaction = await db.sequelize.transaction()
/**	jsymbol_ticker = await get_valid_tickers_with_min_timediff_from_reftime ( { 		reftimepointsec : timerefsec 		, timedeltarequiredsec:1000 } ) */
//	jsymbol_ticker = await get_valid_tickers_with_orderterm ({		reftimepointsec : timerefsec 		, timedeltarequiredsec:10		, orderterm : 'lte'		})
	jsymbol_ticker = await get_latest_tickers_redis ()
	LOGGER( `@jsymbol_ticker-openbets` , jsymbol_ticker , timerefsec  ) //	let listbets =await fi ndall ( 'bets' , { starting : timerefsec }  )
		
	let listassets = await db['assets'].findAll ( { raw: true , where : {  activebet : 1 , group : 1 }   } )
	for ( let idxasset = 0 ; idxasset < listassets.length ; idxasset ++ ) {
		let ticker_price = jsymbol_ticker[ listassets [ idxasset ].APISymbol ]
		await db ['bets'].update ( {
			startingPrice : ticker_price 
			, entryprice1 : ticker_price 
		} , { where : { starting : timerefsec } } , {transaction } )
	}
/*
	if ( listbets && listbets.length ) {}
	else { return }
	let listbets = await db['bets'].findAll ( { raw: true , where : { starting : timerefsec } } , {transaction } )
	listbets.forEach ( async elem => {
		let { id , symbol } = elem	
		let ticker_price = jsymbol_ticker[ symbol ] 
		if ( ISFINITE (+ ticker_price )){}
		else { LOGGER( `@!!!bet has no ticker `) ; return } //		await u pdaterow ( 'bets' , { id } , { startingPrice : ticker_price , entryprice1 : ticker_price } )
		await db[ 'bets'].update ( { 
				startingPrice : ticker_price 
			, entryprice1 : ticker_price } , { where : {id} } , {transaction } ) 
	})
*/
	transaction.commit()
}
cron.schedule('0 * * * * *', async () => {
	const timerefsec = moment().startOf('minute').unix()
	setTimeout(async _=>{
//		let resp =await fi ndone ( 'settings' , {name: 'IS_ENTRY_PRICE_ON_BETTIME_OR_START_OF_MINUTE' } )
		let resp = await db[ 'settings' ].findOne ( {raw: true , where : { name:  'IS_ENTRY_PRICE_ON_BETTIME_OR_START_OF_MINUTE' } } )
		if ( resp && + resp.value == 2 ) { LOGGER( `@execute start of minute price write`) }
		else { return } // default behavior is : on bet time
		openbets ( { timerefsec }) 
	} , 10 )	
//	} , 1700*3.5 )	
//	} , 1700*2.3 )	
  console.log('@opn bets', moment().format('HH:mm:ss'), '@binopt');
});
module.exports = {
//  closeBet,
}
/* bets
  id     | createdat           | updatedat           | uid  | assetId | amount   | starting   | expiry     | startingPrice | side | type | uuid | diffRate | status | sha256id                                                         | entryprice0 | entryprice1 | symbol |
+--------+---------------------+---------------------+------+---------+----------+------------+------------+---------------+------+------+------+----------+--------+------------------------------------------------------------------+-------------+-------------+--------+
| 780432 | 2022-09-02 08:28:11 | 2022-09-02 17:19:42 |  125 |       1 | 20000000 | 1662107340 | 1662107400 | 20108.39000   | HIGH | LIVE | NULL | 0        |      0 | 7c54437a7b518e25d7da4b59ee6ac2f81f7a21569ec757267fb
*/



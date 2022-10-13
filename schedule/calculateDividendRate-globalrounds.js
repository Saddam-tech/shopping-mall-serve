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
	, get_latest_ticker_price 
} = require("../utils/tickers");

let jtickers_by_i = {};
let jtickers_by_symbol = {};
const tell_win_lose = (bet) => {  // win : 1 , tie : 0 , lose : -1
	if ( ISFINITE ( + bet.startingPrice)){}
	else { return null } 
  let deltaprice =    Number(jtickers_by_i[bet?.assetId]) - Number(bet.startingPrice);
  let { side } = bet;
  let win_lose;
  if (deltaprice > 0) {
    if (side == "LOW") {      win_lose = -1; // return -1;
    } else if (side == "HIGH") {      win_lose = 1; // return +1;
    }
  } else if (deltaprice < 0) {
    if (side == "LOW") {      win_lose = 1; // return +1;
    } else if (side == "HIGH") {      win_lose = -1; // return -1;
    }
  } else if (deltaprice === 0) {    win_lose = 0; // return 0;
  } // console.log(bet.uid,bet.startingPrice,jtickers_by_i[bet?.assetId], deltaprice, win_lose);
  return win_lose;
};

const ISFINITE=Number.isFinite
const get_tickers = async ( {} )=>{
	let list_assets = await findall("assets", { activebet : 1 // active: 1 
		, APISymbol : { [ Op.ne ] : null } });
	let aproms=[]
	list_assets.forEach ( async elem => {
		aproms[ aproms.length ] = get_latest_ticker_price ( { symbol : elem.APISymbol } )
	})
	let listresps= await Promise.all ( aproms )
	listresps.forEach ( ( elem , idx ) => {
		if ( ISFINITE( + elem) ){
	    jtickers_by_symbol[ listassets[ idx ].APISymbol  ] = elem 
  	  jtickers_by_i[ idx ] = elem
		 }
		else {}
	})
}
const insert_into_nested_object=( { jdata , assetId , expiry , jbetstats } )=>{
	if ( jdata [ assetId ] ) { // && jdata[ assetId ] [ expiry ] ) { //		jdata[ assetId ] [ expiry ] = jbetstats		
	}
//	else if ( jdata [ assetId ] ) { jdata[ assetId] = {} // ; jdata[ assetId] [expiry] = jbetstats 	} 
	else { jdata[ assetId ] = {} }
	jdata[ assetId ] [ expiry ] = jbetstats		
}
const { NETTYPE_DEF } =require('../configs/configs' )
const calculatedivrate_globalrounds =async nettype=>{
	let timenow = moment().unix()
//	let listnettypes = await db[ 'nettypes' ].findAll ( { raw: true , where : { active : 1 } } )
	if ( nettype ) {}
	else { nettype = NETTYPE_DEF } 
	let { id : nettypeid } = await db['nettypes'].findOne ( { raw : true, where : { name : nettype } } )
	let listbets = await findall ( 'bets' , {starting : { [ Op.gt ] : timenow } 
		, expiry : { [Op.gt] : timenow }
		, nettypeid
	} )
	if ( listbets && listbets.length ) {}
	else { return }
	let jexpiry_arrbets= {}
	listbets.forEach ( elem=> { let { assetId , expiry } =elem
		let key = `${assetId}_${expiry}`
		if( jexpiry_arrbets[ key ] ) {  } //		if ( jexpiry_arrbets[elem.expiry ] ){  }//		else 
		else { jexpiry_arrbets[ key ]=[] }
		jexpiry_arrbets[ key ].push ( elem )
	})
	let jroundprestats ={}
	Object.keys ( jexpiry_arrbets ) .forEach ( async key => {
		let betsumamounts = { win : 0 , lose : 0 , draw : 0 , HIGH : 0 , LOW : 0 }
		let bet_count = 0
		jexpiry_arrbets [ key ].forEach ( async bet => { let { id }= bet
			let tellresult = tell_win_lose ( bet )
			++ bet_count
			let { amount } = bet
			amount = +amount / 10**6
			switch ( tellresult ) {
				case 1 : betsumamounts [ 'win'] += amount ; break
				case -1: betsumamounts ['lose'] += amount ; break
				case 0 : betsumamounts ['draw'] += amount ; break
			}
			betsumamounts[ bet?.side ] += amount 
		})
//			switch ( bet[ 'side' ] {				case 'HIGH' : ; break 				case 'LOW' : ; break 			}
			let [ assetId , expiry ] = key.split ( '_' )
//			if ( betsumamounts[ 'win' ] == 0 || betsumamounts[ 'lose' ] == 0 ) {
		if ( betsumamounts[ 'HIGH' ] == 0 || betsumamounts[ 'LOW' ] == 0 ) {
				insert_into_nested_object ( { jdata : jroundprestats , assetId , expiry , jbetstats : { bet_count ,
						high_side_dividendrate : 0 // ''
					, low_side_dividendrate : 0 // ''
					, high_side_amount  : betsumamounts [ 'HIGH' ]
					, low_side_amount : betsumamounts [ 'LOW' ]
					, duration : null // bet.duration
					, expiry // : bet.expiry
				 }  } )
			} else {
					let high_side_dividendrate = (100 * +betsumamounts [ 'LOW' ] / ( + betsumamounts [ 'HIGH' ] ) ) // .toFixed(4)
					let low_side_dividendrate = (100 * +betsumamounts [ 'HIGH' ] / ( + betsumamounts [ 'LOW'  ] ) ) // .toFixed(4)
				LOGGER( `@high,low divrates` , high_side_dividendrate , low_side_dividendrate )
					let jbetstats =  { bet_count ,
						high_side_dividendrate : (100 * +betsumamounts [ 'LOW' ] / ( + betsumamounts [ 'HIGH' ] ) ) // .toFixed(4)
					, low_side_dividendrate : (100 * +betsumamounts [ 'HIGH' ] / ( + betsumamounts [ 'LOW'  ] ) ) // .toFixed(4)
					, high_side_amount  : betsumamounts [ 'HIGH' ] 
					, low_side_amount :betsumamounts [ 'LOW' ] 
					, duration : null // bet.duration 
					, expiry // : bet.expiry
				 } 
				LOGGER( `@jbetstats` , jbetstats )
					insert_into_nested_object ( { jdata : jroundprestats , assetId , expiry , jbetstats } )
			}
//		})
	})
	return jroundprestats
} 
cron.schedule("* * * * * *", async () => {
  // LOGGER('@Calculate dividendrates', moment().format('HH:mm:ss', '@binopt'));
  const reftimepointsec = moment().startOf("second").unix();
  await get_tickers({ reftimepointsec });
	await calculatedivrate()
});

module.exports = { calculatedivrate_globalrounds 
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
*/	//	LOGGER( '@jtickers' , jtickers_by_i , jtickers_by_symbol  )
/**  let assetList = await db["assets"]    .findAll({
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
*/


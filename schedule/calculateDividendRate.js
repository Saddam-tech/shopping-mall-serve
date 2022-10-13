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
const STRINGER=JSON.stringify
let jtickers_by_i = {};
let jtickers_by_symbol = {};

const ISFINITE=Number.isFinite
/** const get_tick ers_conforms_to_gettickerprice_source = async ( {})=>{
	let list_assets = await findall("assets", { ac tive: 1 , APISymbol : { [ Op.ne ] : null } });
	let aproms=[]
	list_assets.forEach ( elem => {
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
} */
const get_tickers_conforms_to_gettickerprice_source = async ( {})=>{
	let list_assets = await findall("assets", { activebet : 1 // active: 1 
		, APISymbol : { [ Op.ne ] : null } });
  list_assets.forEach(async (elem) => {
    let { APISymbol: symbol, id } = elem;
		if ( symbol ) {} else { return }
    let price = await get_latest_ticker_price ( { symbol // : ''	//			, reftimepointsec	//			, output_is_object_or_scalar : 'scalar'	//			, timelengthinsec : 1  //			, timelengthinsec : 5 // '5' 
		} )// cliredisa.hgetall("STREAM_ASSE T_PRICE");
		if ( ISFINITE( +price ) && ! isNaN( +price) ) {} // && list_i tickers[symbol] ){}
		else { return }
//    let price = lis t_tickers[symbol];
    jtickers_by_symbol[ symbol  ] = price;
    jtickers_by_i[ id ] = price;
		if( symbol =='BTCUSDT' ) { LOGGER( `@gettickers` , symbol , price )}
  });
} 
const get_tickers_uses_timestamped_tickers = async ({ reftimepointsec }) => {
  let list_assets = await findall("assets", { activebet : 1 
		, APISymbol : { [ Op.ne ] : null } });
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
let get_tickers = get_tickers_conforms_to_gettickerprice_source
// let get_tickers = get_tickers_uses_timestamped_tickers;
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
/** assetId
bet_count
dividendrate.high_side_dividendrate dividendrate.low_side_dividendrate
high_side_amount low_side_amount
duration expiry
*/
const calculatedivrate_workinprogress = async _=>{
	let timenow = moment().unix()
	let listbets = await findall ( 'bets' , {starting : { [ Op.lte ] : timenow } , expiry : { [Op.gt] : timenow } } )
	if ( listbets && listbets.length ) {}
	else { return }
	let jexpiry_arrbets= {}
	listbets.forEach ( elem=> { let { assetId , xpiry } =elem
		let key = `${assetId}_${expiry}`
		if( jexpiry_arrbets[ key ] ) {  } //		if ( jexpiry_arrbets[elem.expiry ] ){  }//		else 
		else { jexpiry_arrbets[ key ]=[] }
		jexpiry_arrbets[ key ].push ( elem )
	})
	let jbetid_winlose = {}
	Object.keys ( jexpiry_arrbets ).forEach ( async key => { 
		let betsumamounts= { win: 0 , lose :0 }
		jexpiry_arrbets [ key ].forEach ( async bet => { let { id } =bet
			let tellresult = tell_win_lose ( bet ) ; LOGGER( `@tellresult` , tellresult )
				switch ( tellresult  ){				
				case 1 : betsumamounts ['win'] += +bet.amount ;jbetid_winlose [id] = 1;  break // ;await d b['bets'].update ( {status : 1 , } , {where:{ id: bet.id } }) ;
				case -1: betsumamounts ['lose']+= +bet.amount ;jbetid_winlose [id] = 0;break   // ;await d b['bets'].update ( {status : 0 , } , {where:{ id: bet.id } }) ;
				case 0 : jbetid_winlose [id] = 2;break //await  d b['bets'].update ( {status : 2 , } , {where:{ id: bet.id } }) ;
				default : break
			}
		}) // end rach expiry
	})
}
const LIVETYPES= [ 'LIVE' , 'DEMO' ]
const calculatedivrate_legacy_per_user_only = async _=>{
	let timenow = moment().unix()
	let listnettypes = await db[ 'nettypes' ].findAll ( { raw: true , where : { active : 1 } } )
	for ( let idxnettype = 0 ; idxnettype < listnettypes.length ; idxnettype ++ ) {
		for ( let type of LIVETYPES ) {
		let { id : nettypeid } = listnettypes [ idxnettype ]
		let jexpiry_arrbets= {}
		let listbets = await findall ( 'bets' , 
				{starting : { [ Op.lte ] : timenow } 
			, expiry : { [Op.gt] : timenow } 
			, nettypeid
			, type
		} )
		if ( listbets && listbets.length ) {}
		else { continue } // return }

		listbets.forEach ( elem=> { let { assetId , expiry } =elem
			let key = `${assetId}_${expiry}`
			if( jexpiry_arrbets[ key ] ) {  } //		if ( jexpiry_arrbets[elem.expiry ] ){  }//		else 
			else { jexpiry_arrbets[ key ]=[] }
			jexpiry_arrbets[ key ].push ( elem )
		})
		let jbetid_winlose = {}
		Object.keys ( jexpiry_arrbets ).forEach ( async expiry => {
			let betsumamounts= { win: 0 , lose :0 }
			jexpiry_arrbets [ expiry ].forEach ( async bet => { let { id } =bet
				let tellresult = tell_win_lose ( bet ) ; LOGGER( `@tellresult` , tellresult )
					switch ( tellresult  ){				
						case 1 : betsumamounts ['win'] += +bet.amount ;jbetid_winlose [id] = 1;  break // ;await d b['bets'].update ( {status : 1 , } , {where:{ id: bet.id } }) ;
						case -1: betsumamounts ['lose']+= +bet.amount ;jbetid_winlose [id] = 0;break   // ;await d b['bets'].update ( {status : 0 , } , {where:{ id: bet.id } }) ;
						case 0 : jbetid_winlose [id] = 2;break //await  d b['bets'].update ( {status : 2 , } , {where:{ id: bet.id } }) ;
						default : break  
					}
			})
		LOGGER( '@jbetid_winlose' , jbetid_winlose )
			if ( betsumamounts['win'] == 0 ||betsumamounts['lose'] == 0 ){
				jexpiry_arrbets [ expiry ].forEach ( async bet => {	await db['bets'].update ( {diffRate: 0,winamount:0 } , { where: { id: bet.id} })
				} )
			}
			else {
				let diffRate = betsumamounts['lose'] / betsumamounts['win'] 
				jexpiry_arrbets [ expiry ].forEach ( async bet => { let { id} = bet 
					let jupdates
					switch ( jbetid_winlose [ id ] ) {
						case 1 : 
							jupdates={ status : 1 , diffRate  : (diffRate * 100).toFixed(2) ,winamount : diffRate * +bet.amount } 
							await db['bets'].update ( jupdates , {where:{ id } }) 
//							await set_pos_in_kvs ( { uid : id , betdata : STRINGER( jupdates ) })
						break // : (diffRate * 100).toFixed(6)
						case 0 : await db['bets'].update ( { status : 0 , diffRate : '-100' ,winamount: -bet.amount }, {where:{ id } } ); break
						case 2 : await db['bets'].update ( { status : 2 , } , {where:{ id } }) ;break
					default : break
					}
				//				;
					})
				} // end else
			}) // each expiry
		} // end demo || live type
	} // for nettype
}
const PARSER=JSON.parse
const set_pos_in_kvs=async ({uid , betdata })=>{
	let resp = await	cliredisa.get ( `POS_${uid}`)
	let jexdata={}
	if (resp ) {
		jexdata = PARSER (resp )
	}
	else { 
	}
	jexdata [ betdata['sha256id']] = betdata
	await cliredisa.set ( `POS_${uid}` , { ... jexdata })
}
const calculatedivrate = calculatedivrate_legacy_per_user_only
const periodictask=async _=>{  // LOGGER('@Calculate dividendrates', moment().format('HH:mm:ss', '@binopt'));
//  const reftimepointsec = moment().startOf("second").unix();
  const reftimepointsec = moment().unix();
  await get_tickers({ reftimepointsec });
	await calculatedivrate()
}
setInterval ( _=> {
	periodictask ()
} , 1800 ) 
// 1500
// cr on.schedule("* * * * * *", async () => {});

module.exports = {
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
        ac tive: 1,
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


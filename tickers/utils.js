
// const {getstatsofarray } = require ( '../utils/common' ) 
// const db=require( '../models')
// let dbtickers  = require('../models-tickers')
// let dbstreams = require( '../models-streamer')
// const { IPADDRESS_MY } =require('../configs/configs') 
// const cron = require( 'node-cron' )
 // const moment=require('moment')
// const { Op} = db.Sequelize
const LOGGER=console.log
const PREC_VOLUME = 6
const ISFINITE = Number.isFinite
const get_candle_from_price_volume_arr =arr =>{
	let sumvolumes = arr.map( elem=> ISFINITE(+elem.volume) ? +elem.volume : 0 ).reduce ( (a,b)=> a+b, 0 )
	let high=-1*10**6,low=+1*10**9,open,close 
	for ( let idx=0;idx<arr.length;idx ++ ) {
		if ( + arr[ idx ].high > high ) { high = + arr[ idx ].high } else {}
		if ( + arr[ idx ].low < low ) { low = + arr[ idx ].low } else {}
		if ( isNaN ( + open )  ) { open = arr[ idx ].open }  else {}
		if ( isNaN ( + close)  ) { close= arr[ idx ].close} else {}
//		if ( isNaN ( + open ) && ISFINITE ( + arr[ idx ].open ) ) { open = arr[ idx ].open }  else {}
	//	if ( isNaN ( + close) && ISFINITE ( + arr[ idx ].close) ) { close= arr[ idx ].close} else {}
	}
	if(sumvolumes >0){ sumvolumes = sumvolumes.toFixed(PREC_VOLUME ) }  else {}
	return { open , high
		, low : low ? low : null 
		, close , volume :sumvolumes }
}
module.exports= { 
	get_candle_from_price_volume_arr 

}

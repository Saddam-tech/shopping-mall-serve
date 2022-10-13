// const cl iredisa = require('async-redis').createClient();
const db=require('../models')
const moment=require('moment')
const LOGGER=console.log
const ISFINITE=Number.isFinite

const remove_0=candle=>{
	let { open , high , low, close, timestamp , timestamp1 , volume } =candle	
	let arr4pts = [ +open , +high , +low, +close ] 
	let arrfinites = arr4pts.filter ( elem => ISFINITE ( elem ) && elem>0 )
	let jdata 
	if (arrfinites.length ) {
		let replaceelem = arrfinites.reduce ( (a,b)=>a+b, 0 ) / arrfinites.length 
  	jdata = {
    	open : ISFINITE( +open) && +open>0? open :replaceelem ,
	    high : ISFINITE( +high ) && +high>0? high :replaceelem,
  	  low : ISFINITE ( +low ) && +low>0 ? low :replaceelem,
    	close : ISFINITE ( +close) && +close>0 ? close :replaceelem,
	    volume,    //		, timestamp // : ''    //	, timestamp1 // : ''
  	  starttime: timestamp,
	    endtime: timestamp1, show : true
  	};
//	  true && LOGGER(`@jdata`,  STRINGER( jdata) );
	} else {
		jdata = { open:null,high:null,low:null,close:null,volume:null,  	  starttime: timestamp,	    endtime: timestamp1, show : false	}
	}
	return jdata
}
const polish_candles=arrcandles=>{
	return arrcandles.map ( elem => remove_0( elem ) )
}
module.exports = (io, socket) => {
  socket.on('get_ticker_price_05sec', async (data) => {
    console.log('get_ticker_price_05sec', moment().format('HH:mm:ss.SSS' ),  data);
    // if(data === 'BTC/USD') {
    //   data = 'BTCUSDT'
    // }
		let resp = await db['tickercandles'].findAll ( {raw: true ,
			where : {	symbol : data , timelengthinsec : 5	} ,
			limit : 1 ,
			order : [ ['timestamp' , 'DESC' ] ]
		} )
//    let price = await cli redisa.hget('STREAM_ASSE T_PRICE', data);
  
    socket.emit('get_ticker_price_05sec', polish_candles ( resp  ) );
  })
}




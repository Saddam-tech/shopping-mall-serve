// const cli redisa = require('async-redis').createClient();
const db=require('../models')
const { get_time_closest_ticker}=require( '../utils/tickers' ) 
const moment=require('moment')
/** const get_latest_candle=async symbol=>{
	return await db[ 'tickercandles' ].findAll( {raw: true
		, 		where : { symbol }
		, order : [ ['timestamp' , 'DESC' ] ]
		, limit : 1
	} )
}*/
module.exports = (io, socket) => {
  socket.on('get_ticker_price', async (data) => {
    // console.log('get_ticker_price',data);
    // if(data === 'BTC/USD') {
    //   data = 'BTCUSDT'
    // }
//    let price = await cli redisa.hget('STREAM_ASSET_PR ICE', data);
			let timenow=moment().unix()
		let price = await get_time_closest_ticker( { symbol : data , reftimepointsec : timenow
			, output_is_object_or_scalar : 'scalar'
			, timelengthinsec : 5
		} )
//  	let resp = await get_latest_candle ( data ) 
    socket.emit('get_ticker_price', price );
//    socket.emit('get_ticker_price', price);
  })
}




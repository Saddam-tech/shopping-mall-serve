const cliredisa = require('async-redis').createClient();
const db=require('../models')
const moment=require('moment')
const LOGGER=console.log

module.exports = (io, socket) => {
  socket.on('get_ticker_price_01sec', async (data) => {
    console.log('get_ticker_price_01sec', moment().format('HH:mm:ss.SSS' ),  data);
    // if(data === 'BTC/USD') {
    //   data = 'BTCUSDT'
    // }
		const timestart = moment().startOf('second').unix()		
//		let resp = await db['tickercandles'].findAll ( {raw: true ,
		let resp = await db['tickerrawstreamdata'].findAll ( {raw: true ,
			where : {	symbol : data	,
				timestamp : { [Op.between ] : [ timestart , timestart + 1 ] }
			} ,
//			limit : 1 ,
	//		order : [ ['timestamp' , 'DESC' ] ]
		} )
			if ( resp && resp.length ) {
				let volume= resp.map( elem=> +elem.volume).reduce ( (a,b)=> a+b, 0 ) 
				let price =	resp.map(elem => +elem.price * +elem.volume).reduce( (a,b)=>a+b, 0 )
				price /= volume  
	//    let price = await cliredisa.hget('STREAM_ASSET_PRICE', data);
		    socket.emit('get_ticker_price_01sec', { price , volume , starttime : timestart , endtime: timestart + 1 );
			} else { 
		    socket.emit('get_ticker_price_01sec', { price : null 
					, volume : null  
					, starttime : timestart , endtime: timestart + 1 );
			}
  })


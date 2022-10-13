const cliredisa = require('async-redis').createClient();
const db=require('../models')
const moment=require('moment')
const LOGGER=console.log

module.exports = (io, socket) => {
  socket.on('get_ticker_price_05sec', async (data) => {
    console.log('get_ticker_price_05sec', moment().format('HH:mm:ss.SSS' ),  data);
    // if(data === 'BTC/USD') {
    //   data = 'BTCUSDT'
    // }
		let resp = await db['tickercandles'].findAll ( {raw: true ,
			where : {	symbol : data	} ,
			limit : 1 ,
			order : [ ['timestamp' , 'DESC' ] ]
		} )
//    let price = await cliredisa.hget('STREAM_ASSET_PRICE', data);
  
    socket.emit('get_ticker_price_05sec', resp );
  })
}




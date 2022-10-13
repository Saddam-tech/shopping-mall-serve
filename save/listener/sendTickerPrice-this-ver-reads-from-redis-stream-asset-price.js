
const { redisconfig } = require('../configs/redis.conf' )
const cliredisa = require('async-redis').createClient( redisconfig );

module.exports = (io, socket) => {
  socket.on('get_ticker_price', async (data) => {
    // console.log('get_ticker_price',data);
    // if(data === 'BTC/USD') {
    //   data = 'BTCUSDT'
    // }
    let price = await cliredisa.hget('STREAM_ASSET_PRICE', data);
  
    socket.emit('get_ticker_price', price);
  })
}




const jwt = require('jsonwebtoken');
const {
  bindUsernameSocketid,
  unbindsocket,
  deleteSocketid,
  unbindsocketid,
} = require('../utils/sockets');
const fs = require('fs');
const path = require('path');
// const cr on = require('node-c ron');
// const clir edisa = require('async-redis').createClient();
let moment = require('moment');
const { redisconfig } = require('../configs/redis.conf' )
const cliredisa = require("async-redis").createClient( redisconfig );

module.exports = (io) => {
  const listenersPath = path.resolve(__dirname);
  // console.log(io);
  io.use((socket, next) => {
    // console.log('socket', socket);
    fs.readdir(listenersPath, (err, files) => {
      if (err) {
        process.exit(1);
      }
      files.map((fileName) => {
        if (fileName !== 'index.js') {
					if ( fileName.match ( /\.js$/  )) {}
					else { return }
          require(path.resolve(__dirname, fileName))(io, socket);
        }
      });
    });
    if (socket.handshake.query && socket.handshake.query.token) {
      jwt.verify(
        socket.handshake.query.token,
        process.env.JWT_SECRET,
        function (err, decoded) {
          if (err) return next(new Error('Authentication error'));
          // console.log('successful', decoded);
          socket.decoded = decoded;
          next();
        }
      );
    } else {
      console.log('Error:: connection');
      // next(new Error('Authentication error'));
      socket.decoded = false;
      // console.log('socket.decoded', socket.decoded);
      next();
    }
  }).on('connection', async (socket , next) => {
    // console.log('socket', socket.nsp.sockets);
    // console.log(socket.decoded, ' / ', socket.id);
    // const asyncBlock = async () => {
    //   await client.set("string key", "string val");
    //   const value = await client.get("string key");
    //   console.log(value);
    //   await client.flushall("string key");
    // };
		cliredisa.incr ( 'SOCKETCOUNT' )
    let userId;
    await jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET,
      function (err, decoded , next ) {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        if (socket.decoded.id) {
          userId = decoded.id;
        }
        if (socket.decoded.demo_uuid) {
          userId = decoded.demo_uuid;
        }
      }
    );

    if (userId) {
      bindUsernameSocketid(userId, socket.id);
      // console.log(
      //   `@@@@@@@@@@@@@@@@@@@@@@@@${socket.id},${userId} socket connected`
      // );
    } else {
    }
    
    socket.on('disconnect', () => {
      //		unbindIpPortSocket( address , socket.id )
      deleteSocketid(socket.id);
      unbindsocket(userId);
		cliredisa.decr ( 'SOCKETCOUNT' )
      // unbindsocketid(socket.id);
      // console.log(`@@@@@@@@@@@@@@@@@@${socket.id} socket DISconnected`);
    });
  });

  io.of('/noauth').on('connection', (socket) => {
    console.log(socket.id);
    fs.readdir(listenersPath, (err, files) => {
      if (err) {
        process.exit(1);
      }
      files.map((fileName) => {
        if (fileName !== 'index.js') {
          require(path.resolve(__dirname, fileName))(io, socket);
        }
      });
    });
  });
};



var app = require('../app');
var listener = require('../listener');
var debug = require('debug')('bin-api');
var http = require('http');

require('dotenv').config();
console.log(process.env.JWT_SECRET);
const TESTPORT = 30708;

var PORT = normalizePort(process.env.PORT || TESTPORT);
app.set('port', PORT);

const LOGGER = console.log;

const https = require('https');
const fs = require('fs');
const server_https = https
  .createServer(
    {
      key: fs
        .readFileSync('/etc/nginx/ssl/options1.net/options1.net.key')
        .toString(),
      cert: fs
        .readFileSync('/etc/nginx/ssl/options1.net/options1.net.crt')
        .toString(),
    },
    app
  )
  .listen(TESTPORT + 10);
const {
  bindUsernameSocketid,
  unbindsocket,
  deleteSocketid,
  unbindsocketid,
} = require('../utils/sockets');
const jwt = require('jsonwebtoken');

const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
});



// app.set('io', io);

// io.use((socket, next) => {
//   next();
// }).on('connection', async (socket) => {
//   // console.log(socket.decoded, ' / ', socket.id);
//   // console.log(socket.sids);

//   let userId;
//   await jwt.verify(
//     socket.handshake.query.token,
//     process.env.JWT_SECRET,
//     function (err, decoded) {
//       if (err) return next(new Error('Authentication error'));
//       socket.decoded = decoded;
//       if (socket.decoded.id) {
//         userId = decoded.id;
//       }
//       if (socket.decoded.demo_uuid) {
//         userId = decoded.demo_uuid;
//       }
//     }
//   );
//   // console.log(userId, );
//   if (userId) {
//     bindUsernameSocketid(userId, socket.id);
//   } else {
//   }
//   console.log(
//     `@@@@@@@@@@@@@@@@@@@@@@@@${socket.id},${userId} socket connected`
//   );
//   socketTest(socket);
//   socket.on('disconnect', () => {
//     //		unbindIpPortSocket( address , socket.id )
//     deleteSocketid(socket.id);
//     unbindsocket(userId);
//     console.log(`@@@@@@@@@@@@@@@@@@${socket.id} socket DISconnected`);
//   });
// });

const https_io = require('socket.io')(server_https, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
});

app.set('socketIo', https_io);
/////////////////////////////////////////////////  베팅 종료알림 /////////////////////////////////////////////////
const cron = require('node-cron');
const cliredisa = require('async-redis').createClient();
const moment = require('moment');
const db = require('../models');

const betClosedSocketMessage = async () => {
  let timenow = moment().startOf('minute');
  let now_unix = moment().startOf('minute').unix();
  let socketList = await cliredisa.hgetall('USERNAME2SOCKID');
  if (socketList) {
    socketList = Object.entries(socketList);
  } else {
    return;
  } 

  for (let i = 0; i < socketList.length; i++) {
    let [userId, userSocketId] = socketList[i];
    let betlogs;

    if(isNaN(userId)) {
      betlogs = await db['betlogs'].findAll({
        where: { expiry: now_unix, uuid: userId},
        raw: true,
       });
    } else {
      betlogs = await db['betlogs'].findAll({
        where: { expiry: now_unix, uid: userId},
        raw: true,
       });
    }

    if(betlogs.length === 0 ) {
      continue;
    } 
    let socketDataList = [];
    betlogs.map(async (betlog) => {
        let { status, diffRate, amount, assetName, uid, uuid } = betlog;         // let usersocketid = await cliredisa.hget('USERN AME2SOCKID', uid);        // 						if ( j_ socketdata_issent[ uuid ] ) { ret urn }        //						else {}
        let profit = 0;
        if (status === 1) {
          if (diffRate === 0) {
            profit = amount / 10 ** 6;
          } else {
            profit = (((amount / 10 ** 6) * diffRate) / 100).toFixed(2);
          }
        }
        if (status === 0) {
          profit = (-1 * amount) / 10 ** 6;
        }
        let socketData = {
          name: assetName,
          profit: profit,
          data: betlog,
        };
        socketDataList.push(socketData)
      });
      // console.log('socketDataList',socketDataList);
      https_io.to(userSocketId).emit('bet_closed', socketDataList)
  }
}

cron.schedule('1 * * * * *', () => {
  let now_unix = moment().startOf('minute').unix();
  console.log('@@@@ betClosedSocketMessage @@@@', now_unix);
  betClosedSocketMessage()
}); 


////////////////////////////////////////////////////////////////////////////////////////////////////////////  



server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
LOGGER(`listening ${PORT} @binary`);
// io.on('connection_error', (err) => {
//   console.log('errrrrrrrrrrrrrrr', err);
// });

listener(https_io);
// schedule(https_io);

/**
 * Normalize a port into a number, string, or false.
 */

/* const https = require('https');
const fs = require('fs');
const server_https = https
  .createServer(
    {
      key: fs.readFileSync('../bin-opt/ssl/options1.net.key').toString(),
      cert: fs.readFileSync('../bin-opt/ssl/options1.net.crt').toString(),
    },
    app
  )
  .listen(TESTPORT + 10);
*/
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
/**
 * Socket Server Listener
 */

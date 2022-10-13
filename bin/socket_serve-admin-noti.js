#!/usr/bin/env node

const app = require('express')();
var http = require('http');
const STRINGER=JSON.stringify
const express= require('express')
const router = express.Router()
const LOGGER = console.log;
const PARSER = JSON.parse;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var logger = require('morgan');
const cors = require('cors');
app.use(cors());
app.use(logger('dev'));
router.post ( '/test/socketmessage' , (req,res)=>{ // /:title //	let { title } = req.params
	let str = STRINGER ( req.body )
	req.params && LOGGER( '@params', STRINGER ( req.params ))
	LOGGER( '@socket req.body',req.body )
	app.io.emit ('message' , str );
	app.io_ws.emit ('message', str );
	res.status(200).send({status:'OK'})
})

app.use ( '/socket' , router )
// const { PORT_NUMBER_SOCKET } = require('../configs/configs');
const PORT_NUMBER_SOCKET = 37521
const https = require('https');
const fs = require('fs');
// const cliredisa = require('async-redis').createClient();
// const { bindsocket, unbindsocket } = require('../utils/sockets');

let jusername_socket = {};
/////////////////////////
const server_http = require('http').createServer(app);
server_http.listen(PORT_NUMBER_SOCKET, (_) => {
  console.log(`ws listening ${PORT_NUMBER_SOCKET}`);
});
app.io_ws = require('socket.io')(server_http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    transports: ['websocket', 'polling'],
    credentials: true,
  },
  allowEIO3: true,
});
app.set('socket.io_ws', app.io_ws);
app.io_ws.on('connection', (socket) => {
  socket.emit('test', '@admin noti ws connected');
  const address = socket.request.connection.remoteAddress; // getipsocket(socket) // socket.request.connection.remoteAddress // socket.handshake.address
  const port = socket.request.connection.remotePort; //  LOGGER(socket.request.connection)
  LOGGER(`${socket.id},${address},${port}, socket connected`);
  LOGGER('rz9TWxHI6C', socket.request._query);
  LOGGER(socket.handshake.query);

  let { username } = socket.request._query;
  let { id: socketid } = socket;
  if (username) {
//    bindsocket(username, socketid);
    jusername_socket[username] = socket;
  }
  socket.on('disconnect', () => {
    const address = socket.request.connection.remoteAddress;
    LOGGER(`${socket.id},${address},${port} socket DISconnected`);
//		username &&    unbindsocket(username);
    setTimeout((_) => {
      delete jusername_socket[username];
    }, 1000);
  });
});
///////////////////////
var port = normalizePort(process.env.PORT || PORT_NUMBER_SOCKET);
const server_https = https
  .createServer(
    {
      key: fs.readFileSync('/etc/nginx/ssl/options1.net/options1.net.key').toString(),
      cert: fs.readFileSync('/etc/nginx/ssl/options1.net/options1.net.crt').toString(),
    },
    app
  )
  .listen(PORT_NUMBER_SOCKET + 10);
LOGGER(`wss listening ${PORT_NUMBER_SOCKET + 10}`);

// const server_http= http	.createServer(	 app	)
// server_http.listen( PORT_NUMBER_SOCKET)
app.io = require('socket.io')(
  server_https,  //, { cors: { origin: "*" } }  // {}
  {
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      transports: ['websocket', 'polling'],
      credentials: true,
    },
    allowEIO3: true,
  }
); // SOCKET
app.set('socketio', app.io);
app.io.on('connection', (socket) => {
	socket.emit('test', '@admin noti wss connected');
  const address = socket.request.connection.remoteAddress; // getipsocket(socket) // socket.request.connection.remoteAddress // socket.handshake.address
  const port = socket.request.connection.remotePort; //  LOGGER(socket.request.connection)
  LOGGER(
    `===========================================================${socket.id},${address},${port}, socket connected=====================================`
  );
  LOGGER('rz9TWxHI6C', socket.request._query);
  LOGGER(socket.handshake.query);

  let { username } = socket.request._query;
  let { id: socketid } = socket;
  if (username) { //    bindsocket(username, socketid);
    jusername_socket[username] = socket;
  }
  socket.on('disconnect', () => {
    const address = socket.request.connection.remoteAddress;
    LOGGER(`${socket.id},${address},${port} socket DISconnected`);
 //   username && unbindsocket(username);
    setTimeout((_) => {
      delete jusername_socket[username];
    }, 1000);
  });
});
// app.io.e mit('test', 'TESTTTTTTTTTTTTTTTT');

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
// let rmqq = 'BROADCAST_MESSAGE';
let rmqq = 'ADMIN_MESSAGE';
let rmqopen = require('amqplib').connect('amqp://localhost');
rmqopen
  .then(function (conn) {
    false && LOGGER('', conn);
    return conn.createChannel();
  })
  .then(function (ch) {
    return ch.assertQueue(rmqq).then(function (ok) {
      return ch.consume(rmqq, function (msg) {
        if (msg !== null) {
          let strmsg = msg.content.toString();
          //          parse_q_msg(strmsg);
          true && console.log('@rmq msg rcvd', strmsg);
          app.io.emit ('message' , strmsg);
          app.io_ws.emit ('message', strmsg);
//          app.io.send(strmsg);
          try {
            let jdata = PARSER(strmsg);
            false && LOGGER('@rmq msg rcvd', jdata);
          } catch (e) {
            LOGGER(e);
          }
          ch.ack(msg);
        }
      });
    });
  })
  .catch(console.warn);
/* const cron = require('node-cron')
cron.sch edule('0 *10 * * * *', () => {
  web3.eth.getBlockNumber().then((resp) => {
    console.log(now);
    console.log('block number', resp);
  });
});
*/
/**
 * Module dependencies.
 */
// var app = require('../app');
// var debug = require('debug')('socket-serve-20211016:server');

/** 
const io = require( 'socket.io' )( server )
app.get ( '/', (req,res)=>{
	res.status(200).send ( { status: 'OK'}) 
})
*/

/**
app.set('port', port );
LOGGER(`listening ${port}` )
var server_http = http.createServer(app);
server_http.listen(port);
server_http.on('error', onError);
server_http.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
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
function onListening() {
  var addr = server_http.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
*/

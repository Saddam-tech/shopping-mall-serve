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
const KEY_USER2SOCKETID = 'U2S'
const KEY_S2U = 'S2U'
 app.use ( '/socket' , router ) // const { PORT_NUMBER_SOCKET } = require('../configs/configs');
const PORT_NUMBER_SOCKET = 38677 //  37521
const https = require('https');
const fs = require('fs');
const cliredisa = require('async-redis').createClient();
// const { bindsocket, unbindsocket } = require('../utils/sockets');
// let jusername_socket = {};
///////////////////////
// var port = normalizePort(process.env.PORT || PORT_NUMBER_SOCKET);
const server_https = https
  .createServer(
    {
      key: fs.readFileSync('/etc/nginx/ssl/options1.net/options1.net.key').toString(),
      cert: fs.readFileSync('/etc/nginx/ssl/options1.net/options1.net.crt').toString(),
    },
    app
  )
  .listen(PORT_NUMBER_SOCKET + 10);
LOGGER(`wss listening ${PORT_NUMBER_SOCKET + 10}`);  // const server_http= http	.createServer(	 app	) // server_http.listen( PORT_NUMBER_SOCKET)
app.io = require('socket.io')(  server_https,  //, { cors: { origin: "*" } }  // {}
  {    cors: {
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
	socket.emit('test', 'wss connected');
  const address = socket.request.connection.remoteAddress; // getipsocket(socket) // socket.request.connection.remoteAddress // socket.handshake.address
  const port = socket.request.connection.remotePort; //  LOGGER(socket.request.connection)
  LOGGER(
    `===========================================================${socket.id},${address},${port}, socket connected=====================================`
  );
  LOGGER('rz9TWxHI6C', socket.request._query);
  LOGGER(socket.handshake.query);

  let { username } = socket.request._query;
  let { id: socketid } = socket;
  if (username) { //    bindsocket(username, socketid); //    jusern ame_socket[username] = socket;
		cliredisa.hset ( KEY_S2U , socketid , username )
  }
  socket.on('disconnect', () => {
    const address = socket.request.connection.remoteAddress;
    LOGGER(`${socket.id},${address},${port} socket DISconnected`);  //   username && unbindsocket(username);
    setTimeout((_) => {
			cliredisa.hdel ( KEY_S2U , socketid ) //      delete juser name_socket[username];
    }, 1000);
  });
}); // app.io.e mit('test', 'TESTTTTTTTTTTTTTTTT');

const find_and_noti_bet_result =async _=>{
  let startofminute = moment().startOf('minute');
	let socketlist = await cliredisa.hgetall (KEY_S2U  )
	if ( socketlist ) { socketlist = Object.entries ( socketlist ) }
	else { return }
	let stats= { delivered : 0, socketsdeleted : 0 , activesockets : 0 }
	for ( let idx = socketlist.length -1; idx>=0 ; idx-- ) {
		let [ usersocketid , username ] = socketlist [ idx ]
		if ( app.io.sockets[ usersocketid ] ) {}
		else { cliredisa.hdel ( KEY_S2U , usersocketid ) ; stats.socketsdeleted ++ ; continue }
		stats.activesockets ++
		let betlogs = await db['betlogs'].findAll ( { raw: true
			, where : { expiry : startofminute , uid : username , }
		} )	
		if ( betlogs.length == 0 ){ continue }
		betlogs.forEach ( async betlog => {
      let { status, diffRate, amount, assetName, uid, uuid } = betlog;         // let usersocketid = await cliredisa.hget('USERN AME2SOCKID', uid);        // 						if ( j_ socketdata_issent[ uuid ] ) { ret urn }        //						else {}
      let profit = 0;
      if (status === 1) {
        if (diffRate === 0) {          profit = amount / 10 ** 6;
        } else {          profit = (((amount / 10 ** 6) * diffRate) / 100).toFixed(2);
        }
      }
      if (status === 0) {        profit = (-1 * amount) / 10 ** 6;
      }
      let socketData = {        name: assetName,        profit: profit,        data: betlog,
      }
			app.io.to ( usersocketid ).emit ( 'bet_closed' , socketdata )
			stats.delivered ++
		})
	}
	LOGGER( '@socket deliver stats' , stats )
}
cron.schedule('2 * * * * *', () => {
    let now_unix = moment().startOf('minute').unix();
    console.log('@betCloseMessage', now_unix);
    find_and_noti_bet_result ();
}); 

function normalizePort(val) {
  var port = parseInt(val, 10);
  if (isNaN(port)) {    // named pipe
    return val;
  }
  if (port >= 0) {    // port number
    return port;
  }
  return false;
}
/////////////////////////
if ( false ) { const server_http = require('http').createServer(app);
server_http.listen(PORT_NUMBER_SOCKET, (_) => {
  console.log(`ws listening ${PORT_NUMBER_SOCKET}`);
});
app.io_ws = require( 'socket.io' )(server_http, {
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
  socket.emit('test', 'ws connected');
  const address = socket.request.connection.remoteAddress; // getipsocket(socket) // socket.request.connection.remoteAddress // socket.handshake.address
  const port = socket.request.connection.remotePort; //  LOGGER(socket.request.connection)
  LOGGER(`${socket.id},${address},${port}, socket connected`);
  LOGGER('rz9TWxHI6C', socket.request._query);
  LOGGER(socket.handshake.query);
  let { username } = socket.request._query;
  let { id: socketid } = socket;
  if (username) {
		cliredisa.hset ( KEY_S2U , socketid , username )  //    bindsocket(username, socketid); //    juserna me_socket[username] = socket;
  }
  socket.on('disconnect', () => {
    const address = socket.request.connection.remoteAddress;
    LOGGER(`${socket.id},${address},${port} socket DISconnected`); //		username &&    unbindsocket(username);
		cliredisa.hdel ( KEY_S2U , socketid )
	    setTimeout((_) => { //      delete juser name_socket[username];
    }, 1000);
  });
});
}


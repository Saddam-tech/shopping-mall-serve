var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype } = require("../utils/common");
const jwt = require("jsonwebtoken");
const { auth, softauth } = require("../utils/authMiddleware");
const db = require("../models");
const { lookup } = require("geoip-lite");
var crypto = require("crypto");
const LOGGER = console.log;
let { Op } = db.Sequelize;
const { web3 } = require("../configs/configweb3");
let { I_LEVEL, LEVEL_I } = require("../configs/userlevel");
let moment = require("moment");
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { sendMessage } = require("../services/twilio");
const { sendEmailMessage } = require("../services/nodemailer");
const { v4: uuidv4 } = require("uuid");
const e = require("express");
const KEYS = Object.keys;
const ISFINITE = Number.isFinite;
const { getipaddress } = require("../utils/session");
// require("do tenv").config();
const PARSER = JSON.parse;
const { findone, createrow , createifnoneexistent } = require("../utils/db");
const { redisconfig} =require('../configs/redis.conf')
const cliredisa = require("async-redis").createClient( redisconfig );

router.post("/ticker/", async (req, res) => {
  let m0 = moment();
//  LOGGER(`@post ticker`, req.body);
  let { timestamp, timestamp1, timelengthinsec, strjdata, serversource } =
    req.body;
  false && console.log("ARBITRATOR : ", serversource);
  let jdata = PARSER(strjdata);
  let timeofdaystamp = +timestamp % (3600 * 24);

  KEYS(jdata).forEach(async (elem) => {
//    console.log("jdata", jdata);
  //  console.log("jdata11", jdata[elem]);
    // if (jdata[elem].close) {
    // } else {
    //   return;
    // }
    let symbol = elem;
//    let resp = await findone("incomingtickercounts", {      timeofdaystamp,      symbol,      //   act ive: 1,    });
		let resp = await findone ( 'tickercandles' , {  symbol , timestamp, timelengthinsec }  ) 
    if (resp) { // LOGGER( ); 
			return // respok ( res, 'DUPLICATE' ) ; return 
    } //
    else {  //    await createrow("tickercandles", {
			await createifnoneexistent ( 'tickercandles',  {symbol , 
  	    timestamp,
	      timelengthinsec, } , {
  	    timestamp1,
    	  serversource,
      	...jdata[elem],
	    });	
  	  false && await db["incomingtickercounts"].upsert(
    	  { count: 1, active: 1 },
	      { timeofdaystamp , symbol }
  	  );
			let { volume , close } = jdata[ elem ] 
			cliredisa.hset("STREAM_ASSET_PRICE", elem , close )
        cliredisa.hset("STREAM_ASSET_VOLUME", elem , volume );
        cliredisa.hset("STREAM_ASSET_UPDATE",  elem , timestamp);
        cliredisa.hset("STREAM_ASSET_UPDATE_MILI", elem , timestamp * 1000 + 500 );
        cliredisa.hset("STREAM_ASSET_UPDATE_SEC", elem , timestamp);

    }
  });
	false &&		await db['tickercandles'].bulkCreate ( convja ( jdata ) , { raw : true , plain : true } ) 
  let m1 = moment();
  respok(res, null, null, { timedelta: m1 - m0 });
});
// 182   await db['incomingtickercounts'].upsert ( { count : tickercount_BTCETH  } , { timeofdaystamp } )
// incomingtickercounts
// timeofdaystamp | int(11)          | YES  | MUL | NULL                |                               |
// | count  ac tive
module.exports = router;

const convja =( { jdata , key , } )=> {
	return KEYS( jdata ).map ( key => {
		return { ... jdata[ key ] , symbol : key } 
	})
}
const cron = require("node-cron");
cron.schedule(`53 * * * * *`, (_) => {
  //	let timeofdaystamp =
  let timethreshold = moment().subtract(15, "minutes").unix() % (3600 * 24);
  setTimeout((_) => {
    db["incomingtickercounts"].destroy({
      where: { timeofdaystamp: { [Op.lt]: timethreshold } },
    });
  }, 0);
});

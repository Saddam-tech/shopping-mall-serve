var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype
	, create_uuid_via_namespace 
 } = require("../utils/common");
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
const KEYS = Object.keys;
const ISFINITE = Number.isFinite;
const { getipaddress } = require("../utils/session");
const { closetransactions } = require("../services/close-transactions");
require("dotenv").config({ path: "../.env" });
let { redisconfig } =require('../configs/redis.conf' )
const cliredisa = require('async-redis').createClient( redisconfig )
async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log(process.env.GOOGLE_CLIENT_ID);
  const payload = ticket.getPayload();
  return payload;
}


router.post ( '/processing-request' , auth , async ( req,res)=>{ LOGGER(req.body )
	let { id : uid } =req.decoded
	let { arrorderuuids , txhash , amount , amountunit  } = req.body
	let { nettype } =req.query
	closetransactions ( { txhash , nettype , amount ,amountunit , arrorderuuids , uid } )
	respok ( res )
})
router.get ( '/receiving-agents'  , auth , async ( req,res)=>{ // LOGGER( '@decoded' , req.decoded )
	let { id : uid , mybranch } = req.decoded
	if ( mybranch ) {}
	else { resperr ( res, 'DATA-NOT-FOUND' ) ; return } 
	let list = await db['bankaccounts'].findAll( { raw: true , where : { uid : mybranch } } )
 	respok ( res, null,null, { list } ) 
})
router.post ( '/:uuid' ,auth , async (req,res)=>{
	let { id : uid , mybranch } =req.decoded
	let { uuid : accountuuid } = req.params
	let { amount, amountunit , timestamp ,sendingbank,sendingaccount,sendernamei , txmemo } = req.body
	if ( amount && ISFINITE (+amount)) { }
	else { resperr ( res, 'INVALID-ARG' , null, { reason: 'amount field'} ) ; return }
	let respbankaccount = await db[ 'bankaccounts' ].findOne ( {raw: true , where : { uuid : accountuuid , uid : mybranch } })
	if( respbankaccount ) {}
	else { resperr( res, 'INVALID-RECEIVING-BANK' ) ; return } 
	let uuid = create_uuid_via_namespace( `${uid}_${accountuuid}_${moment().valueOf()}` ) 
	let respexchangerate = await cliredisa.hget ('FOREX' , `USD/${amountunit}` )

	await db[ 'txrequests'] .create ( {
		receiver : mybranch
		, receiveraccount : respbankaccount.id
		, amount
		, amountunit : amountunit? amountunit : null
		, useractiontimeunix : timestamp || null
		, uid
		, status : 0
		, uuid
		, amountconverted0 : +amount * +respexchangerate
	})
	respok ( res, null,null, { uuid } )
})
module.exports = router;
/** txrequests;
| receiver           | int(10) unsigned    | YES  |     | NULL                |                               |
| receiveraccount    | int(10) unsigned    | YES  |     | NULL                |                               |
| amount             | varchar(20)         | YES  |     | NULL                |                               |
| amountunit         | varchar(20)         | YES  |     | NULL                |                               |
| useractiontime     | varchar(30)         | YES  |     | NULL                |                               |
| useractiontimeunix | bigint(20) unsigned | YES  |     | NULL                |                               |
| uid                | int(10) unsigned    | YES  |     | NULL                |                               |
| status             | tinyint(4)          | YES  |     | NULL                |                               |

 bankaccounts ;
| nation    | varchar(20)      | YES  |     | NULL                |                               |
| bankname  | varchar(100)     | YES  |     | NULL                |                               |
| account   | varchar(100)     | YES  |     | NULL                |                               |
| iban      | varchar(100)     | YES  |     | NULL                |                               |
| uid       | int(10) unsigned | YES  |     | NULL                |                               |
| isprimary | tinyint(4)       | YES  |     | NULL                |                               |
| uuid      | varchar(60)      | YES */

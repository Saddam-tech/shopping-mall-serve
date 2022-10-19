var express = require("express");
let { respok, resperr } = require("../utils/rest");
const jwt = require("jsonwebtoken");
const { softauth, auth } = require("../utils/authMiddleware");
const db = require("../models");
var crypto = require("crypto");
const LOGGER = console.log;
// const { withdraw } = require("../services/withdrawal");
const { sendtoken } = require( '../services/send_token_bnb' )
const { closeTx } = require("../services/closeTx");
const { watchTransfers } = require("../services/trackTx");
let { Op } = db.Sequelize;
const moment = require("moment");
var router = express.Router();
const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");
const { sendeth } = require ( '../services/sendeth' )
const { supported_net } = require("../configs/configweb3");
const { convaj } = require('../utils/common')
const { ADDRESSES } = require ('../configs/addresses' )
const { getethbalance } = require('../utils/eth')
const { resolve_nettype } =require('../utils/nettypes')
const { MIN_ADMIN_LEVEL } = require('../configs/configs')
const KEYS = Object.keys;
const { messages } = require('../configs/messages')

const { filehandler } = require("../utils/file-uploads");
router.put ( '/item' , 
  filehandler.fields([
    { name: "image00", maxCount: 1 },
    { name: "image01", maxCount: 1 },
    { name: "image02", maxCount: 1 },
    { name: "image03", maxCount: 1 },
    { name: "image04", maxCount: 1 },
  ]) // , auth 
, async ( req,res)=>{
	let { id , isadmin } = req.decoded
	if ( id) {}
	else { resperr ( res, messages.MSG_PLEASE_LOGIN ) ; return } //	let { isadmin } = await db[ 'users' ].findOne ( {raw : true , where : { id } } )
	if ( isadmin && isadmin >= MIN_ADMIN_LEVEL ){	}
	else { resperr( res , messages.MSG_NOTPRIVILEGED ) ; return }

})
router.post ( '/item' , auth , async ( req,res)=>{
LOGGER( `@req.decoded` , req.decoded ) 
	let { id , isadmin } = req.decoded
	if ( id) {}
	else { resperr ( res, messages.MSG_PLEASE_LOGIN ) ; return } //	let { isadmin } = await db[ 'users' ].findOne ( {raw : true , where : { id } } )
	if ( isadmin && isadmin >= MIN_ADMIN_LEVEL ){	}
	else { resperr( res , messages.MSG_NOTPRIVILEGED ) ; return }
	if ( KEYS( 	req.body).length ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return } 
	let { name, manufacturername , manufacturerid , mfrid } = req.body	 
	if ( name) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let resp = await db[ 'items' ].create ( {
			... req.body
	})
	respok ( res , null , null , { respdata : { ... resp.toJSON() } } )
})
module.exports = router;


// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

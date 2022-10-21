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
const { messages }  = require('../configs/messages')
const { create_uuid_via_namespace } = require('../utils/common' )
const { ROOT_ADMIN_LEVEL } = require( '../configs/configs' )  
router.post ( '/approve-request/:uuid' , auth , async ( req,res )=>{
	let { uuid } = req.params
	let { isadmin } = req.decoded
	if ( isadmin >= ROOT_ADMIN_LEVEL ) {}
	else { resperr ( res, messages.MSG_NOTPRIVILEGED ) ; return }
	let respmerchant = await db[ 'merchants' ].findOne ( { raw : true , where : { uuid } } )
	await db[ 'merchants' ].update ( { status : 1 } , { where : { uuid } } )
	await db[ 'users' ].update ( { isadmin : 1 } , { where : { id : respmerchant.requester } } )
	respok ( res , messags.MSG_APPROVED  )  
})

router.post ( '/data' , auth , async ( req,res)=>{
	let { id : uid } =req.decoded
	if ( uid ) {}
	else { resperr( res , messages.MSG_PLEASELOGIN ) ; return }
//	let { merchantname }  =req.body
//	if ( merchantname ) {}
	// else { resperr( res, messages.MSG_ARGMISSING ) ; return } 
	let { merchantname , businesslicenseid , businesslicensenation }=req.body
	if ( merchantname && businesslicenseid && businesslicensenation ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let resp = await db[ 'merchants' ].findOne ( {
		raw: true , where : { businesslicenseid ,  }
	})
	if ( resp ) { resperr ( res, messages.MSG_DUPLICATEDATA ) ; return } else {}
	let uuid = create_uuid_via_namespace (  businesslicenseid )
	await db[ 'merchants' ].create ( {
//		... req.decoded		, 
		... req.body
		, name : merchantname
		, status : 0
		, uuid
		, requester : uid
	})
	respok ( res , null , null , { respdata : { uuid } } ) 
})
module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

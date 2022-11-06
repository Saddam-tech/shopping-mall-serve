var express = require("express");
let { respok, resperr } = require("../utils/rest");
const jwt = require("jsonwebtoken");
const { softauth, auth } = require("../utils/authMiddleware");
const db = require("../models");
var crypto = require("crypto");
const LOGGER = console.log;
// const { withdraw } = require("../services/withdrawal");
const { sendtoken } = require("../services/send_token_bnb");
const { closeTx } = require("../services/closeTx");
const { watchTransfers } = require("../services/trackTx");
let { Op } = db.Sequelize;
const moment = require("moment");
var router = express.Router();
const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");
const { sendeth } = require("../services/sendeth");
const { supported_net } = require("../configs/configweb3");
const { convaj, uuidv4 , create_uuid_via_namespace  } = require("../utils/common");
const { ADDRESSES } = require("../configs/addresses");
const { getethbalance } = require("../utils/eth");
const { resolve_nettype } = require("../utils/nettypes");
const { MIN_ADMIN_LEVEL } = require("../configs/configs");
const KEYS = Object.keys;
const { messages } = require("../configs/messages");
const fs = require("fs");
const shell = require("shelljs");
const { storefiletoawss3 } = require("../utils/repo-s3");
const { filehandler } = require("../utils/file-uploads");
const { countrows_scalar } = require("../utils/db");
const STRINGER = JSON.stringify

/** router.post ( '/shopping-cart/:uuid/:qty' , auth , async ( req,res) => {
	let { id : uid } = req.decoded
	if ( uid ) {}
	else { resperr ( res, messages.MSG_PLEASELOGIN ) ; return }
	let { uuid : itemuuid , qty} = req.params

	let uuid 
	let resp = await db[ 'shoppingcarts' ].findOne ( { raw: true , where : { uid } } )
	if ( resp ) {
	}
	= create_uuid_via_namespace ( `${uid}_${itemuuid}`)  
	let resp = await db['shoppingcarts'].findOne ( { raw: true, where : { uuid } } )
	let { options } = req.body 
	if ( resp ) {
		await db['shoppingcarts'].update ( { amount : +resp.amount + +qty
			, options : ( resp.options? resp.options : null  )
		} , { where : { uuid} } )
	} else {
		await db['shoppingcarts'].create ( { 
			uid
			, itemuuid
			, amount : qty
			, active : 1
			, uuid
			, options : ( options ? STRINGER ( options ) : null )  
		})
	}
	respok ( res, null,null, { respdata: { uuid } } )/this-ep-behavior-is-such-that-new-uuid-is-assigned-per-each-request
}) */
router.post ( '/shopping-cart/:uuid/:qty' , auth , async ( req,res) => {
	let { id : uid } = req.decoded
	if ( uid ) {}
	else { resperr ( res, messages.MSG_PLEASELOGIN ) ; return }
	let { uuid : itemuuid , qty} = req.params
	let uuid = create_uuid_via_namespace ( `${uid}_${itemuuid}`)  
	let { options } = req.body 

	let respitem = await db[ 'items'] .findOne ( { raw: true, where : { uuid : itemuuid } } )
	if ( respitem ) {}
	else { resperr ( res, messags.MSG_DATANOTFOUND ) ; return }
	let { price : unitprice } = respitem
	let amount = qty
	let resp = await db['shoppingcarts'].findOne ( { raw: true, where : { uuid } } )
	if ( resp ) {
		await db['shoppingcarts'].update ( { amount : +resp.amount + +qty
			, options : ( resp.options? resp.options : null  )
		} , { where : { uuid} } )
	} else {
		await db['shoppingcarts'].create ( { 
			uid
			, itemuuid
			, amount // : qty
			, active : 1
			, uuid
			, options : ( options ? STRINGER ( options ) : null )
			, unitprice
			, totalprice : +unitprice * +amount
		})
	}
	respok ( res, null,null, { respdata: { uuid } } )
})
module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

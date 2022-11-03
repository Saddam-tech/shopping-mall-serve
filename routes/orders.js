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
const { convaj, uuidv4 
	, getunixtimesec
} = require("../utils/common");
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
const { countrows_scalar
	, moverow
 } = require("../utils/db");
const { ORDER_STATUS
	, DELIVERY_STATUS
 } =require('../configs/const-defs' ) 

router.post( '/shipment' , auth , async ( req,res)=>{
	let { id : uid } = req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ); return }	
	let { arrorderuuids , carrierid , tracknumber } = req.body
	if ( arrorderuuids && arrorderuuids.length ) {}
	else { resperr ( res , messages.MSG_ARGMISSING , null, { reason : 'arrorderuuids'} ) ; return }
	if ( carrierid && tracknumber ) {}
	else { resperr ( res, messages.MSG_ARGMISSING , null , { reason : 'carrierid or tracknumber' } ) ; return }
	for ( let idx = 0 ; idx<arrorderuuids.length; idx ++ ) {
		let orderuuid = arrorderuuids [ idx ]
		let resporder = await db[ 'orders' ].findOne ( { raw: true, where : { uuid : orderuuid  } } )
		if ( resporder ) {}
		else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
		await db[ 'orders' ].update ( { status : ORDER_STATUS.ON_DELIVERY  } , { where : { id:resporder.id } } )
	}
	let uuid = uuidv4()
	let timestamp = getunixtimesec()
	await db['delivery'].create ( {
		carrierid
		, requesttimestamp : timestamp
		, status : 	DELIVERY_STATUS.ON_TRANSIT
		, carrierid
		, tracknumber
		, uuid
		, statusstr : 'ON_TRANSIT'
		, orderuuid 
	})
	respok ( res, null,null, { respdata : uuid } )	
})
router.post( '/shopping-cart' , auth , async ( req,res)=>{
	let { deliveryaddress , isusedefaultaddress } =req.body
	let { id : uid} = req.decoded
	let list = await db['shoppingcarts'].findAll ( { raw: true , where : { uid } } )
	if ( list && list.length ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let sumoforders = list.map ( elem => +elem.totalprice ).reduce ( (a,b)=>a+b , 0 )
	let respmybalance = await db['balances'].findOne ( { raw : true , where : {uid } } )
	if ( respmybalance ) {}
	else { resperr( res, messages.MSG_DATANOTFOUND , null , { reason : 'balance' } ) ; return }
	if ( +respmybalance.amount >= sumoforders) {}
	else { resperr( res, messages.MSG_BALANCENOTENOUGH ) ; return }
//	let transaction = db. 
	await db['balances'].update ( { amount : +respmybalance.amount - sumoforders } , { where : { uid } } )
	let uuid = uuidv4()
	if ( isusedefaultaddress ) {}
	else { } 
	for ( let idx = 0 ; idx<list.length ; idx ++ ) {
		let { itemid , itemuuid , amount , totalprice } = list[idx ]
		await db['orders'].create ( { 
			uid
			, itemid //  : list[ idx].itemid
			, itemuuid
			, quantity : amount
			, totalprice 
			, uuid
			, status : ORDER_STATUS.PLACED 
		})
	}
	respok ( res, null, null, { respdata : { uuid } } ) 
}) 

module.exports = router;



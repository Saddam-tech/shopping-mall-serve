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
const { convaj, uuidv4 } = require("../utils/common");
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
		let { itemid , amount , totalprice } = list[idx ]
		await db['orders'].create ( { 
			uid
			, itemid //  : list[ idx].itemid
			, quantity : amount
			, totalprice 
			, uuid
			, 
		})
	}
	respok ( res, null, null, { respdata : { uuid } } ) 
}) 

module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

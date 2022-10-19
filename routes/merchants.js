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

router.post ( '/request-approval' , auth , async ( req,res)=>{
	let { id : uid } =req.decoded
	if ( uid ) {}
	else { resperr( res , messages.MSG_PLEASELOGIN ) ; return }
	let { merchantname }  =req.body
	if ( merchantname ) {}
	else { resperr( res, messages.MSG_ARGMISSING ) ; return } 
	await db[ 'merchants' ].create ( {
		... req.decoded
		, name : merchantname
	})  
	respok ( res ) 
})
module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

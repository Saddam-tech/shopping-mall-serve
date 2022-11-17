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
const resolvedummy=async _=>{
	return null
}
router.get ( '/children-of-key/:key' , async ( req,res)=>{
	let { key } = req.params
//	key = key.replace(/\s/g, "")
	// key = key.replace ( /\n/g, '')
	key = key.replace ( /[\n\r\s]/g, '')
	elemfound = null
	recurse_find ( categories , +key )
	let list 
	if ( elemfound ) {
		list = elemfound.child.map ( elem => {
			let { name , displayItemCategoryCode } = elem 
			return { name , displayItemCategoryCode}
		})
	} else { list = []
	}
	respok ( res, null, null, { list } )
})
router.get ( '/level/0' , async ( req,res)=>{
//	let list = categories.map ( elem => elem.displayItemCategoryCode ) 
	let list = categories.child.map ( elem => { 
		let { name , displayItemCategoryCode } = elem 
		return { name , displayItemCategoryCode}
		} ) 
	respok ( res, null, null, { list }  )
})

module.exports = router;
const PARSER = JSON.parse
let categories
const init=_=>{	//	const fncat = '../data/coupang-item-categories.json' 
	const fncat = '/home/ubuntu/coupang/coupang-categories.json'
	let strbuf = fs.readFileSync ( fncat ).toString ()
	categories = PARSER ( strbuf ).data
}
let elemfound
const recurse_find = ( elem , searchkey )=>{
	let { child , displayItemCategoryCode } = elem
	if ( displayItemCategoryCode == searchkey ) {
		elemfound = elem 
	} else if ( child && child.length ) { 
		child.forEach ( child1 => {
			recurse_find( child1 , searchkey ) 
		 } )
	} else { return }
}
const recurse =elem=>{
	let { name , child , displayItemCategoryCode } = elem
	if ( child && child.length ) {
		child.forEach ( child1 => { recurse ( child1 ) } )
	} 
}
init()
// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

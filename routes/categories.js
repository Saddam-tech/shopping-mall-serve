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
const init=_=>{
//	const fncat = '../data/coupang-item-categories.json' 
const fncat = '/home/ubuntu/coupang/coupang-categories.json'
	let strbuf = fs.readFileSync ( fncat ).toString ()
	categories = PARSER ( strbuf ).data
}
init()
// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

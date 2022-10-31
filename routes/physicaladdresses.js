var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype
	, generaterandomnumber
	, create_uuid_via_namespace
	, getunixtimesec
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
const { sendMessage, test } = require("../services/twilio");
const { sendEmailMessage } = require("../services/nodemailer");
const { v4: uuidv4 } = require("uuid");
const e = require("express");
const KEYS = Object.keys;
const ISFINITE = Number.isFinite;
const { getipaddress } = require("../utils/session");
require("dotenv").config({ path: "../.env" });
const { resolve_nettype } = require ( '../utils/nettypes' ) 
const { SERVICE_NAME_NOSPACES , } =require('../configs/configs')
const { validateEmail } = require('../utils/validates')
// let NETTYPE_DEF = 'BSC_MAIN NET' 
let NETTYPEID_DEF 
const { messages }  = require('../configs/messages')
const { send_verification_mail } = require('../services/nodemailer' ) 

router.post ( '/' , auth , async ( req,res)=>{
	let { id : uid } = req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	let { streetaddress } = req.body
	if ( streetaddress ) {}
	else { resperr( res, messages.MSG_ARGMISSING , null ,{ reason : 'streetaddress' } ); return } 

	let uuid = create_uuid_via_namespace (  `${uid}_${streetaddress}_${getunixtimesec()}` )
	let { isprimary } = req.body 
	if ( isprimary ) { 
		await db['physicaladdresses'].update ({ isprimary:0 ,}, { where : {uid} } )
	} 
	await db['physicaladdresses'].create ( { ... req.body , uid , uuid } ) 
	respok ( res, null,null, { respdata: { uuid }} ) 
}) 

module.exports = router;


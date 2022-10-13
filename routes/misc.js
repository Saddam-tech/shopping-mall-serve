var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype } = require("../utils/common");
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
const { convaj } =require('../utils/common')
const { resolve_nettype } =require ( '../utils/nettypes' ) 
router.get ( '/configs' , async ( req,res)=>{
	let respsettings = await db['settings'].findAll ({raw: true, where : {active: 1 }} )
	let jsettings = convaj ( respsettings ,'name' , 'value' ) 
	let resptokens = await db['infotokens'].findAll ( { raw: true, where : { isprimary : 1 }})
	let { nettype } = resolve_nettype ( { req } )
	let resp  = await db['settings'].findOne ( { raw: true 
		, where : { 
			name : 'MIN_ETH_BALANCE_TO_TRIGGER_CHARGE'  
			, subkey : nettype 
			, active : 1
		} } ) // UNIT_GASFEE_PER_SEND_TX'
	let MIN_ETH_BALANCE_REQUIRED = '0.00126762'
	if ( resp ) {
		MIN_ETH_BALANCE_REQUIRED  = resp.value 	
	}
	else {
	}
	respok ( res, null , null, {
		respdata : {
			FRONT_VER : jsettings[ 'FRONT_VER' ]
			, listtokens : resptokens
			, MIN_ETH_BALANCE_REQUIRED 
			, IS_USE_AUX_TICKER_SERVER : jsettings[ 'IS_USE_AUX_TICKER_SERVER'] 
		}
	 } )

})
module.exports = router;
/**
----+-----------------------------------+------------+---------------------+---------------------+--------+---------------+--------------------+
| id | name                              | value      | createdat           | updatedat           | active | group_        | subkey             |
+----+-----------------------------------+------------+---------------------+---------------------+--------+---------------+--------------------+
| 17 | MIN_ETH_BALANCE_TO_TRIGGER_CHARGE | 0.00126762 | 2022-09-30 09:43:43 | 2022-09-30 09:45:46 |      1 | CHARGE_WALLET | BS C_MAINNET        |
| 23 | MIN_ETH_BALANCE_TO_TRIGGER_CHARGE | 0.00126762 | 2022-10-04 02:12:19 | 2022-10-04 02:13:42 |      1 | CHARGE_WALLET | ETH_TESTNET_GOERLI |
+----+-----------------------------------+------------+---------------------+---------------------+--------+---------------+--------------------+
*/

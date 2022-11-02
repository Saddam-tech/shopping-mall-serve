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
const ISFINITE=Number.isFinite

const validatededuction=num=>{num = +num
	if ( ISFINITE ( num)){}
	else { return false }
	if ( num>0 ) {}
	else { return false }
	return true
}
const validatepositivenumber=num=>{ num = +num
	if ( ISFINITE ( num ) ) {}
	else { return false } 
	if ( num > 0){}
	else { return false }
	return true
}
const STRINGER = JSON.stringify
router.post ( '/promotion' , auth , async ( req,res)=>{
	let { id : uid , isadmin } = req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	if (isadmin && isadmin >= MIN_ADMIN_LEVEL) {
  } else {
		resperr(res, messages.MSG_NOTPRIVILEGED);
		return;
  }	
	let { itemuuid 
		, deduction
		, deductionunit
		, startingtime
		, endtime 
//		, type
		, typestr
		, bogospec
	} = req.body
	if ( itemuuid ) {	}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }

	let respitem = await db[ 'items' ].findOne ( { raw: true, where : { uuid : itemuuid  } } )
	if ( respitem ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let uuid
	switch ( typestr ) {
		case 'DEDUCTION' : 
			if ( deduction && deductionunit ) { }
			else { resperr( res, MSG_ARGMISSING, null , {reason : 'deduction or deductionunit' }) ; return  }
			if ( validatededuction ( deduction ) ) {}
			else { resperr( res , messages.MSG_ARGINVALID ) ; return }
			uuid = create_uuid_via_namespace ( `${uid}_${itemuuid}_${deduction}_${deductionunit}` )
			await db[ 'promotions' ] .create ( {
				itemuuid
				, uid
				, startingtimestamp : ( startingtime? moment(startingtime).unix() : null )
				, expirytimestamp : ( endtime ? moment( endtime ).unix() : null )
				, typestr
				, deduction
				, deductionunit
				, uuid 
			})
		break
		case 'BOGO' : 
			if ( bogospec && bogospec['buy'] && bogospec['get'] ) {}
			else { resperr ( res, MSG_ARGMISSING , null , { reason : 'bogospec' } ) ; return }
			if ( validatepositivenumber () ) {}
			let { buy  , get } = bogospec
			if ( validatepositivenumber(buy)){}
			else { resperr( res, messages.MSG_ARGINVALID , null , { reason : 'bogospec-buy amount' }) ; return } 
			if ( validatepositivenumber(buy)){}
			else { resperr( res, messages.MSG_ARGINVALID , null , { reason : 'bogospec-get amount' } ) ; return } 
			let bogospecstr = STRINGER ( bogospec )
			uuid = create_uuid_via_namespace ( `${uid}_${itemuuid}_${bogospecstr}` )
			await db[ 'promotions' ] .create ( {
				itemuuid
				, uid
				, startingtimestamp : ( startingtime? moment(startingtime).unix() : null )
				, expirytimestamp : ( endtime ? moment( endtime ).unix() : null )
				, typestr
				, bogospec : bogospecstr
				, uuid 
			})
		break
	}
	respok (res , null,null, { respdata: { uuid } } ) 
}) 

router.post ( '/sale' , auth , async ( req,res)=>{
	let { id : uid , isadmin } = req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	if (isadmin && isadmin >= MIN_ADMIN_LEVEL) {
  } else {
		resperr(res, messages.MSG_NOTPRIVILEGED);
		return;
  }

})
module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

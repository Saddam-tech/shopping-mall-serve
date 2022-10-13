const awaitTransaction = require("await-transaction-mined");
const { jweb3 } = require("../configs/configweb3");
const db = require("../models");

const TXREQSTATUS_POLL_INTERVAL = 3000;
const TXREQSTATUS_BLOCKCOUNT = 1; // 2 // 4 // 6
const TX_POLL_OPTIONS = {
  interval: TXREQSTATUS_POLL_INTERVAL,
  blocksToWait: TXREQSTATUS_BLOCKCOUNT,
};
const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");
const { moverow }=require('../utils/db')
const { fetchexchangerates } = require('../tickers/fetch-forex' ) 
//closetransactions({txhash, type:"DEPOSIT", tokentype: tokentype, userid: id, senderaddr, amount})
const EXPONENT_FOR_PREC_DEF = 6
const do_exchange_and_deposit=async jdata=>{
  let { txhash
		, nettype // , type, tokentype, userid, senderaddr, amount, nettype
		,	amount
		, amountunit
		, arrorderuuids
		, uid
	 } = jdata
	let jforex
	if ( false ){
		jforex= await cliredisa.hgetall ( 'FOREX' )
	} else { let m0 = moment()
		jforex= await fetchexchangerates ( )
		LOGGER( `@delta,forex vendor` , moment()-m0 ) 
	}
	let list = await db[ 'txrequests' ].findAll ( {raw: true, where : { receiver : uid } } )
	let listequivamount = list.map ( elem => +elem.amount / +jforex[ `USD/${elem.amountunit}` ] )
//	let listequivamount = list.map ( elem => +elem.amount * +jforex[ `USD/${elem.amountunit}`  ] )
	let sumequivamount = listequivamount.reduce ( (a,b)=>a+b, 0 ) 
	list.forEach ( async ( elem   , idx )=>{
		let shareamount = amount * listequivamount [ idx ] / sumequivamount
		await db.sequelize.query ( `update balances set total=total+${ shareamount * 10**EXPONENT_FOR_PREC_DEF  }, avail=avail+${shareamount * 10**EXPONENT_FOR_PREC_DEF} where uid=${uid} and typestr='LIVE' `)
		await moverow ( 'txrequests' , {uuid : elem.uuid } , 'logtxrequests' , { txhash } )
	})	
}
	
const closetransactions = async (jargs) => {
  console.log("@@@@@@@@@@@@@@@@@@closetransactions");
  console.log("jargs", jargs);
	let { txhash
		, nettype // , type, tokentype, userid, senderaddr, amount, nettype
		,	amount
		, amountunit
		, arrorderuuids
		, uid
	 } = jargs
	let web3 = jweb3 [ nettype ] 
	
  awaitTransaction
    .awaitTx(web3, txhash, TX_POLL_OPTIONS)
    .then(async (txreceipt) => {
      let { status } = txreceipt;
			if ( status ) {}
			else { LOGGER(`tx failed - ${txhash}`) ; return }   
    	console.log(status, type);
      switch (type) {
				case 'BATCH-TRANSFER' : 
					await do_exchange_and_deposit ( jargs )	
				break
       }
    })
    .catch((err) => {
      console.log(err, jargs.txhash);
    });
};

module.exports = {
  closetransactions,
};

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
const { convaj 
	, generaterandomhex
} = require('../utils/common')
const { ADDRESSES } = require ('../configs/addresses' )
const { getethbalance } = require('../utils/eth')
const { resolve_nettype } =require('../utils/nettypes')
const { messages } = require( '../configs/messages' )

const MAP_ALLOWED_WITHDRAW_TYPES= { COIN : 1, TOKEN : 1 }
router.post ( '/withdraw' , auth, async (req,res)=>{
	if ( req?.decoded?.id ) {}
	else 	{ resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	let { id : uid } = req.decoded
	let {		amount
		, rxaddr
		, typestr
	} = req.body 
	let { nettype } = req.query
	if ( amount && rxaddr && nettype && typestr ) {}
	else { resperr( res ,messages.MSG_ARGMISSING ) ; return }
	if ( MAP_ALLOWED_WITHDRAW_TYPES[ typestr ] ){}
	else { resperr ( res, messages.MSG_ARGINVALID ) ; return }	
	let respbal = await db[ 'balances' ].findOne ( { raw: true , where : { uid , typestr } } )
	if ( respbal ) {}
	else { resperr ( res, messages.MSG_BALANCENOTENOUGH ) ; return }

	amount = +amount
	if ( +respbal.amount >= amount  ){}
	else { resperr ( res, messages.MSG_BALANCENOTENOUGH ) ; return }
	let txhash = '0x'+generaterandomhex(64)
	await db[ 'transactions'].create ({
		uid
		, txhash
		, nettype
		, amount //		, paymeansname	//	, from_	// , to_
		, direction : -1
		, status : 1
		, active : 1 //		, contractaddress
	})
	await db [ 'balances' ].update ( { amount : +respbal.amount - +amount  } , { where : { uid , typestr } } )
	respok ( res, null, null, { respdata : { txhash } } )
})
router.post ('/request-charge-gasfee' ,auth, async ( req,res)=>{ 
	let { id }=req.decoded
	if(id){}
	else{resperr(res,'PLEASE-LOGIN');return}
//	let {n ettype}=req.query ;	if(net type){} ;	else{ resperr(res,'ARG-MISSING',null,{reason:'ne ttype query string'}); return}
	let { nettype } =resolve_nettype ( {req } )
	let respwallet = await db['userwallets'].findOne ( {raw: true, where : { uid : id } } )
	if ( respwallet ) {}
	else { resperr( res, 'WALLET-ADDRESS-NOT-FOUND' ) ; return }
	let {walletaddress} = respwallet   
	let respbal = await getethbalance ( { address : walletaddress , nettype } )	
	let listsettings= await db['settings'].findAll ( {raw: true , where:{
			group_: 'CHARGE_WALLET' 
			, subkey : nettype
			, active : 1
		}
	})
	let jsettings = convaj ( listsettings , 'name' , 'value' ) 
	let minethamtreqd = + jsettings[ 'MIN_ETH_BALANCE_TO_TRIGGER_CHARGE' ]
	if( minethamtreqd )  {
		if ( +respbal > minethamtreqd  ) {
			respok ( res, 'BALANCE-ENOUGH' ) ; 
			let respwb = await db['walletbalances'].findOne({raw: true , where : {uid:id , nettype } } )
			if ( respwb ){ await db['walletbalances' ] .update ({ amount : respbal } , { where :  { id: respwb.id}}  ) }
			else { await db['walletbalances'].create ({ uid : id , amount :respbal , 
				tokenaddress : ADDRESSES.ZERO ,
				nettype 
			 } )
			return
		} } else {
			let targetamount = + jsettings [ 'UNIT_GASFEE_PER_SEND_TX' ] * + jsettings [ 'TARGET_COUNT_TX_HANDLED_BY_GASFEE' ] 
			let amount = targetamount - +respbal			
			let m0 = moment()
let jdatatoreq = 				{	userid : id
					,	amount
					, rxaddress : walletaddress
					, senderaddress : jsettings [ 'ADMINADDR' ] // adminaddress
					, senderpk : jsettings [ 'ADMINPK' ] // adminpk
//					, feeamount //	, tokentype
					, nettype
				}
LOGGER( `@jdatatoreq`, jdatatoreq , targetamount , +respbal , jsettings ) 	
			let respsendeth = await			sendeth ( jdatatoreq 
		)
			if ( respsendeth ) {
				respok ( res , null , null , { txhash : respsendeth , timedelta : moment()-m0 } ) ; return 
			}
			else {
				resperr( res, 'TX-ERR' );return 
			}		
		}
	} else { 
		resperr ( res, 'MIN-AMT-SETTING-MISSING'); return 
	}
})

router.get( '/info/deposit' , async ( req,res)=>{
	let respfeeamount = await db['feesettings'].findOne( { raw:true, where : {key_:'FEE_CURRENCY_DEPOSIT_IN_BP'}}) 
	let respminamount = await db['feesettings'].findOne( { raw:true, where : {key_:'FEE_CURRENCY_DEPOSIT_MIN_AMOUNT'}}) 
	let { nettype } =resolve_nettype ( {req } ) //	let {net type}=req.query //	if(net type){} else{ resperr(res,'ARG-MISSING',null,{reason:'ne ttype query string'}); return}
	let listsettings= await db['settings'].findAll ( {raw: true , where:{
			group_: 'CHARGE_WALLET' 
			, subkey : nettype
		}
	})
	let jsettings = convaj ( listsettings , 'name' , 'value' ) 
	respok ( res,null,null, { respdata : { 
		minimumamount : respminamount?.value_ , 
		feeamount : respfeeamount?.value_ 
		, chargesettings : jsettings
	 } } )
})
router.get ('/info/withdraw' , async ( req,res)=>{ const MINAMT_DEF = 5, FEEAMT_DEF= 1
	let respminamt =	await db[ 'withdrawfees' ].findAll ( {raw: true, order : [ [ 'intervalstart' , 'ASC' ] ] , limit : 1 , where:{ active: 1 } } )
	LOGGER( respminamt )
	let minimumamount = MINAMT_DEF , feeamount = FEEAMT_DEF
	if ( respminamt && respminamt[0] ) { // && respminamt[0][0] 
		minimumamount = respminamt[0][ 'intervalstart' ] 
		feeamount = respminamt[0][ 'amount' ] 
	}
	let feetable = await db['withdrawfees'].findAll ( {raw:true, where : {active:1} } )
	respok ( res,null,null ,{ respdata: { minimumamount , feeamount , feetable } } )
})
router.post("/v1/:type", (req, res) => {});
router.patch("/demo/fund/:amount", auth, async (req, res) => {
  LOGGER(req.decoded);
  let { id, demo_uuid } = req.decoded;
  let { amount } = req.params; //  let { nett ype } = req.query;
	const { nettype  } =resolve_nettype ( {req })
  if (!nettype) {
    resperr(res, "NETTYPE IS UNDEFINED!");
    return;
  }
  if (!supported_net[nettype]) {
    resperr(res, "UNSUPPORTED NETTYPE!");
    return;
  }
  let jfilter = {};
  if (demo_uuid) {
    jfilter["uuid"] = demo_uuid;
  } else if (id) {
    jfilter["uid"] = id;
  } else {
    resperr(res, "USER-NOT-IDENTIFIED");
    return;
  }
  db["balances"]    .findOne({
      where: {        //				[Op.or] :  [{ uuid : demo_uuid}, {uid: id}]        ,
        ...jfilter,
        typestr: "DEMO",        //        nettype,
      },
    })
    .then((result) => {
      console.log(+result.total + amount);
      // if (+result.total + amount > 1000000000000000) {
      //   resperr(res, 'TOO-MUCH-DEMO-BALANCE');
      // } else {
      result.increment(["avail", "total"], { by: amount }).then((_) => {
        respok(res, null, null, { total: result.total });
      });
      // }
    });
});

router.post("/listen/:type", auth, async (req, res) => {
  let { type } = req.params;
  let { id, wallet } = req.decoded;
  let { nettype } = resolve_nettype ( {req } ) // req.query;
  if (!nettype) {
    resperr(res, "NETTYPE IS UNDEFINED!");
    return;
  }
  if (!supported_net[nettype]) {
    resperr(res, "UNSUPPORTED NETTYPE!");
    return;
  }
  if (!id) {
    resperr(res, "USER-NOT-FOUND");
    return;
  }
  let resp = await watchTransfers( { 
			to : wallet
		, target : type
		, uid : id
		, res 
		, nettype } );
});
const get_withdraw_fee_amount = async ({ withdrawamt }) => {
  let resp = await db["withdrawfees"].findOne({
    raw: true,
    where: {
      intervalstart: { [Op.lte]: withdrawamt }, // amount
      intervalend: { [Op.gt]: withdrawamt }, // amount
    },
  });

  if (resp && resp.amount) {
    return resp.amount;
  } else {
    return 0;
  }
};
const EXPONENT_FOR_PREC_DEF = 6 
router.patch("/live/:type/:amount", auth, async (req, res) => {
  console.log("@@@@@@@@@@@@@@@@@@patch live");
  let { type, amount } = req.params;
  let {
    rxaddr,
    txhash,
    tokentype,
    senderaddr,
    name,
    card,
    bankCode,
    bankName,
  } = req.body;
  let { id, isadmin, isbranch } = req.decoded;
  let { nettype , nettypeid } = resolve_nettype ( { req} ) // req.query;
  if (!nettype) {
    resperr(res, "NETTYPE IS UNDEFINED!");
    return;
  }
  if (!supported_net[nettype]) {
    resperr(res, "UNSUPPORTED NETTYPE!");
    return;
  }
  console.log("HELLO");
  console.log("BODY", req.body);
  // amount *= 1000000;
  // if (type.toUpperCase() === 'WITHDRAW') {
  //   amount *= 1000000;
  // } else if (type.toUpperCase() === 'DEPOSIT') {
  //   amount *= 1000000;
  // }
  let amountinexp = +amount * 10 ** EXPONENT_FOR_PREC_DEF 
  if (!id) {
    resperr(res, "NOT-LOGGED-IN");
    return;
  }
  let balance = await db["balances"].findOne({
    where: {
      typestr: "LIVE",
      uid: id, // ,      nettype,
    },
    raw: true,
  });
  if (balance) {
  } else {
    resperr(res, "PLEASE-LOGIN-FIRST");
    return;
  }

  switch (type.toUpperCase()) {
    case "WITHDRAW":
      console.log('@amountinexp' , amount , amountinexp);
      console.log('@balance' , balance);
      if (+amountinexp > +balance.avail) {
        console.log("NOT-ENOUGH-BALANCE");
        resperr(res, "NOT-ENOUGH-BALANCE");
        return;
        break;
      }
      /************/
      let feeamount , feeamountinexp;
      if (true) {
        let feeamount = await get_withdraw_fee_amount({ withdrawamt: amount });
        if (+feeamount && +feeamount > 0) {
					feeamountinexp = +feeamount * 10 **EXPONENT_FOR_PREC_DEF 
          if (amount + +feeamount < +balance.avail) {
          } else {
            resperr(res, "NOT-ENOUGH-BALANCE");
            return;
          }
        }
      }
      if (false) {
        let respfee = await db["feesettings"].findOne({
          raw: true,
          where: { key_: "FEE_CURRENCY_WITHDRAW_IN_BP" },
        });
        if (respfee) {
          let { value_ } = respfee;
          let feerate = +value_;
          if (feerate > 0) {
            feeamount = (amountinexp * feerate) / 10000;
            if (amountinexp + feeamount < +balance.avail) {
            } else {
              resperr(res, "NOT-ENOUGH-BALANCE");
              return;
              break;
            }
          } else {
          }
        } else {
        }
      }
      /************/
      console.log("WITHDRAW ON GOING");
      let { value: ADMINADDR } = await db["settings"].findOne({
        where: { name: "ADMINADDR"
					, subkey : nettype  , active : 1
				 },
      });
      let { value: ADMINPK } = await db["settings"].findOne({
        where: { name: "ADMINPK" 
					, subkey : nettype , active : 1
				},
      });

      let messageBody = `[WITHDRAW ON GOING]
        user id: ${id}
        amount: ${amount / 10 ** 6}
        token: ${tokentype}
        from: ${ADMINADDR}
        to: ${rxaddr}
      `;
      sendTelegramBotMessage(messageBody);
let { contractaddress : contractaddress_input } = await db['infotokens'].findOne ( { 
	raw: true , where : { nettype , isprimary : 1		}
	})
//      let resp = await withdraw({
      let resp = await sendtoken ({
        userid: id,
        amount,
        rxaddr,
        adminaddr: ADMINADDR,
        adminpk: ADMINPK,
        feeamount : feeamountinexp ,
				nettype ,
				contractaddress_input , 
        tokentype: tokentype,
      });
      respok(res, null, null, { payload: { resp } });

      break;
    case "DEPOSIT":
      if (
        tokentype == "USDC" ||
        tokentype == "USDT" ||
        tokentype == "USDT_BINOPT"
      ) {
        if (!txhash) {
          resperr(res, "TXHASH-ISSUE");
          return;
        }
        await db["transactions"].create({
          uid: id,
          amount: amountinexp , // amount,
          unit: tokentype,
          status: 0,
          typestr: "DEPOSIT",
          type: 1,
          txhash: txhash,
          senderaddr,
          nettype , nettypeid
        });
        respok(res, "SUBMITED");
        let messageBody = `[DEPOSIT ON GOING]
          user id: ${id}
          amount: ${amount / 10 ** 6}
          token: ${tokentype}
          sender address: ${senderaddr}
          txhash: ${txhash}
          nettype: ${nettype}
        `;
        sendTelegramBotMessage(messageBody);

        closeTx({
          txhash,
          type: "DEPOSIT",
          tokentype: tokentype,
          userid: id,
          senderaddr,
          amount,
          nettype,
        });
      } else {        // 총판
        let referer = await db["referrals"].findOne({
          where: {
            referral_uid: id,
            isRefererBranch: 1, // ,            nettype,
          },
          raw: true,
        });
        //				let { referer = await db['users'].findOne ( {raw: true, where : { id
        if (!referer) {
          resperr(res, "REFERER-NOT-FOUND");
          return;
        }
        await db["transactions"]
          .create({
            uid: id,
          amount: amountinexp , // amount,
            type: 2,
            typestr: "DEPOSIT",
            status: 0,
            target_uid: referer.referer_uid,
            localeAmount: amount,
            localeUnit: tokentype,
            name: name,
            cardNum: card,
            bankCode: bankCode,
            bankName: bankName,
            unit: "USD", nettype , nettypeid
            // nettype,
          })
          .then((_) => {
            respok(res, "SUBMITED");
          });
      }
      break;
    // case 'OTHER_EXCHANGES':
    //   if (!txhash) {
    //     resperr(res, 'TXHASH-ISSUE');
    //     return;
    //   }
    //   await db['transactions'].create({
    //     uid: id,
    //     amount: amount,
    //     unit: tokentype,
    //     status: 0,
    //     typestr: 'DEPOSIT_FROM_OTHER_EXCHANGES',
    //     type: 1,
    //     txhash: txhash,
    //     senderaddr,
    //     rxaddr,
    //   });
    //   respok(res, 'SUBMITED');

    //   cl oseTx({
    //     txhash,
    //     type: 'DEPOSIT',
    //     tokentype: tokentype,
    //     userid: id,
    //     senderaddr,
    //     amount,
    //   });
    //   break;
    case "VERIFY":
      if (!isadmin && !isbranch) {
        resperr(res, "NOT-AN-ADMIN");
        return;
      }

      respok(res, "ADMIN-VERIFIED");
      return;
      break;
    default:
      break;
  }
});

router.get("/user/wallet/address/:uid", auth, async (req, res) => {
  let { uid } = req.params;
  await db["userwallets"]
    .findOne({
      where: { id: uid },
      raw: true,
    })
    .then((resp) => {
      respok(res, null, null, { resp });
    });
});

router.post("/deposit/:type/:amount", auth, async (req, res) => {
  let { type, amount } = req.params;
  let {
    rxaddr,
    txhash,
    tokentype,
    senderaddr,
    name,
    card,
    bankCode,
    bankName,
  } = req.body;
  let { id, isadmin, isbranch } = req.decoded;
});

router.get("/branch/list/:off/:lim", auth, async (req, res) => {
  let { off, lim } = req.params;
  let { startDate, endDate } = req.query;
  let { id } = req.decoded;
  let jfilter = {};
	let { nettype , nettypeid } = resolve_nettype ( { req } )
  if (!nettype) {
    resperr(res, "NETTYPE IS UNDEFINED!");
    return;
  }
  if (!supported_net[nettype]) {
    resperr(res, "UNSUPPORTED NETTYPE!");
    return;
  }
  if (startDate) {
    jfilter = {
      ...jfilter,
      createdat: { [Op.gte]: moment(startDate).format("YYYY-MM-DD HH:mm:ss") },
    };
  }
  if (endDate) {
    jfilter = {
      ...jfilter,
      createdat: { [Op.lte]: moment(endDate).format("YYYY-MM-DD HH:mm:ss") },
    };
  }
  if (startDate && endDate) {
    jfilter = {
      ...jfilter,
      createdat: {
        [Op.gte]: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
        [Op.lte]: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
      },
    };
  }
  console.log(id);
  console.log("jfilter", jfilter);
  // offset = +offset;
  // limit = +limit;
  // db['transactions']
  //   .findAll({
  //     where: {
  //       target_uid: id,
  //       typestr: 'DEPOSIT',
  //     },
  //     include: [
  //       {
  //         //required: false,
  //         model: db['users'],
  //         attributes: ['id', 'email', 'phone', 'level'],
  //         include: [
  //           {
  //             //     //required: false,
  //             model: db['transactions'],
  //             attributes: [
  //               'uid',
  //               [
  //                 db.Sequelize.fn(
  //                   'sum',
  //                   db.Sequelize.col('transactions.localeAmount')
  //                 ),
  //                 'cumulAmount',
  //               ],
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //     offset: +off,
  //     limit: +lim,
  //     order: [['id', 'DESC']],
  //     // group: ['id'],
  //   })
  db["transactions"]
    .findAndCountAll({
      where: {
        ...jfilter,
        type: 2,
        typestr: "DEPOSIT",
        // nettype,
      },
      offset: +off,
      limit: +lim,
      order: [["id", "DESC"]],
      raw: true,
    })
    .then(async (respdata) => {
      let promises = respdata.rows.map(async (el) => {
        let { uid, id, amount, localeAmount } = el;
        // localeAmount = localeAmount / 10 ** 6;
        // el['localeAmount'] = localeAmount;
        el["user"] = await db["users"].findOne({
          where: { id: uid },
          raw: true,
        });
        await db["transactions"]
          .findAll({
            where: {
              uid,
              typestr: "DEPOSIT",
              status: 1,
              id: { [Op.lte]: id },
              // nettype,
            },
            raw: true,
            order: [["id", "ASC"]],
            attributes: [
              [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "sum"],
            ],
          })
          .then((resp) => {
            let [{ sum }] = resp;
            console.log(resp);
            el["cumulAmount"] = sum / 10 ** 6;
          });
        return el;
      });
      await Promise.all(promises);
      respok(res, null, null, { respdata });
    });
});

/*



*/
router.patch("/branch/transfer", auth, async (req, res) => {
  let { id, isadmin } = req.decoded;
  let { txhash, tokentype, txId, amount } = req.body;
//  let { nettype } = req.query;
	let { nettype } = resolve_nettype ( { req } )
  /*    txId: transaction의 id값. txhash를 받으면 저장한다. 검증 완료되면 status 를 1로 변경한다.
    */
  console.log("==================", amount, "====================");
  amount = amount / 10 ** 6;

  if (!nettype) {
    resperr(res, "NETTYPE IS UNDEFINED!");
    return;
  }
  if (!supported_net[nettype]) {
    resperr(res, "UNSUPPORTED NETTYPE!");
    return;
  }
  if (!txId || !amount || !tokentype) {
    resperr(res, "INVALID-DATA");
    return;
  }
  if (isadmin == 1) {
    if (txhash) {
      await db["transactions"].update(
        { txhash, verifier: id },
        { where: { id: txId } }
      );
      let tx = await db["transactions"].findOne({ where: { txhash } });
      tx.update({
        status: 1,
        amount: amount,
      });
      await db["balances"].increment(["avail", "total"], {
        by: amount,
        where: { uid: tx.uid, typestr: "LIVE" },
      });

      respok(res, "SUBMITTED");
      //cl oseTx({ txhash, type: 'TRANSFER', tokentype: tokentype, txId, amount: amount*(10**6) });
    } else {
    }
  } else {
    resperr(res, "NOT-PRIVILEGED");
  }
});
module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

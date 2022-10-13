let { jweb3 , web3 } = require("../configs/configweb3");
// const { contractaddr , ADDRESSES } = require("../configs/addresses");
// let { nettype } = require("../configs/net");
// const MIN_TOKEN_AMOUNT_TO_WITHDRAW = 1;
// const db = require("../models");
// const { abi: abierc20 } = require("../contracts/abi/ERC20");
// const GAS_LIMIT_TOKEN = "";
// const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");
const { getweirep , getethrep } = require('../utils/eth')
const db=require( '../models')
const LOGGER=console.log
const sendeth=async ({
	userid
	,	amount
	, rxaddress
	, senderaddress // adminaddress
	, senderpk // adminpk
	, feeamount //	, tokentype
	, nettype
	,
})=>{
	let web3
	if ( nettype ) { web3 = jweb3 [ nettype ] } 
	else { throw `@nettype not specified` ; return } 		
	const nonce = await web3.eth.getTransactionCount ( senderaddress , 'latest'); // nonce starts counting from 0
LOGGER( '@amount', amount , )
let gas= ''+5*10**5 // ''+21000 // 2500 // '0xF4240' 
let gasPrice= ''+5*10**9 // '0x4A817C800' 
// let gasPrice= ''+10**10 // '0x4A817C800' 
LOGGER( '@gas' , +gas / 10 ** 9 * +gasPrice / 10**9 , nonce )
let senderbal = await web3.eth.getBalance ( senderaddress )
LOGGER( '@bal' , senderbal , getethrep ( senderbal ) ) 
  const transaction = {
     'to': rxaddress , // faucet address to return eth
     'value': getweirep ( ''+amount ) ,
//     'gas': 2_1_000,
gas , // : '0xF4240', 
gasPrice , // : '0x4A817C800' ,
// gasLimit :    "0x2fefd8",
//     'gas': 1_0_000,
//     'gas': 2_00_000,
//     'gas': 1_000_000,
//     'maxFeePerGas': 1_000_000_100,
     'nonce': nonce,
	}
	web3.eth.accounts.privateKeyToAccount ( senderpk )
	const signedTx = await web3.eth.accounts.signTransaction ( transaction, senderpk );
  
	return new Promise (async (resolve,reject)=>{
	  web3.eth.sendSignedTransaction ( signedTx.rawTransaction, async (error, txhash) => {
  	  if (!error) {
    	  console.log("🎉 The txhash of your transaction is: ", txhash, "\n Check Alchemy's Mempool to view the status of your transaction!");
				resolve ( txhash ) 
await db['logethsends'].create({
	from_: senderaddress ,
	to_ : rxaddress ,
	uid : userid ,      
	amount : amount ,   
	txhash , // : '',   
	nettype // : '',  
//	nettypeid : '',
})
	    } else {  	    console.log("❗Something went wrong while submitting your transaction:", error)
				resolve ( null ) 
	    }
  	 });
	} )
}

module.exports= {
	sendeth
}
/**  from_     | varchar(80) 
| to_       | varchar(80)    
| uid       | bigint(20)     
| amount    | varchar(20)    
| txtxhash    | varchar(100)   
| nettype   | varchar(60)    
| nettypeid | int
*/

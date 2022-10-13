let { jweb3 , web3 } = require("../configs/configweb3");
const { contractaddr , ADDRESSES } = require("../configs/addresses");
let { nettype } = require("../configs/net");
const MIN_TOKEN_AMOUNT_TO_WITHDRAW = 1;
const db = require("../models");
const { abi: abierc20 } = require("../contracts/abi/ERC20");
const GAS_LIMIT_TOKEN = "";
const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");
let jcontracts={}

const getweirep_proper=async ({amount , nettype , contractaddress})=>{
	let resp =await db['infotokens'].findOne ( {raw:true , where:{ nettype,contractaddress} } )
	let decimals 
	if ( resp ) { decimals = resp [ 'decimals' ] }
	else { decimals = 18 }
	return ''+(amount * 10 ** decimals)
}
const getadmin =async _ =>{return await db["users"].findOne({ where: { isadmin: 2 }, raw: true }); }
const EXPONENT_FOR_PREC_DEF = 6 

const withdraw = async (jdata) => {
  return new Promise(async (resolve, reject) => {
    let { userid
			, amount
			, rxaddr
			, adminaddr
			, adminpk
			, feeamount 
			, tokentype
			, nettype
			, contractaddress_input
			, isexemptservicefee
			, typestr
		} =      jdata;
    //let {value: ADMINADDR} = await db['settings'].findOne({where:{name: 'ADMINADDR'}})
    //let {value: ADMINPK} = await db['settings'].findOne({where:{name: 'ADMINPK'}})
    console.log("jdata", jdata);
    console.log(adminaddr);
    console.log(tokentype);
    console.log(contractaddr[tokentype]);
		let web3	
		if ( nettype ) { web3 = jweb3 [ nettype ] }
 //   let contract = new web3.eth.Contract(abierc20, contractaddr[tokentype]);

		let contractaddress 
		if ( contractaddress_input ) {
			contractaddress = contractaddress_input 
		} else if ( nettype && tokentype )  {
			contractaddress = ADDRESSES [ nettype ] [ tokentype ]  
		}
		if ( contractaddress ){}
		else { LOGGER( `contractaddress not resolved` ) ; resolve (null ) ; return }
    let contract = new web3.eth.Contract( abierc20 , contractaddress );
    let amt2sendwei = await getweirep_proper ( { amount , nettype , contractaddress} ) // amount.toString();
    // let amt2sendwei = amount.toString();
    await contract.methods.balanceOf(adminaddr).call(async (err, balance) => {
      console.log(adminaddr, balance);
      if (parseInt(balance) < MIN_TOKEN_AMOUNT_TO_WITHDRAW) {
        return false;
      }

      try {
        contract.methods.balanceOf(adminaddr).call((err, balance) => {
          if (err) {
            console.log(err);
          } else {
            console.log("balance", balance);
          }
        });
        const nonce = await web3.eth.getTransactionCount(adminaddr, "latest");
        const transaction = {
          from: adminaddr,
          to: contractaddr[tokentype], // faucet address to return USDT_BINARY_CODE
          value: "0", // eth
          gas: "3000000",
          nonce: nonce,
          // optional data field to send message or execute smart contract
          data: contract.methods.transfer(rxaddr, amt2sendwei).encodeABI(),
        };

        const signedTx = await web3.eth.accounts.signTransaction(
          transaction,
          adminpk
        );
        await db["transactions"].create({
          uid: userid,
          amount: +amount * 10**EXPONENT_FOR_PREC_DEF ,
          unit: tokentype,
          type: 0,
          typestr: typestr || "WITHDRAW",
          txhash: signedTx.transactionHash,
          status: 0,
          localeAmount: amount,
          localeUnit: tokentype,
          rxaddr,
          nettype,
        });

        console.log(signedTx);
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async function (error, hash) {
            if (error) {
              console.log(error);
              reject({ status: "ERR", message: error });
            } else {
              console.log(hash);
let txhash = hash
const { id:adminid} = await getadmin ()
//              await db["balances"].increment(["total", "avail"], {                by: -1 * amount,                where: { uid: userid, typestr: "LIVE", nettype },              });
              /*********************/
              if (+feeamount) {
                await db["balances"].increment(["total", "avail"], {
                  by: -1 * feeamount -1* amount * 10** EXPONENT_FOR_PREC_DEF , 
                  where: { uid: userid, typestr: "LIVE" }, // , nettype
                }); 
              }
if ( +feeamount ) { 
	db['logfees'].create ( {
//      betId,
		payer_uid: userid ,
//				betamount: jbetlog.amount,
	//			bet_expiry: jbetlog.expiry,
		//		assetId: jbetlog.assetId,
				recipient_uid: adminid ,
				feeamount: feeamount , // referershare,
				typestr: "FEE_WITHDRAW",
//				fee_value: jfeesets["FEE_TO_REFERER"],
				txhash ,
				contractaddress ,
				nettype , 
	})
	await db.sequelize.query ( `update balances set total=total+${feeamount}, avail=avail+${feeamount} where uid=${adminid} and typestr='LIVE'` ) 
}
              /*********************/
              await db["transactions"].update(                {                 status: 1,               },
                {                  where: {
//                    typestr: typestr || "WITHDRAW",
                    txhash: signedTx.transactionHash,
                    nettype,
                  },
                }
              );
              let messageBody = `[WITHDRAW SUCCESS]
                user id: ${userid}
                amount: ${amount / 10 ** 6}
                token: ${tokentype}
                from: ${adminaddr}
                to: ${rxaddr}
                txhash: ${signedTx.transactionHash}
                nettype: ${nettype}
              `;
              sendTelegramBotMessage(messageBody);
              resolve({ status: "OK", message: hash });
            }
          }
        );
      } catch (err) {
        console.log(err);
      }
    });
  });
};

module.exports = { withdraw };

// CREATE TABLE `networktoken` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `name` varchar(11) DEFAULT NULL,
//   `decimal` int(30) DEFAULT NULL,
//   `contractaddress` varchar(80) DEFAULT NULL,
//   `networkidnumber` int(20) unsigned DEFAULT NULL,
//   `nettype` varchar(11) DEFAULT NULL,
//   `uuid` varchar(60) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

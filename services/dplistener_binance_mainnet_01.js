const Web3 = require("web3");
const {  wss_rpcURLs , jweb3 } = require("../configs/configweb3"); // : web3APIweb3 ,
const { contractaddr } = require("../configs/addresses");
const { abi: abierc20 } = require("../contracts/abi/ERC20");
const db = require("../models");
const { getethrep } = require("../utils/eth");
const { rmqenqueuemessage } = require( "../service-rmq/rmqpub-admin" );
const { findone } = require("../utils/db");
// const { with draw } = require("./sendtokenal");
const { sendtoken } = require('./send_token_bnb' )
const moment=require('moment')
const LOGGER=console.log
const EXPONENT_FOR_PREC_DEF = 6 
// let TOKEN_CONTRACT_ADDRESS='0x55d398326f99059fF775485246999027B3197955' // 0x5217fD89B 12B61d866359fAbf40B706199197af5'
let TOKEN_CONTRACT_ADDRESS='0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56' // 0x55d398326f99059fF775485246999027B3197955' // 0x5217fD89B 12B61d866359fAbf40B706199197af5'
let TOKEN_DECIMALS= 18
let nettype = "BSC_MAINNET" // ETH_TESTNET_GOERLI";
let wss_rpcURL = 'wss://ws-nd-705-872-619.p2pify.com/603af1787e985df8fa39dbc3cf659d46' // wss_rpcURLs [ nettype ]	BSC_MAINNET :  , // 
const INST_ID = 1
const PERIOD_COUNT_DISP = 40
let web3 = jweb3 [ nettype ]
const awaitTransactionMined = require( 'await-transaction-mined' )
const TXREQSTATUS_POLL_INTERVAL = 3000;
const TXREQSTATUS_BLOCKCOUNT = 4; // 2 // 4 // 6
let TX_POLL_OPTIONS = {
  interval: TXREQSTATUS_POLL_INTERVAL,
  blocksToWait: TXREQSTATUS_BLOCKCOUNT,
};
const getethrep_proper =amt=>{	return +amt / 10**TOKEN_DECIMALS	}
const { ADDRESSES } = require('../configs/addresses' ) 
const { redisconfig } = require( '../configs/redis.conf' )
const cliredisa = require ( 'async-redis').createClient ( redisconfig ) 
let web3ws // = new Web3(new Web3.providers.WebsocketProvider(wss_rpcURL));
let counttx = 0
const watchTokenTransfers = async () => {
  let jdata;
	web3ws = new Web3(new Web3.providers.WebsocketProvider(wss_rpcURL));
  console.log("watchstarted");  // const web3ws = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/zhUm6jYUggnzx1n9k8XdJHcB0KhH5T7d'));  //  const web3ws = new Web3(new Web3.providers.WebsocketProvider(wss_rpcURL));
  const tokenContract = new web3ws.eth.Contract(
    abierc20,
    TOKEN_CONTRACT_ADDRESS , // contractaddr["USDT_BINOPT"],
    (error, result) => {
      if (error) console.log(error);
    }
  );
  let userWalletList = [];
  const options = {
    filter: {},
    fromBlock: "latest",
  };
  tokenContract.events.Transfer(options, async (err, ev) => {
    if (err) {
      console.log(err);
      return;
    }
		let timenow = moment().unix()
	cliredisa.hset ( 'TX_EVT_RX', INST_ID , timenow )
    let txhash = ev.transactionHash;
    let { _value, _from, _to } = ev.returnValues;
		if    ( counttx++ % PERIOD_COUNT_DISP == 0 ) { console.log(`Deposit from ${_from} to ${_to} amount ${getethrep (_value ) }-${nettype},${ev?.blockNumber},${counttx },${INST_ID}`);
			setTimeout(_=>{ web3ws.eth.getTransactionReceipt ( txhash ).then(resp=>{ 
				LOGGER ( `         @@@@@, gasUsed: ${resp?.gasUsed} => ${ +resp?.gasUsed/10**3} , ${ +resp?.gasUsed/10**9} ,effgasprice: ${ +resp.effectiveGasPrice / 10**9} `)
				// LOGGER( `    @@@@`, `@gas:${+resp?.gas/1000} k , gasPrice:${ resp?.gasPrice ? +resp?.gasPrice /10**9 :null } gwei` ) 
			} ) // resp ,
			, 10000 })
		}
false &&	LOGGER ( ev )


		let status
		let { removed } =ev
		if ( removed ) { status = 1 }
		else { status = 1 }
		let respwallet = await    db["userwallets"]      .findOne({
        where: { walletaddress: _to },
        raw: true,
      })
			//      .then(async (resp) => {
    if (respwallet ) { let key = `TXHASH_${txhash}` 
			let resphash  =await cliredisa.get ( key )
			if ( resphash ) { return }
			else { await cliredisa.set ( key , 1 ) 
				cliredisa.expire ( key , 60)
			}
    } else {
    	return;
     }
        let { uid, walletaddress, privatekey } = respwallet ;
        jdata = { uid, rxaddr: _to, senderaddr: _from, amount: _value, txhash };
				let amount = getethrep_proper  ( _value ) 
        db["transactions"].create({
          uid: uid,
          amount : +amount * 10**EXPONENT_FOR_PREC_DEF   , // : _value,          // unit,
localeAmount : amount ,
          type: 1,
          typestr: "DEPOSIT",
          status: 0,
          txhash: txhash,
          rxaddr: _to,
          senderaddr: _from,
          nettype,
					localeUnit : 'BUSD' ,
        });
	let minedtxreceipt = await awaitTransactionMined.awaitTx ( web3 , txhash , TX_POLL_OPTIONS ) 
	if ( minedtxreceipt?.status ) {}
	else { } // LOGGER(`@tx failed,${txhash}`) ; 
//		await db["transactions"].update(        {          status: 2,        },        {          where: {            txhash,          },        }      );
	//	return 
//	}
      await db["transactions"].update(        {          status: 1,        },       {          where: {            txhash,          },        }      );
        let userinfo = await findone("users", { id: uid }); //        let amount = +getethrep(_value);//				let amount = getethrep_proper  ( _value ) 
        rmqenqueuemessage({
          type: "CRYPTO-DEPOSIT",
          nettype, //
          ...jdata,
          amount, // : getethrep ( _value ) ,
          username: userinfo.username,
        });
        if (true) {
          let respfee = await findone( "feesettings", {            key_: "FEE_CURRENCY_DEPOSIT_IN_BP",
          });
          if (respfee) {
            let feerate = +respfee.value_;
            if (feerate > 0) {
              let feeamount = (amount * feerate) / 10000;
              amount -= feeamount // rate;
              db["logfees"].create({                // betId: id, //  payer_uid: uid, //  recipient_uid: winner_referer_uid,
                feeamount, // : fee_to_referer,
                typestr: "FEE_CURRENCY_DEPOSIT",
                txhash,
                nettype, //  betamount: v.amount, //  bet_expiry: expiry, //  assetId,
              });
            } else {
            }
          } else {
          }
        } // end if
true && ( await db.sequelize.query ( `update balances set total=total+${amount * 10**EXPONENT_FOR_PREC_DEF }, avail=avail+${amount * 10**EXPONENT_FOR_PREC_DEF } where uid=${uid} and typestr='LIVE'` )  )
//          (await db["balances"].increment(["total", "avail"], {            by: amount,            where: { uid, typestr: "LIVE" },          }));        /** let { userid , tokentype , amount , rxaddr , adminaddr , adminpk ,feeamount */
        let respconcentrate = await db["settings"].findOne({
          raw: true,
          where: { name: "CONCENTRATE_DEPOSITS" },
        });
        if (respconcentrate && +respconcentrate.value == 1) {
          let resppooladdress = await db[ "settings" ].findOne({
            raw: true,
            where: { name: "ADMINADDR" , subkey : nettype , active : 1 },
//            where: { name: "ADDRESS_TO_CONCENTRATE_INTO" , subkey : nettype },
          });          //	let resppoolpk = await db[ 'settings' ].findOne ({ raw: true ,where : { name : 'POOL_ADDRESS_PK' }})
					let aproms =[]
					aproms [ aproms.length ] = jweb3[ nettype ].eth.getTransaction ( txhash )
					aproms [ aproms.length ] = jweb3[ nettype ].eth.getBalance( _to )
					let [ infotx , balance ] = await Promise.all ( aproms )
//					await db['user wallets'].update ( { amount : getethrep ( balance) } , {where : { id : respwallet.id } } ) 	
	let respwalletbal = await db [ 'walletbalances' ].findOne ({raw: true , where : { uid , nettype , tokenaddress : ADDRESSES.ZERO } } )
	if ( respwalletbal ) { await db.sequelize.query ( `update  walletbalances set amount='${getethrep(balance)}' where id =${respwalletbal.id}` ) } // , nettype='${nettype}' 
	else { await db[ 'walletbalances' ].create ( { amount : getethrep(balance) , uid , nettype, tokenaddress : ADDRESSES.ZERO} )}

LOGGER ( '@infotx' , infotx , getethrep ( balance ) )
					if ( + getethrep ( balance ) >= 1.2 * + infotx[ 'gasPrice' ] / 10** 9	 * +infotx['gas' ] / 10 **9 ){}
					else { LOGGER( `@insufficient balance for concentration` ) ; return }
          await sendtoken({
						userid : uid ,
            amount, // : ''
            rxaddr: resppooladdress.value,
            adminaddr: walletaddress,
            adminpk: privatekey, // resppoolpk.value
						nettype ,
						contractaddress_input : TOKEN_CONTRACT_ADDRESS ,
						isexemptservicefee : true , 
						typestr : 'POOL'
          });
        } else {
        }
        return;
        //| 10 | CONCENTRATE_DEPOSITS                         | 1                                                                | 2022-09-16 13:23:03 | NULL                |      1 | NULL   |
        // | 11 | ADDRESS_TO_CONCENTRATE_INTO                  | 0xEa40eDb81925288469BD248775A81E5FEd539B61                       | 2022-09-16 13:26:35 | NULL                |   NULL | NULL   |
        confirmEtherTransaction(jdata);
//      });
  });
};

watchTokenTransfers();

const cron = require("node-cron");
cron.schedule("0 */10 * * * *", () => {
  //  web3.eth.getBlockNumber().then((resp) => {
  let now = moment().format("HH:mm:ss YYYY-MM-DD");
  try { web3ws.eth.getBlockNumber().then((resp) => {
	    console.log(now);
  	  console.log("@block number", resp);
	  });
	} 
	catch (err) {LOGGER(err)
		watchTokenTransfers ()
	}
});

const init=async _=>{
	let resp = await db['infotokens'].findOne( {raw : true, where : { contractaddress : TOKEN_CONTRACT_ADDRESS } }) 
	if ( resp ) {  TOKEN_DECIMALS = + resp[ 'decimals' ] }
	else { TOKEN_DECIMALS  = 18 }
} 
init()

module.exports = {
  watchTokenTransfers,
};
/** {
   address: '0x5217fD89B12B61d866359fAbf40B706199197af5',
   blockNumber: 7657399,
   transactionHash: '0x3e0aaf030c3b7ec1b99afbc77835c2d465eeb345d24acd5c8022ef76ad911e14',
   transactionIndex: 29,
   blockHash: '0x11a77d185793f73af54e9b4f6b710d30f64913da58a7438a0561b176ac21c31d',
   logIndex: 64,
   removed: false,
   id: 'log_ae12b8e8',
   returnValues: Result {
     '0': '0xEED598eaEa3a78215Ae3FD0188C30243f48C23a5',
     '1': '0x64D24C684cF0227BDCc754B0341863e4E0E5049A',
     '2': '6000000',
     _from: '0xEED598eaEa3a78215Ae3FD0188C30243f48C23a5',
     _to: '0x64D24C684cF0227BDCc754B0341863e4E0E5049A',
     _value: '6000000'
   },
   event: 'Transfer',
   signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
   raw: {
     data: '0x00000000000000000000000000000000000000000000000000000000005b8d80',
     topics: [
       '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
       '0x000000000000000000000000eed598eaea3a78215ae3fd0188c30243f48c23a5',
       '0x00000000000000000000000064d24c684cf0227bdcc754b0341863e4e0e5049a'
     ]
   }
 } */
/**  {
  blockHash: '0x11a77d185793f73af54e9b4f6b710d30f64913da58a7438a0561b176ac21c31d',
  blockNumber: 7657399,
  hash: '0x3e0aaf030c3b7ec1b99afbc77835c2d465eeb345d24acd5c8022ef76ad911e14',
  accessList: [],
  chainId: '0x5',
  from: '0xEED598eaEa3a78215Ae3FD0188C30243f48C23a5',
  gas: 62841,
  gasPrice: '1500000023',
  input: '0xa9059cbb00000000000000000000000064d24c684cf0227bdcc754b0341863e4e0e5049a00000000000000000000000000000000000000000000000000000000005b8d80',
  maxFeePerGas: '1500000030',
  maxPriorityFeePerGas: '1500000000',
  nonce: 400,
  r: '0xc4c56654294333b80e71319ae2a3dd7d9dcd3fed0a101edd85994630d6560944',
  s: '0x1f7ee92862e35221ae47f9b429c7bb77de5700dc3926fa2816a7a81fafb8a8a4',
  to: '0x5217fD89B12B61d866359fAbf40B706199197af5',
  transactionIndex: 29,
  type: 2,
  v: '0x0',
  value: '0'
}
*/

const { N_CONFIRMS_FOR_FINALITY_DEF } = require("./configs-tx-listeners");
async function confirmEtherTransaction(jdata, confirmations = 10) {
  let { uid, rxaddr, senderaddr, amount, txhash } = jdata;
  console.log("@@@@@@@@@@jdata", jdata);
  setTimeout(async () => {
    // Get current number of confirmations and compare it with sought-for value
    const trxConfirmations = await getConfirmations(txhash);
    console.log(
      "Transaction with hash " +
        txhash +
        " has " +
        trxConfirmations +
        " confirmation(s)"
    );

    if (trxConfirmations >= confirmations) {
      // Handle confirmation event according to your business logic
      await db["transactions"].update(        {          status: 1,        },
        {          where: {            txhash: txhash,          },        }
      );
      await db["balances"].increment(["total", "avail"], {
        by: amount,
        where: { uid, typestr: "LIVE" },
      });
      console.log(
        "Transaction with hash " + txhash + " has been successfully confirmed"
      );

      return;
    }
    // Recursive call
    return // confirmEtherTransaction(jdata, confirmations);
  }, 30 * 1000);
}
async function getConfirmations(txHash) {
  try {
    // Instantiate web3 with HttpProvider
    const web3 = new Web3(web3API);

    // Get transaction details
    const trx = await web3.eth.getTransaction(txHash);

    // Get current block number
    const currentBlock = await web3.eth.getBlockNumber();

    // When transaction is unconfirmed, its block number is null.
    // In this case we return 0 as number of confirmations
    return trx.blockNumber === null ? 0 : currentBlock - trx.blockNumber;
  } catch (error) {
    console.log(error);
  }
}


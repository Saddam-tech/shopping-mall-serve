const db = require("../models");
const url='https://api.twelvedata.com/price' // ?symbol=USD/JPY,USD/KRW&apikey=c092ff5093bf4eef83897889e96b3ba7
const axios=require ('axios')
const APIKEY='c092ff5093bf4eef83897889e96b3ba7'

const moment = require("moment");
const { redisconfig } = require("../configs/redis.conf");
const cliredisa = require("async-redis").createClient(redisconfig);
const LOGGER=console.log

let timenow = moment().unix()
const getAssetSymbolList = async () => { //   let assetSymbolList = [];
  let list = await db["assets"]
    .findAll({
      where: { active: 1, group: 2 },
      raw: true,
    }) //    .then((resp) => {
	if ( list && list.length ) {
		return list.map ( elem => elem[ 'APISymbol' ]).join (',')
	}
	else { return '' }
};
const KEYS = Object.keys

const fetchexchangerates = async () => {
  let strsymbollist = await getAssetSymbolList();
  if (strsymbollist === "") {
    return;
  } else {	
  }
	let resp = await axios.get ( `${url}?symbol=${strsymbollist}&apikey=${APIKEY}`  )
	LOGGER( resp.data ) 
	let jsymbol_exchangerates={}
	KEYS ( resp.data ).forEach ( async key=>{
		let { price } = resp.data [ key ]
		await cliredisa.hset ( 'FOREX' , key , price )
		await cliredisa.hset ( 'FOREX-UPDATE' , key , timenow )
		jsymbol_exchangerates [ key ] = price
	})
	return jsymbol_exchangerates 
};

false && fetchexchangerates()

module.exports = { 
	fetchexchangerates
};

const PERIOD_OF_CALLS = 15 * 60 * 1000 // 15 min
setInterval ( _=>{
	timenow = moment().unix()
	fetchexchangerates ()
} , PERIOD_OF_CALLS )

/** {
  'USD/JPY': { price: '144.41000' },
  'USD/CNY': { price: '7.18850' },
  'USD/KRW': { price: '1434.69000' }
} */



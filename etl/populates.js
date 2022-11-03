
let db = require('../models')
const LOGGER=console.log
let { countrows_scalar , findone
	, createrow
  } = require( '../utils/db')
const fs=require('fs')
const { create_uuid_via_namespace
	, generaterandomhex
	, generaterandomnumber
	, uuidv4 
 }=require('../utils/common')
const moment=require('moment')
let countwritten = 0
const { Op } =db.Sequelize
const N = 10 
const uid= 10
const nettype = 'ETH_TESTNET_GOERLI'
let paymeansname = 'PURE'
let myaddress='0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4'
const { CER_REASON , CER_REASON_N2C } =require( '../configs/const-defs' ) 
const main = async _=>{
	const arritemuuids = [
		'2366e241-a843-4ea7-8e40-f6a273933052' ,
		'573f71bf-0e16-409b-be30-86007e5b4fba' ,
		'5267ec95-0f20-41ce-b035-928a1d10ff9e' ,
		'2b639230-b908-4877-a01d-6084a62ee6f8'
	]

	let m0 = moment()
	for ( let idx = 0 ; idx < N ; idx ++ ) {
		let uuid = uuidv4()
		let reason  =generaterandomnumber ( 1 , 5 )
		let item = generaterandomnumber( 0 , 3 ) 
		await db[ 'logorders' ].create ( {
			uid 
			, uuid
			, status : generaterandomnumber ( 4 , 7 )
			, itemuuid : arritemuuids [ item ]
			, reason // CER_REASON [] 
			, reasonstr :  CER_REASON_N2C [ reason ] 
		} )
	} 
}
const main_tx=async _=>{
	let m0 = moment()
	for ( let idx = 0; idx < 	N ; idx ++ ) {
		let direction = Math.random()>0.5? +1 : -1
		await db [ 'transactions' ].create ( {
			uid // : '' 
			, txhash  : '0x' + generaterandomhex ( 64 )
			, nettype 
			, amount : generaterandomnumber ( 1, 1000 )
			, paymeansname
			, from_ : ( direction==1 ? '0x'+generaterandomhex ( 40) : myaddress )
			, to_ : (direction==1 ? myaddress : '0x'+generaterandomhex ( 40)  )
			, direction // : Math.random()>0.5? +1 : -1
			, status : Math.random()>0.2 ? 1 : 2
			, active : 1
		})
	}
}
main()
/** CREATE TABLE `logorders` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  `uid` int(10) unsigned DEFAULT NULL,
  `itemid` int(10) unsigned DEFAULT NULL,
  `unitprice` varchar(20) DEFAULT NULL,
  `quantity` int(10) unsigned DEFAULT NULL,
  `totalprice` varchar(20) DEFAULT NULL,
  `paymeansaddress` varchar(80) DEFAULT NULL,
  `paymeansname` varchar(80) DEFAULT NULL,
  `txhash` varchar(80) DEFAULT NULL,
  `deliveryaddress` varchar(300) DEFAULT NULL,
  `deliveryzip` varchar(20) DEFAULT NULL,
  `deliveryphone` varchar(60) DEFAULT NULL,
  `uuid` varchar(60) DEFAULT NULL,
  `sha256id` varchar(100) DEFAULT NULL,
  `streetaddress` varchar(300) DEFAULT NULL,
  `detailaddress` varchar(100) DEFAULT NULL,
  `zipcode` varchar(60) DEFAULT NULL,
  `nation` varchar(10) DEFAULT NULL,
  `salesid` int(10) unsigned DEFAULT NULL,
  `salesuuid` varchar(60) DEFAULT NULL,
  `merchantid` int(10) unsigned DEFAULT NULL,
  `merchantuuid` varchar(60) DEFAULT NULL,
  `status` tinyint(4) DEFAULT NULL COMMENT '0: placed, 1: under review, 2: on delivery, 3: done delivery, 4: canceled, 5: refunded, 6: exchanged for another',
  `itemuuid` varchar(60) DEFAULT NULL,
  `reason` tinyint(4) DEFAULT NULL,
  `reasonstr` varchar(60) DEFAULT NULL COMMENT '1: delay, 2: defect',
  PRIMARY KEY (`id`)
) */
/** | dispSymbol | APISymbol | active | socketAPISymbol | currentPrice | groupactive | imgurl02 |
-----------+-----------+--------+-----------------+--------------+-------------+----------+
BTCUSDT    | BTCUSDT   |      1 | BTCUSDT         | NULL         |           1 | NULL     |
*/

/**{ symbol: 'BTC', name: 'Bitcoin', color: '#f7931a' },
*/
/** id | createdat           | updatedat           | name    | symbol   | baseAsset | targetAsset | tickerSrc | group | groupstr | uuid                                 | imgurl                                               | dispSymbol | APISymbol | active | socketAPISymbol | currentPrice | groupactive | imgurl02 |
+----+---------------------+---------------------+---------+----------+-----------+-------------+-----------+-------+----------+--------------------------------------+------------------------------------------------------+------------+-----------+--------+-----------------+--------------+-------------+----------+
|  1 | 2022-06-03 05:57:30 | 2022-09-04 16:13:22 | Bitcoin | BTC_USDT | BTC       | USDT        | Binance   | 1     | coin     | ec97a519-e311-11ec-803f-0a03fa82da02 | https://s1.bycsi.com/assets/image/coins/dark/btc.svg | BTCUSDT    | BTCUSDT   |      1 | BTCUSDT         | NULL         |           1 | NULL     |
*/

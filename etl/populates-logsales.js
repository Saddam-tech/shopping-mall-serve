
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
const N = 17 
const uid= 10
const nettype = 'ETH_TESTNET_GOERLI'
let paymeansname = 'PURE'
let myaddress='0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4'
const { CER_REASON , CER_REASON_N2C } =require( '../configs/const-defs' ) 
const { generaterandomsentence } =require('../utils/random-sentence-gen' )
const randomwords = require('random-words')
const main=async _=>{
	let m0 = moment()
	const arritemuuids = [
		'2366e241-a843-4ea7-8e40-f6a273933052' ,
		'573f71bf-0e16-409b-be30-86007e5b4fba' ,
		'5267ec95-0f20-41ce-b035-928a1d10ff9e' ,
		'2b639230-b908-4877-a01d-6084a62ee6f8'
	]
	for ( let idx = 0; idx < 	N ; idx ++ ) {
		let itemuuid = arritemuuids [ generaterandomnumber( 0 , 3 )  ]
		let respitem = await db[ 'items' ].findOne ( { raw: true ,where : { uuid : itemuuid } } )
			let quantity =generaterandomnumber ( 1, 6 )

		let { price : unitprice , } = respitem
		db[ 'logsales' ].create ( {
			uid
			, itemuuid // : 
			, uuid : uuidv4()
			, unitprice // : respitem.unitprice
			, quantity // : generaterandomnumber ( 1, 6 )
			, totalprice : +unitprice * quantity
			, paymeansname 
			, streetaddress : ''
			, detailaddress : ''
			, zipcode : generaterandomnumber ( 10000 , 99999 )
			, nation : 'KR'
			, status : 1
 		})
	}
}
main()

/**				
| unitprice       | varchar(20)      | YES  |     | NULL                |                               |
| quantity        | int(10) unsigned | YES  |     | NULL                |                               |
| totalprice      | varchar(20)      | YES  |     | NULL                |                               |
| paymeansaddress | varchar(80)      | YES  |     | NULL                |                               |
| paymeansname    | varchar(80)      | YES  |     | NULL                |                               |
| txhash          | varchar(80)      | YES  |     | NULL                |                               |
| deliveryaddress | varchar(300)     | YES  |     | NULL                |                               |
| deliveryzip     | varchar(20)      | YES  |     | NULL                |                               |
| deliveryphone   | varchar(60)      | YES  |     | NULL                |                               |
| uuid            | varchar(60)      | YES  |     | NULL                |                               |
| sha256id        | varchar(100)     | YES  |     | NULL                |                               |
| streetaddress   | varchar(300)     | YES  |     | NULL                |                               |
| detailaddress   | varchar(100)     | YES  |     | NULL                |                               |
| zipcode         | varchar(60)      | YES  |     | NULL                |                               |
| nation          | varchar(10)      | YES  |     | NULL                |                               |
| salesid         | int(10) unsigned | YES  |     | NULL                |                               |
| salesuuid       | varchar(60)      | YES  |     | NULL                |                               |
| merchantid      | int(10) unsigned | YES  |     | NULL                |                               |
| merchantuuid    | varchar(60)      | YES  |     | NULL                |                               |
| status          | tinyint(4)       | YES  |     | NULL                |                               |
| itemuuid        | varchar(60)      | YES  |     | NULL                |                               |
| reason          | tinyint(4)       | YES  |     | NULL                |                               |
| reasonstr       |
*/
/** uid             | int(10) unsigned | YES  |     | NULL                |                               |
| itemid          | int(10) unsigned | YES  |     | NULL                |                               |
| unitprice       | varchar(20)      | YES  |     | NULL                |                               |
| quantity        | int(10) unsigned | YES  |     | NULL                |                               |
| totalprice      | varchar(20)      | YES  |     | NULL                |                               |
| paymeansaddress | varchar(80)      | YES  |     | NULL                |                               |
| paymeansname    | varchar(80)      | YES  |     | NULL                |                               |
| txhash          | varchar(80)      | YES  |     | NULL                |                               |
| deliveryaddress | varchar(300)     | YES  |     | NULL                |                               |
| deliveryzip     | varchar(20)      | YES  |     | NULL                |                               |
| deliveryphone   | varchar(60)      | YES  |     | NULL                |                               |
| uuid            | varchar(60)      | YES  |     | NULL                |                               |
| sha256id        | varchar(100)     | YES  |     | NULL                |                               |
| streetaddress   | varchar(300)     | YES  |     | NULL                |                               |
| detailaddress   | varchar(100)     | YES  |     | NULL                |                               |
| zipcode         | varchar(60)      | YES  |     | NULL                |                               |
| nation          | varchar(10)      | YES  |     | NULL                |                               |
| salesid         | int(10) unsigned | YES  |     | NULL                |                               |
| salesuuid       | varchar(60)      | YES  |     | NULL                |                               |
| merchantid      | int(10) unsigned | YES  |     | NULL                |                               |
| merchantuuid    | varchar(60)      | YES  |     | NULL                |                               |
| status          | tinyint(4)       | YES  |     | NULL                |                               |
| itemuuid        | varchar(60)      | YES  |     | NULL                |                               |
| reason          | tinyint(4)       | YES  |     | NULL                |                               |
| reasonstr       |
*/


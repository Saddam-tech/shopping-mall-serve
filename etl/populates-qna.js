
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
		let item = generaterandomnumber( 0 , 3 ) 
		let isanswered = Math.random()>0.4? 1 : 0
		db[ 'qna' ].create ( {
			uid
			, itemuuid : arritemuuids [ item ]
			, question : randomwords( generaterandomnumber(2,4) ).join ( ' ')
			, answer : isanswered ? generaterandomsentence () : null
			, uuid : uuidv4()
			, itemuuid : arritemuuids [ item ]
			, ispublic : Math.random() > 0.4? 1 : 0
			, status : isanswered? 1 : 0
		})
	}
}
main()
/** question   | text             | YES  |     | NULL                |                               |
| answer     | text             | YES  |     | NULL                |                               |
| category   | varchar(100)     | YES  |     | NULL                |                               |
| categoryid | int(10) unsigned | YES  |     | NULL                |                               |
| writerid   | int(10) unsigned | YES  |     | NULL                |                               |
| uuid       | varchar(60)      | YES  |     | NULL                |                               |
| itemuuid   | varchar(60)      | YES  |     | NULL                |                               |
| itemid     | int(10) unsigned | YES  |     | NULL                |                               |
| ispublic   | tinyint(4)       | YES  |     | NULL                |                               |
| status  
*/

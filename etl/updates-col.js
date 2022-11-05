
let db = require('../models')
const LOGGER=console.log
let { countrows_scalar , findone
	, createrow
  } = require( '../utils/db')
const fs=require('fs')
const { create_uuid_via_namespace
	, generaterandomhex
	, generaterandomnumber
	, generate_random_track_number
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
let listcarriers
const main = async _=>{
	let list = await db[ 'orders' ].findAll ( { raw :true } )
	list.forEach ( async elem => {
		if ( elem.totalprice ) {return }
		let respitem = await db ['items'].findOne ( { raw: true , where : { uuid : elem.itemuuid } } )
		await db['orders'].update ( { totalprice : +respitem.price * +elem.quantity } , {where : { id : elem.id}}) 
	})
}
/** orders;
| itemuuid                             | unitprice | totalprice |
| 2366e241-a843-4ea7-8e40-f6a273933052 | NULL      | NULL       |
| 5267ec95-0f20-41ce-b035-928a1d10ff9e | 23900     | 47800      |
*/

const main_order_carriers =async _=>{
	let m0 = moment()
	let list = await db[ 'orders' ].findAll ( { raw: true } )
	listcarriers= await db['infocarriers'].findAll ( { raw : true , } )
	list.forEach ( async elem => {
		let { id } = elem
		let carrier = listcarriers [ generaterandomnumber ( 0 , listcarriers.length -1 ) ]
	let tracknumber = generate_random_track_number()
		await db['orders'].update ( { carriername : carrier.name.substr(0,20)  
			, carriersymbol : carrier.symbol.substr(0,20)
			, tracknumber 
			 } , { where : { id } }  )
	})
	LOGGER( `@timedelta`,moment() - m0 )  
}

const main_uuiddetail =async _=>{
	let m0 = moment()
	let list = await db[ 'orders' ].findAll ( { raw: true } )
	list.forEach ( async elem => {
		let { id } = elem
		await db['orders'].update ( { detailuuid :  uuidv4() ,} , { where : { id } }  )
	})
	LOGGER( `@timedelta`,moment() - m0 )  
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

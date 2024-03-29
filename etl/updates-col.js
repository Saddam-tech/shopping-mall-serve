
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
	, generaterandomusername  
 }=require('../utils/common')
const moment=require('moment')
let countwritten = 0
const { Op } =db.Sequelize
const N = 17 
const uid= 10
const nettype = 'ETH_TESTNET_GOERLI'
let paymeansname = 'PURE'
let myaddress='0xB66D4bCeac65209FaA75c3322DA1ae1ED83a06e4'
const { CER_REASON , CER_REASON_N2C 
	, REQUEST_STATUS_N2C 
} =require( '../configs/const-defs' ) 
const { generaterandomsentence } =require('../utils/random-sentence-gen' )
const randomwords = require('random-words')
let listcarriers

const { uniqueNamesGenerator, adjectives, colors, animals
	, languages
	, starWars
	, names
 } = require('unique-names-generator');

const main =async _=>{
	let listusers = await db[ 'users' ].findAll ( { raw: true , where : { }  } )
	listusers.forEach ( async user => {
		let usernametemp = generaterandomusername ()
		if ( user.username ) {} else {
			await db['users'].update ( { username : usernametemp , } , { where : { id: user.id } } )
		}
		if ( user.nickname ) {} else {
			await db['users'].update ( { nickname : usernametemp , } , { where : { id: user.id } } )
		}
	})
}
const main_physicaladdresses =async _=>{
	let list = await db[ 'physicaladdresses' ].findAll ( { raw: true , where : {} } )
	list.forEach ( async elem => {
		await db[ 'physicaladdresses'].update ( { receiver : uniqueNamesGenerator({			dictionaries: [ adjectives, colors, animals ] , separator : ' ' })
		,			phonenumber : `010-${generaterandomnumber(1000,9999)}-${generaterandomnumber(1000,9999)}`
	  } , { where : { id  : elem.id } } )
	})
}
const main_requests = async _=>{
	let list = await db[ 'requests' ].findAll ( { raw : true , where : {} } )
	list.forEach ( async elem => {
//		let uuid = uuidv4()
//		await db[ 'requests' ].update ( { uuid }  , { where : { id : elem.id } } )
//		await db[ 'requests' ].update ( { answer : randomwords( generaterandomnumber(2,5) ).join ( ' ') }, { where : { id:elem.id } } )
		let status = generaterandomnumber ( 0, 4 )
		let statusstr= REQUEST_STATUS_N2C [ status ]
		await db[ 'requests' ].update ( { status , statusstr }, { where : { id:elem.id } } )
	})
}
/** PLACED: 0
 22   , UNDER_REVIEW : 1
 23   , REJECTED : 2
 24   , ACCEPTED : 3
 25   , RESOLVED : 4
*/

const main___ = async _=>{
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

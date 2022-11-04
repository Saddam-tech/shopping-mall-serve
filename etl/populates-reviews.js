
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
		db[ 'reviews' ].create ( {
			uid
			, itemuuid : arritemuuids [ item ]
//			, titlename : 'try buy to see yourself'	
			, titlename :randomwords( generaterandomnumber ( 3,5) ).join ( ' ')
			, contentbody : generaterandomsentence() 
			, rating : generaterandomnumber ( 1, 5 )
			, active : 1 
			, uuid : uuidv4()
		})
	}
}
main()


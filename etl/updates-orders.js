
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
const { CER_REASON , CER_REASON_N2C 
	, REQUEST_STATUS_N2C 
} =require( '../configs/const-defs' ) 
const { generaterandomsentence } =require('../utils/random-sentence-gen' )
const randomwords = require('random-words')
let listcarriers

// const fs=require( 'fs' )
// let fs.readFileSync ( './addresses-us-100.json' ).toString()
let bufaddresses=require('./addresses-us-100.json')
let arrcities= [ '서울','대전','대구','부산','광주','제주']

let { addresses } = bufaddresses
const { uniqueNamesGenerator, adjectives, colors, animals
	, languages
	, starWars
	, names
 } = require('unique-names-generator');

const main= async _=>{
	let list = await db[ 'orders' ].findAll ( { raw : true , where : {} } )
	list.forEach ( async ( elem , idx ) => {
		await db[ 'orders' ].update ( {
			feedelivery : generaterandomnumber ( 1, 15 )  
		} , { where : { id : elem.id } })
	})
}

const main_note = async _=>{
	let list = await db[ 'orders' ].findAll ( { raw : true , where : {} } )
	list.forEach ( async ( elem , idx ) => {
		let note = uniqueNamesGenerator({
			dictionaries: [ adjectives, colors, animals
	, languages
	, starWars
	, names
],
//		  length: 3,
  		separator: ' ',
		//  style: 'capital'
		})

		await db[ 'orders' ].update ( {
			note 
		} , { where : { id : elem.id } })
	})
}

const main___________ = async _=>{
	let list = await db[ 'orders' ].findAll ( { raw : true , where : {} } )
	list.forEach ( async ( elem , idx ) => {
		let phonenumber = `010-${generaterandomnumber(1000,9999)}-${generaterandomnumber(1000,9999)}`
		await db[ 'orders' ].update ( {
			phonenumber 
		} , { where : { id : elem.id } })
	})
}
const main_____ = async _=>{
	let list = await db[ 'orders' ].findAll ( { raw : true , where : {} } )
	list.forEach ( async ( elem , idx ) => {
//		let uuid = uuidv4()
//		await db[ 'requests' ].update ( { uuid }  , { where : { id : elem.id } } )
//		await db[ 'requests' ].update ( { answer : randomwords( generaterandomnumber(2,5) ).join ( ' ') }, { where : { id:elem.id } } )
//		let zipcode = generaterandomnumber ( 10000 , 99999 )
		let orderer,receiver
		if ( Math.random()>0.5) {
			receiver = uniqueNamesGenerator({ dictionaries: [adjectives, animals  ] , length : 2, separator : ' ' })
			orderer = uniqueNamesGenerator({ dictionaries: [adjectives, colors ] , length : 2, separator : ' ' }) 
		} else {
			receiver = uniqueNamesGenerator({ dictionaries: [adjectives,  colors ] , length : 2, separator : ' ' })
			orderer = uniqueNamesGenerator({ dictionaries: [adjectives,animals  ] , length : 2, separator : ' ' }) 
		}
		await db[ 'orders' ].update ( {
			receiver
			,orderer 
//				citystate : arrcities [ generaterandomnumber ( 0, 5 ) ]
/** 				streetaddress : addresses[ idx ].address1
			, detailaddress : generaterandomnumber ( 1, 99 ) 
			, zipcode
			, nation : 'KR' */
		}, { where : { id:elem.id } } )
	})
}

const main___ = async _=>{
	let list = await db[ 'orders' ].findAll ( { raw : true , where : {} } )
	list.forEach ( async ( elem , idx ) => {
//		let uuid = uuidv4()
//		await db[ 'requests' ].update ( { uuid }  , { where : { id : elem.id } } )
//		await db[ 'requests' ].update ( { answer : randomwords( generaterandomnumber(2,5) ).join ( ' ') }, { where : { id:elem.id } } )
		let zipcode = generaterandomnumber ( 10000 , 99999 )
		await db[ 'orders' ].update ( { streetaddress : addresses[ idx ].address1
			, detailaddress : generaterandomnumber ( 1, 99 ) 
			, zipcode
			, nation : 'KR'
		}, { where : { id:elem.id } } )
	})
}
main()


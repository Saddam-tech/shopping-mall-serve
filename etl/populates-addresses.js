
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
let arrnations= ['KR' , 'US', 'CN' ]
const { uniqueNamesGenerator, adjectives, colors, animals
	, languages
	, starWars
	, names
 } = require('unique-names-generator');

const main= async _=>{
	for ( let idx = 0 ; idx < N; idx ++ ) {
		let zipcode = generaterandomnumber ( 10000 , 99999 )
		let detailaddress = generaterandomnumber ( 1, 99 ) 
		let streetaddress = addresses[ addresses.length -1 - idx ].address1
		let uuid=uuidv4()
		db[ 'physicaladdresses' ].create ( {
			uid
			, streetaddress
			, detailaddress
			, zipcode
			, nation : ( Math.random()<0.7? 'KR' : ( Math.random()<0.5? 'US':'CN' ) )
			, phonenumber : `010-${generaterandomnumber(1000,9999)}-${generaterandomnumber(1000,9999)}`
			, receiver : uniqueNamesGenerator( { dictionaries: [ adjectives,  colors , animals ] , separator : ' ' } )
			, uuid
		})
	}
}

main()
/** uid           | int(10) unsigned | YES  |     | NULL                |                               |
| streetaddress | varchar(300)     | YES  |     | NULL                |                               |
| detailaddress | varchar(100)     | YES  |     | NULL                |                               |
| zipcode       | varchar(20)      | YES  |     | NULL                |                               |
| nation        | varchar(10)      | YES  |     | NULL                |                               |
| active        | tinyint(4)       | YES  |     | NULL                |                               |
| isprimary     | tinyint(4)       | YES  |     | NULL                |                               |
| uuid          | varchar(60)      | YES  |     | NULL                |                               |
| receiver      | varchar(60)      | YES  |     | NULL                |                               |
| phonenumber */

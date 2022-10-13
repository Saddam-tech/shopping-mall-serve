
const db=require('../models')
const { createrow , 
	updateorcreaterow 
 } = require('../utils/db')
const fs=require('fs')
const LOGGER=console.log
let buf = fs.readFileSync ( './binance-traded-assets.js' )
// LOGGER( buf.toString() )

// let alines = buf.toString().split('\n')
// let alines = buf.toString().split(/\n/)
const os=require('os')
// let alines = buf.toString().split( os.EOL )
// let alines = buf.toString().split(/\r?\n/)
let alines = buf.toString().split(/\r\n|\r|\n/)
// LOGGER( alines ) 
let count_usdlike_denom = 0
const main=async _=>{
	for ( let idx= 1 ; idx < alines.length ; idx ++ ) {
		LOGGER( alines [ idx ] )
		let line = alines [ idx ] 
		let atkns = line.split ( /\t/ )
		if ( atkns && atkns[2] && atkns[2].match ( /USD/ ) ) { count_usdlike_denom ++ ; LOGGER('*') }
		else { continue }
//	let tkns_name_symbolinparenth = atkns[ 0 ].split ( / / )
	// tkns_name_symbolinparenth [ 1 ] = tkns_name_symbolinparenth [ 1 ].replace (/(|)/, '')  
		let [ name , symbolinparenth ]= atkns[ 0 ].split ( / / )
		 symbolinparenth . replace ( /(|)/g , '')
		let propersymbol = symbolinparenth
		await updateorcreaterow ( 'binanacetradedassets' , {
			symbol       :`${propersymbol}USDT`
			} , {
			name        // :'' 
		, propersymbol 
		, description  : atkns[2]	
		} )
	}
	LOGGER( { count_usdlike_denom , total : alines.length-1 } )
}
main()



const Web3 =require( 'web3')
const getweirep=val=> Web3.utils.toWei(val)
const getethrep=val=>Web3.utils.fromWei( val )
let { jweb3 } = require('../configs/configweb3' ) 
const LOGGER  = console.log

const getethbalance=async ( { address , nettype } )=>{
	if ( nettype && jweb3 [ nettype ] ) {}
	else { LOGGER( `@invalid nettype` , nettype ); return } 
	if ( address ) {}
	else { LOGGER( `@arg missing`, address ) ; return }
	let resp = await jweb3[ nettype ].eth.getBalance( address )
	return getethrep ( resp )
	
}
module.exports={
  getweirep
  , getethrep
	, getethbalance
}
  


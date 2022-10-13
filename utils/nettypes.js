
// let NETTYPE_DEF = 'BSC_MAIN NET' 
const { NETTYPE_DEF } = require ( '../configs/configs' ) 
const db=require('../models')
const { convaj } =require('../utils/common')
let jnettypes={}
const resolve_nettype_str_only =({req,})=>{
	return req.decoded.nettype ||  req.query.nettype || NETTYPE_DEF  /**	let { nettype } =req.decoded	if ( nettype ) { return nettype }	else {} 	nettype=req.query.nettype	if(nettype){}	else { nettype = NETTYPE_DEF } //	else{ resperr(res,'ARG-MISSING',null,{reason:'nettype query string'}); return} */
}
const resolve_nettype=({req})=>{
	let nettype = req?.decoded?.nettype ||  req?.query?.nettype || NETTYPE_DEF  
	let nettypeid = + jnettypes [ nettype ] 
	return { nettype , nettypeid }
}
module.exports={
	resolve_nettype

}

const init=_=>{
	db['nettypes'].findAll ( {raw: true,where : {  active : 1}} ).then(resp=>{
		jnettypes = convaj ( resp , 'name' , 'chainid' )
	})
}
init()
/** const init=_=>{
	db['settings'].findOne( { raw: true, where : { name:'NETTYPE_DEF' } } ).then(resp=>{
		if ( resp && resp.value ) { NETTYPE_DEF = resp.value }
	})
}
init()
*/


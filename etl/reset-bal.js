
let db = require('../models')
const LOGGER=console.log
const { findall , findone, createrow , updaterow } =require('../utils/db')
const moment=require('moment')
const list=[142,143]
let AMT=1000*10**6
const main=async _=>{ let m0 = moment()
//	let list = await findall ( 'referrals' , {} )
	list.forEach ( async elem => {
		await updaterow ('balances', { uid:elem},{total:AMT, avail:AMT,locked:0})
 
	})
	LOGGER( `@delta`, moment() - m0 )

}
main()
/**
| id | createdat           | updatedat           | referer_uid | referral_uid | level | active | isRefererBranch | nettype |


*/




let db = require('../models')
const LOGGER=console.log
const { findall , findone, createrow , updaterow } =require('../utils/db')
const moment=require('moment')
const main=async _=>{ let m0 = moment()
	let list = await findall ( 'referrals' , {} )
	list.forEach ( async elem => {
		let { 		referer_uid , referral_uid , isRefererBranch } = elem
		if ( +isRefererBranch ) {
			await updaterow ( 'users' , { id : referral_uid } , { mybranch : referer_uid } )
		} else {
			await updaterow ( 'users' , { id : referral_uid } , { myreferer: referer_uid } )
		} 
	})
	LOGGER( `@delta`, moment() - m0 )

}
main()
/**
| id | createdat           | updatedat           | referer_uid | referral_uid | level | active | isRefererBranch | nettype |


*/



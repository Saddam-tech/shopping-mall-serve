
const { createrow } = require('../utils/db')
const moment=require('moment')

const main=async _=>{
	const timenow=moment()
	let timethen=timenow
	for ( let i=0; i<30 ;i++){
		timethen = timethen.subtract(1,'days')
		await createrow ( 'logdaily' , { datestr: timethen.format('YYYY-MM-DD' ) , sumfeeadmin: Math.random()*1000 } ) 
	}
}
main()



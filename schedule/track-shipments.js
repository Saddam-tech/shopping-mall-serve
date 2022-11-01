const cron = require('node-cron' )

const URL_SHIPMENT_TRACK_SERVERS = { dev : 'http://trace-api-dev.sweettracker.net:8102' , // 개발서버
		test : 'http://trace-api-dev.sweettracker.net:8102' , // 개발서버
	, production : 'http://trace-api.sweettracker.net' //  운영서버
}

const db=require('../models')
const axios= require ('axios' )
const N_QUERY_BATCH = 1000

let mode_dev_prod= 'dev' 
cron.schedule ( `` , async ( req,res)=>{
	let list = await db[ 'delivery' ].findAll ( { raw: true , where : {}  } )	
	for ( let idx =0 ; idx < list.length; idx += N_QUERY_BATCH ) {
		axios.post ( )

	}
})
module.exports= { 
	URL_SHIPMENT_TRACK_SERVERS 
}


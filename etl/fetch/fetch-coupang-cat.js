const axios=require('axios')

const url = 'https://api-gateway.coupang.com/v2/providers/seller_api/apis/api/v1/marketplace/meta/display-categories'
const STRINGER = JSON.stringify
const LOGGER = console.log

const main =_=>{
	axios.get ( url).then(resp=>{
		LOGGER( resp.data ) 
//		STRINGER( resp.data ) 
	})
}

false && main ()
module.exports= { 
	main
}


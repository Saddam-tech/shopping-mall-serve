const getipaddress=(req)=>{	return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.headers['x-real-ip']}
const USERAGENTLENGTH=200
const getuseragent=req=>req.headers['user-agent'].substr(0,USERAGENTLENGTH)

module.exports={
    getipaddress
	, getuseragent
}

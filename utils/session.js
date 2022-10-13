const getipaddress=(req)=>{	return req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.headers['x-real-ip']}

module.exports={
    getipaddress
}
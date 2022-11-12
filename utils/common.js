const { SERVICE_NAME , SERVICE_NAME_NOSPACES } = require("../configs/configs");

const getobjtype=object=>{
    var stringConstructor = "test".constructor;
    var arrayConstructor = [].constructor;
    var objectConstructor = ({}).constructor;
    if (object === null) {
        return "null";
    }
    if (object === undefined) {      
      return "undefined";
    }
    if (object.constructor === stringConstructor) {      
      return "String";
    }
    if (object.constructor === arrayConstructor) {      
      return "Array";
    }
    if (object.constructor === objectConstructor) {      
      return "Object";
    }
    return null ;
  }
const { v4: uuidv4, v5: uuidv5 } = require("uuid");
const create_uuid_via_namespace = (str) => uuidv5(str, Array.from(Array(16).keys()));
const convaj = (arr, keyname, valuename) => {
  let jdata = {};
  arr.forEach((elem) => {
    jdata[elem[keyname]] = elem[valuename];
  });
  return jdata;
};
const generaterandomnumber =(min,max)=>{
	return + ( ((max- min) * Math.random() + min).toFixed(0) )
}
async function generaterefcode(uid, i = 0) {
  let code = String(crypto.createHash('md5').update(uid).digest('hex')).slice(
    i,
    i + 10
  );
  console.log(code);
	return code
/**  let findOne = await db['users'].findOne({ where: { referercode: code } });
  if (findOne) {
    console.log(i);
    return generateRefCode(uid, ++i);
  } else {
    return code;
  } */
}
const getstatsofarray = (arr) => {
  if (arr && arr.length) {
  } else {
    return null;
  }
	let    max = Math.max(...arr)
	let min = Math.min(...arr)
	let high = max
	let low = min
  return {
    open : arr[0]    ,
		high , //    max: Math.max(...arr),
    low , // min: Math.min(...arr),
    close : arr[arr.length-1]  //    average: getaverage(arr),  //  count: arr.length,
  };
};
const moment=require('moment')
const getunixtimemili = _=>moment().valueOf()
const getunixtimesec  = _=>moment().unix()

const generate_random_track_number =_=>{
	let str =  generaterandomhex(14)
	let pos0 = generaterandomnumber(3,5)
	let pos1 = generaterandomnumber(8,11)	
	return str.substr( 0, pos0 ) + '-' + str.substr( pos0, pos1 ) + '-' + str.substr(pos1)
}
const generaterandomhex=size=>[...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
const generaterandomusername =_=> `${SERVICE_NAME}#${generaterandomnumber ( 10_000_000 , 99_999_999 ) }` 
/////////////////////////////
module.exports={
    getobjtype 
	, create_uuid_via_namespace 
	, convaj 
	, generaterandomnumber 
	, generaterefcode
	, getstatsofarray
	, getunixtimemili 
  , getunixtimesec
	, uuidv4
	, uuidv5
	, generate_random_track_number 
	, generaterandomhex
	, generaterandomusername  
}


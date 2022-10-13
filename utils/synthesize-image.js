const sharp = require( 'sharp' )
const axios= require('axios')



const get_image_path = url=>{
	let filepath = url.replace ( 'https://options1.net' , '/var/www/html' )
	return filepath 
}
const XXXX_get_image_metadata = async url => {
	let resp = await axios({ url , responseType: "arraybuffer" })
	let input = resp.data 
	return input.toBuffer()
}
const XXXget_image_metadata= async url => { //    const url = "https://i0.wp.com/scanskill.com/wp-content/uploads/2022/02/An-Introduction-to-Python-Programming-Language.png?resize=768%2C432&ssl=1";
    const response = await axios.get(url, {
        responseType: "arraybuffer",
    });    // converts the arraybuffer to base64
    const buffer = Buffer.from(response.data, "base64");
    const metadata = await sharp(buffer).metadata();    //const metadata = await sharp(response.data).metadata();  //* Takes a little bit more time
	return metadata //    console.log(metadata);
};
const moment=require('moment')
const LOGGER=console.log
const { findone } = require('./db')
const { joinImages } = require('join-images' )

const synthesize_forex_pair_image=async ( base , quote ) => {
/**	let { urllogo : urllogo0 } = await findone ( 'forexcurrencies', { symbol: base } )
	if ( urllogo0  ) {}
	else { LOGGER('@!!! base currency invalid') ; return null }  
	let { urllogo : urllogo1 } = await findone ( 'forexcurrencies', { symbol: quote } )
	if (  urllogo1 ) {}
	else { LOGGER('@!!! quote currency invalid') ; return null }  
*/
	let { urllogorounded : urllogo0 } = await findone ( 'forexcurrencies', { symbol: base } )
	if ( urllogo0  ) {}
	else { LOGGER('@!!! base currency invalid') ; return null }  
	let { urllogorounded : urllogo1 } = await findone ( 'forexcurrencies', { symbol: quote } )
	if (  urllogo1 ) {}
	else { LOGGER('@!!! quote currency invalid') ; return null }  
	const timenow = moment().unix()
//	let img0 = await get_image_metadata ( urllogo0 ) 
	// let img1 = await get_image_metadata ( urllogo1 )
	let filenamebase = `${base}_${quote}-${timenow}.png` 
	let fileoutpath = `/var/www/html/resource/symbols/${filenamebase}`
	let urlout = `https://options1.net/resource/symbols/${filenamebase}` 
	let resp = await joinImages ( [ 
			get_image_path ( urllogo0 )
		, get_image_path(urllogo1 )
	]
		, { direction : 'horizontal' 
				, color : { alpha: 0, b: 255, g: 255, r: 255 }
				, offset : -250
			}
 	) 
		await resp.toFile ( fileoutpath )
	return urlout 
//	let img0 = sharp ( get_image_path ( urllogo0 ) ) 
//	let imgpath1 = get_image_path ( urllogo1 ) 	
	//return new Promise ( async (resolve,reject)=>{
//	 	img0.resize(100,100).composite ( [ { input: sharp(imgpath1).resize(50,50) } ] ).toFile( fileoutpath , err=>{
/**	 	img0.resize(200,200).composite ( [ { input: 
			await sharp(imgpath1 ).resize(100,100).toBuffer()
				, top: 0, left: 0, blend: 'over'
			} ] ).toFile( fileoutpath , err=>{
			if ( err) {LOGGER( '@err', err ) ; resolve ( null )  }
			else { resolve ( urlout ) }  
		})
	}) */
}
module.exports ={ synthesize_forex_pair_image }


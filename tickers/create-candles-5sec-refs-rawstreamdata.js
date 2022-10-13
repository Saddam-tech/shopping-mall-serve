
const {getstatsofarray } = require ( '../utils/common' ) 
const db=require( '../models')
// const dbstreams=require('../models-tickers')
const dbstreams=require('../models-streamer')
const cron = require( 'node-cron' )
const moment=require('moment')
const { Op} = db.Sequelize
const LOGGER=console.log
const PREC_VOLUME = 6
const get_candle_from_price_volume_arr =arr =>{
	let prices_ohlc = getstatsofarray ( arr.map( elem=> elem.price ) ) 
	let sumvolumes = arr.map( elem=> +elem.volume ).reduce ( (a,b)=> a+b, 0 )
	if(sumvolumes >0){ sumvolumes = sumvolumes.toFixed(PREC_VOLUME ) }  else {}
	return { ... prices_ohlc , volume :sumvolumes }
}
const getAssetSymbolList = async () => {
  let assetSymbolList = [];
  let resp = await db['assets'].findAll({
    where: { active: 1
		, group: { [Op.in]: [ 1, 2 ] } } 
		, APISymbol : { [Op.ne ] : null } 
		, raw: true,
  })
//.then((resp) => {
    resp.forEach ( (el) => {
      let { APISymbol, tickerSrc, id } = el;
			if ( APISymbol && APISymbol.length){} else { return }
      tickerSrc = tickerSrc.toUpperCase()
      assetSymbolList.push( { srcandsymbol : `${tickerSrc}:${APISymbol}` , symbol : APISymbol , APISymbol , id } );
    })
//  })
	return assetSymbolList //  let result = assetSymbolList   //LOGGER(result); //  return result
}
const MIN_TIME_WINDOW_LEN_IN_SEC = 5
const { bot : telbot }=require('../telbot/configs' )
let prevforexvolume = 0 
const create_candles= async ( timeend , listassets ) =>{
	let timestart = timeend - MIN_TIME_WINDOW_LEN_IN_SEC 
	listassets.forEach ( async elem => { // LOGGER(elem.APISymbol)
		if ( elem.APISymbol && elem.APISymbol.length ){}
		else { return }
//		let resppricevolume=		await db[ 'tickerrawstreamdata' ].findAll ( {
		let resppricevolume=		await dbstreams[ 'tickerrawstreamdata' ].findAll ( {
				raw : true
			, attributes : ['price', 'volume' ]
			, where : { 
					timestamp : {
						[ Op.gte ] : timestart ,
						[ Op.lt ] :  timeend
					} //			, where : { timestamp : {  [Op.between] :  [ timestart , timeend ] } 
				, symbol : elem.APISymbol
			} 
		})
		let { APISymbol : symbol , id : assetId } = elem
		if	( symbol == 'BTCUSDT' || symbol == 'ETHUSDT' ) { LOGGER( '@resppricevolume' , resppricevolume?.length , symbol ) }
		if ( resppricevolume && resppricevolume.length ) {
			let jcandledata = get_candle_from_price_volume_arr ( resppricevolume )
			db[ 'tickercandles' ].create ( { 
				symbol // : ''
				, assetId // : '' 
				, timestamp : timestart
				, ... jcandledata
				, timestamp1 : timeend
				, timelengthinsec : timeend - timestart
			} )
		} else { // create a null point with timepoint
			db[ 'tickercandles' ].create ({
				symbol // : ''
				, assetId // : '' 
				, timestamp : timestart //				, ... jcandledata
				, timestamp1 : timeend
				, timelengthinsec : timeend - timestart
			})	
		}
		let ntrades = resppricevolume?.length
		if ( symbol == 'BTCUSDT' && ntrades == 0 ) {
        telbot.sendMessage(          -1001775593548,        `[socket off]:\n${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} , ${moment().unix()}`)
		}
		if ( false && symbol == 'EUR/USD' && ntrades > 0 && prevforexvolume == 0 ) {
        telbot.sendMessage(          -1001775593548,        `[forex on]:\n${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} , ${moment().unix()}`)
				prevforexvolume = ntrades 
		}
		if ( false && symbol == 'EUR/USD' && ntrades == 0 && prevforexvolume > 0 ){
        telbot.sendMessage(          -1001775593548,        `[forex off]:\n${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} , ${moment().unix()}`)
				prevforexvolume = ntrades 
		} 
	} )
}
/** const cr on = require( 'node-cr on' )
const main_02=async _=>{
	cr on.schedule('0 * * * * *', async () => {
		let idx = 11
		let hinterval = setInterval ( async _=>{
			let timenow = moment().startOf('second').unix()	
			LOGGER( `@call create candles ${timenow}, ${idx}` )
			let listassets = await getAssetSymbolList ()
//			setTimeout (_=>{ 
				create_candles( timenow , listassets )
				if ( --idx == 0 ){ clearInterval ( hinterval ) }
//			})
		} , 5000 ) 
	} )
}
false && main_02()
*/ 
const main=_=>{
	cron.schedule( '*/5 * * * * *' , async _=>{
//	cr on.schedule( '0-59/5 * * * * *' , async _=>{
//	cr on.schedule( '* * * * * *' , async _=>{
		let timenow = moment().startOf('second').unix()	
		let listassets = await getAssetSymbolList ()
		LOGGER( `@call create candles ${timenow}` )
		setTimeout (_=>{ 
			create_candles( timenow , listassets )
		} , 3000 ) 
	})
}
true && main()

/** tickercandles order by id desc limit 5 ;
| id    | createdat           | updatedat | symbol   | price       | assetId | timestamp  | open        | high     | low      | close       | volume | timestamp1 | timelengthinsec |
+-------+---------------------+-----------+----------+-------------+---------+------------+-------------+----------+----------+-------------+--------+------------+-----------------+
| 11044 | 2022-09-01 04:54:02 | NULL      | BTCUSDT  | 20078.32000 |       1 | 1662008040 | 20076.49000 | 20078.32 | 20076.49 | 20078.32000 | NULL   |       NULL |            NULL |
| 11043 | 2022-09-01 04:54:02 | NULL      | ALGOUSDT | 0.28880     |      30 | 1662008040 | 0.28880     | 0.2888   | 0.2888   | 0.28880     | NULL   |       NULL |            NULL |
| 11042 | 2022-09-01 04:54:02 | NULL      | BNBUSDT  | 278.10000   |      35 | 1662008040 | 278.10000   | 278.1    | 278.1    | 278.10000   | NULL   |       NULL |            NULL |
| 11041 | 2022-09-01 04:54:02 | NULL      | 0004     | 28.85       |      39 | 1662008040 | 28.85       | 28.85    | 28.85    | 28.85       | NULL   |       NULL |            NULL |
| 11040 | 2022-09-01 04:54:02 | NULL      | EUR/NZD  | 1.64579     |      40 | 1662008040 | 1.64580     | 1.6458   | 1.64579  | 1.64579     | NULL   |       NULL |            NULL |
*/

/** 
| id     | createdat           | updatedat | timestampmili | timestamp  | symbol  | assetid | price       | volume  |
+--------+---------------------+-----------+---------------+------------+---------+---------+-------------+---------+
| 408275 | 2022-09-01 04:37:33 | NULL      | 1662007053377 | 1662007053 | ETHUSDT |    NULL | 1553.21000  | 0.2323  |
| 408274 | 2022-09-01 04:37:33 | NULL      | 1662007053307 | 1662007053 | BNBUSDT |    NULL | 277.90000   | 0.359   |
| 408273 | 2022-09-01 04:37:33 | NULL      | 1662007053187 | 1662007053 | BNBUSDT |    NULL | 277.80000   | 0.347   |
| 408272 | 2022-09-01 04:37:33 | NULL      | 1662007053127 | 1662007053 | ETHUSDT |    NULL | 1553.22000  | 0.2493  |
| 408271 | 2022-09-01 04:37:33 | NULL      | 1662007053112 | 1662007053 | BTCUSDT |    NULL | 20064.69000 | 0.02433 |
*/

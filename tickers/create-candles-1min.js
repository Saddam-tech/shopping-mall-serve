
// const {getstatsofarray } = require ( '../utils/common' ) 
const db=require( '../models')
let dbtickers  = require('../models-tickers')
let dbstreams = require( '../models-streamer')
const { IPADDRESS_MY } =require('../configs/configs') 
// const cron = require( 'node-cron' )
const moment=require('moment')
const { Op} = db.Sequelize
const LOGGER=console.log
const PREC_VOLUME = 6
const ISFINITE = Number.isFinite
/** const get_candle_from_price_volume_arr =arr =>{
	let sumvolumes = arr.map( elem=> ISFINITE(+elem.volume) ? +elem.volume : 0 ).reduce ( (a,b)=> a+b, 0 )
	let high=-1*10**6,low=+1*10**9,open,close 
	for ( let idx=0;idx<arr.length;idx ++ ) {
		if ( + arr[ idx ].high > high ) { high = + arr[ idx ].high } else {}
		if ( + arr[ idx ].low < low ) { low = + arr[ idx ].low } else {}
		if ( isNaN ( + open )  ) { open = arr[ idx ].open }  else {}
		if ( isNaN ( + close)  ) { close= arr[ idx ].close} else {}
//		if ( isNaN ( + open ) && ISFINITE ( + arr[ idx ].open ) ) { open = arr[ idx ].open }  else {}
	//	if ( isNaN ( + close) && ISFINITE ( + arr[ idx ].close) ) { close= arr[ idx ].close} else {}
	}
	if(sumvolumes >0){ sumvolumes = sumvolumes.toFixed(PREC_VOLUME ) }  else {}
	return { open , high, low , close , volume :sumvolumes }
} */
const { get_candle_from_price_volume_arr } =require('./utils') 

const getAssetSymbolList = async () => {
  let assetSymbolList = [];
  let resp = await db['assets'].findAll({
    where: { active: 1
		, group: { [Op.in]: [ 1, 2 ] } } 
		, APISymbol : { [Op.ne ] : null } 
		, raw: true,
  }) //.then((resp) => {
    resp.forEach ( (el) => {
      let { APISymbol, tickerSrc, id } = el;
			if ( APISymbol && APISymbol.length){} else { return }
      tickerSrc = tickerSrc.toUpperCase()
      assetSymbolList.push( { srcandsymbol : `${tickerSrc}:${APISymbol}` , symbol : APISymbol , APISymbol , id } );
    }) //  })
	return assetSymbolList //  let result = assetSymbolList   //LOGGER(result); //  return result
}
const MIN_TIME_WINDOW_LEN_IN_SEC = 60
const { bot : telbot }=require('../telbot/configs' )
// let prevforexvolume = 0 
const create_candles= async ( timeend , listassets ) =>{
	let timestart = timeend - MIN_TIME_WINDOW_LEN_IN_SEC 
//	let dblocal = dbstreams // dbtickers
	let dblocal = db
	listassets.forEach ( async elem => { // LOGGER(elem.APISymbol)
		if ( elem.APISymbol && elem.APISymbol.length ){}
		else { return }
		let { APISymbol : symbol , id : assetId } = elem
		let arrelemcandles=		await dblocal [ 'tickercandles' ].findAll ( {				raw : true
//			, attributes : [ 'close', 'volume' ]
			, where : { 
					timestamp : {
						[ Op.gte ] : timestart ,
						[ Op.lte ] :  timeend
					} //			, where : { timestamp : {  [Op.between] :  [ timestart , timeend ] } 
				, symbol // : elem.APISymbol
			} 
				, order : [ [ 'timestamp' , 'ASC' ]] // DESC' ] ]
		})
		if	( symbol == 'BTCUSDT' || symbol == 'ETHUSDT' ) { LOGGER( '@arrelemcandles' , arrelemcandles?.length , symbol ) }
		if ( arrelemcandles && arrelemcandles.length ) {
			let jcandledata = get_candle_from_price_volume_arr ( arrelemcandles )
			await db[ 'tickercandles' ].create ( { 
				symbol // : ''
				, assetId // : '' 
				, timestamp : timestart
				, ... jcandledata
				, timestamp1 : timeend
				, timelengthinsec : timeend - timestart
			} )
		} else { // create a null point with timepoint
			await db[ 'tickercandles' ].create ({
				symbol // : ''
				, assetId // : '' 
				, timestamp : timestart //				, ... jcandledata
				, timestamp1 : timeend
				, timelengthinsec : timeend - timestart
			})	
		}
/**		let ntrades = arrelemcandles?.length
		if ( symbol == 'BTCUSDT' && ntrades == 0 ) {
        telbot.sendMessage(          -1001775593548,        `[so cket off]:\n${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} , ${moment().unix()}`)
		}
		if ( false && symbol == 'EUR/USD' && ntrades > 0 && prevforexvolume == 0 ) {
        telbot.sendMessage(          -1001775593548,        `[forex on]:\n${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} , ${moment().unix()}`)
				prevforexvolume = ntrades 
		}
		if ( false && symbol == 'EUR/USD' && ntrades == 0 && prevforexvolume > 0 ){
        telbot.sendMessage(          -1001775593548,        `[forex off]:\n${moment().format('YYYY-MM-DD HH:mm:ss.SSS')} , ${moment().unix()}`)
				prevforexvolume = ntrades 
		} */ 
	} )
}
const cron = require( 'node-cron' )

const main=_=>{
	cron.schedule( '0 * * * * *' , async _=>{ //	cron.schedule( '0-59/5 * * * * *' , async _=>{ //	cron.schedule( '* * * * * *' , async _=>{
		let timenow = moment().startOf('second').unix()	
		setTimeout ( async _=>{
			let listassets = await getAssetSymbolList ()
			LOGGER( `@call create candles ${timenow}` )
			setTimeout (_=>{
				create_candles( timenow , listassets )
			} , 2700 )
		})
	})
}
true && main()

/** ticker candles order by id desc limit 5 ;
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

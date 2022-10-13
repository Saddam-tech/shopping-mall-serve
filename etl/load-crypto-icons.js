
let db = require('../models')
const LOGGER=console.log
let { countrows_scalar , findone
	, createrow
  } = require( '../utils/db')
let pathtoicons= '/home/ubuntu/cryptocurrency-icons/svg/color'
let pathtomanifest='/home/ubuntu/cryptocurrency-icons/manifest.json'
const fs=require('fs')
const { create_uuid_via_namespace }=require('../utils/common')
const moment=require('moment')
let countwritten = 0
const { Op } =db.Sequelize
const main=async _=>{

	let m0 = moment()
	let buf =fs.readFileSync ( pathtomanifest ) 
	false &&	LOGGER( buf.toString() )
	let jmanifest = JSON.parse (  buf.toString() )
	LOGGER ( jmanifest ) 
//	return 
	let list = fs.readdirSync ( pathtoicons)
	LOGGER( list ) 
	list.forEach ( async elem=> {
		let [ fbase , fext ] = elem.split ( '.')
		fbase=fbase.toUpperCase()
		let respfind = await findone ( 'assets' , { group: 1 , symbol: { [Op.like] : `${fbase}_%`} }  )
		if ( respfind ) { return }
		else {}
		await createrow ( 'assets' , { symbol : `${fbase}_USDT` ,
			name : jmanifest [ fbase ] ,
			baseAsset : fbase ,
			targetAsset : 'USDT' ,
			tickerSrc : 'Binance' ,
			group  : 1, 
			groupstr: 'coin' ,
			uuid : create_uuid_via_namespace ( fbase ) ,
			imgurl : `https://options1.net/resource/cryptologos/${elem}` , 
			dispSymbol : `${fbase}USDT` ,
			APISymbol : `${fbase}USDT` ,
			active : 0 ,
			socketAPISymbol : `${fbase}USDT` ,
			groupactive : 1 ,
		
		})
		countwritten ++
	})
	let m1 = moment()
	LOGGER( '@done',  m1-m0 , 'msec' , countwritten ) 
}
main()

/** | dispSymbol | APISymbol | active | socketAPISymbol | currentPrice | groupactive | imgurl02 |
-----------+-----------+--------+-----------------+--------------+-------------+----------+
BTCUSDT    | BTCUSDT   |      1 | BTCUSDT         | NULL         |           1 | NULL     |
*/

/**{ symbol: 'BTC', name: 'Bitcoin', color: '#f7931a' },
*/
/** id | createdat           | updatedat           | name    | symbol   | baseAsset | targetAsset | tickerSrc | group | groupstr | uuid                                 | imgurl                                               | dispSymbol | APISymbol | active | socketAPISymbol | currentPrice | groupactive | imgurl02 |
+----+---------------------+---------------------+---------+----------+-----------+-------------+-----------+-------+----------+--------------------------------------+------------------------------------------------------+------------+-----------+--------+-----------------+--------------+-------------+----------+
|  1 | 2022-06-03 05:57:30 | 2022-09-04 16:13:22 | Bitcoin | BTC_USDT | BTC       | USDT        | Binance   | 1     | coin     | ec97a519-e311-11ec-803f-0a03fa82da02 | https://s1.bycsi.com/assets/image/coins/dark/btc.svg | BTCUSDT    | BTCUSDT   |      1 | BTCUSDT         | NULL         |           1 | NULL     |
*/

const cron = require('node-cron');
const db = require('../models');
const cliredisa = require('async-redis').createClient();
const moment = require('moment');
let { Op } = db.Sequelize

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
/** ticker candles
  symbol    | varchar(50) 
| price     | varchar(40) 
| assetId   | int(11) unsi
| timestamp | varchar(20) 
| open      | varchar(40) 
| high      | varchar(40) 
| low       | varchar(40) 
| close     | varchar(40) 
| volume    | varchar(40)
*/
const make1MinCandle = async ( timeend ) => { //  let now_unix = moment().unix()
	let timelengthinsec = 60
	let timestart = timeend - timelengthinsec // .a dd(60 , 'seconds')
  await db['assets']
    .findAll({
      where: { active: 1 },
      raw: true,
    })
    .then(async (resp) => {
      resp.forEach ( async (el) => {
        let { APISymbol, id } = el;
				if ( APISymbol ) {}
				else { return null  }
  			let list = await db['tickerprice' ].findAll ( {
						raw : true 
						, where : { symbol : APISymbol 
							,  timestamp : {[ Op.between ] : [ timestart , timeend ] } 
						}
						, attributes : [ 'price' ]
						, order : [ [ 'timestamp' , 'ASC' ] ]
				} )
				list = list.map( elem => elem.price )
				let jstats = getstatsofarray ( list ) 
				jstats && db[ 'tickercandles' ].create({
					timestamp : timestart
					, timestamp1 : timeend
					, timelengthinsec  
					, symbol : APISymbol
					, price : jstats['close' ]
					, assetId : id
					, ... jstats 
				})
      });
      // await Promise.all(promises);
    });
};

cron.schedule('0 * * * * *', async () => {
	setTimeout (_=>{  	console.log('@make1MinCandle');
		let timenow = moment().startOf('minute').unix()	
		let timeend =timenow
	  make1MinCandle( timeend );
	} , 1500 )
});
/** tickercandles 
| id    | createdat           | updatedat | symbol   | price      | assetId | timestamp  | open       | high    | low     | close      | volume | timestamp1 | timelengthinsec |
+-------+---------------------+-----------+----------+------------+---------+------------+------------+---------+---------+------------+--------+------------+-----------------+
| 12210 | 2022-09-01 06:41:02 | NULL      | USD/JPY  | 139.34600  |       5 | 1662014460 | 139.34600  | 139.346 | 139.346 | 139.34600  | NULL   |       NULL |            NULL |
| 12209 | 2022-09-01 06:41:02 | NULL      | BNBUSDT  | 277.40000  |      35 | 1662014460 | 277.40000  | 277.4   | 277.4   | 277.40000  | NULL   |       NULL |            NULL |
| 12208 | 2022-09-01 06:41:02 | NULL      | USD/CAD  | 1.31698    |       7 | 1662014460 | 1.31698    | 1.31698 | 1.31698 | 1.31698    | NULL   |       NULL |            NULL |
| 12207 | 2022-09-01 06:41:02 | NULL      | USD/CHF  | 0.97951    |       8 | 1662014460 | 0.97951    | 0.97951 | 0.97951 | 0.97951    | NULL   |       NULL |            NULL |
| 12206 | 2022-09-01 06:41:02 | NULL      | ALGOUSDT | 0.28760    |      30 | 1662014460 | 0.28760    | 0.2876  | 0.2876  | 0.28760    | NULL   |       NULL |            NULL |
*/
/** 
  symbol    | varchar(50)         | YES  |     | NULL                |                               |
| price     | varchar(40)         | YES  |     | NULL                |                               |
| assetId   | int(11) unsigned    | YES  |     | NULL                |                               |
| timestamp | bigint(20)  */
// CREATE TABLE `tickercandles` (
//   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `symbol` varchar(50) DEFAULT NULL,
//   `price` varchar(40) DEFAULT NULL,
//   `assetId` int(11) unsigned DEFAULT NULL,
//   `timestamp` varchar(20) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// )
/**      let price = await cliredisa.hget('STREA M_ASSET_PRICE', APISymbol);
        if(price) {
          db['tickercandles'].create({
            symbol: APISymbol,
            price: price,
            assetId: id,
            timestamp: now_unix
          });
        }
*/


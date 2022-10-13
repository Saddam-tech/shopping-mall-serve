const WebSocket = require("ws");
const cron = require("node-cron");
const db = require("../models");
const { Op } = db.Sequelize;
// const socket = new WebSocket('wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0');
/* const finnhubSocket = new WebSocket(
  "wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0"
); */
const moment = require("moment");
// const clir edisa = require("async-redis").createClient();
const LOGGER = console.log;
const { bot : telbot }=require('../telbot/configs' )
const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 3600; // == 60 min , 600
// const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 2700; // == 45 min , 600
// const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 1800; // == 30 min , 600
// const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 300; // == 5 min , 600
const periodic_cleaner = async (_) => {
  let timenow = moment().unix();
  let time0 = timenow - TIMEWINDOW_TO_RETAIN_DATA_IN_SEC;
  LOGGER(`@deleting old tickercandles`);

	try{ let	transaction = await db.sequelize.transaction();
//		await db[ 'tickercandles'].destroy ( { where : { timestamp :{ [Op.lt ]: time0 },		timelengthinsec : { [Op.in] : [1, 5] }}} , { transaction } )
		await db[ 'tickercandles'].destroy ( { where : { timestamp :{ [Op.lt ]: time0 },		timelengthinsec : 1 }} , { transaction } )
		await db[ 'tickercandles'].destroy ( { where : { timestamp :{ [Op.lt ]: time0 },		timelengthinsec : 5 }} , { transaction } )
		 await transaction.commit()
	} catch (err){
		LOGGER( err) 
	}
	if ( false ){  await db["tickercandles"].destroy( {    where: { timestamp: { [ Op.lt ]: time0 } },		timelengthinsec : 5   }); 	await db["tickercandles"].destroy( {    where: { timestamp: { [ Op.lt ]: time0 } },		timelengthinsec : 1   });
	} //  LOGGER(`@deleting old tickerrawstreamdata `); //  await db["tickerrawstreamdata"].destroy( {    where: { timestamp: { [ Op.lt ]: time0 } },  });
};
cron.schedule("9 * * * * *", (_) => {  // a little delay from
  periodic_cleaner();
});

/**tickercandles;
+-----------------+---------------------+------+-----+---------------------+-------------------------------+
| Field           | Type                | Null | Key | Default             | Extra                         |
+-----------------+---------------------+------+-----+---------------------+-------------------------------+
| id              | int(10) unsigned    | NO   | PRI | NULL                | auto_increment                |
| createdat       | datetime            | YES  |     | current_timestamp() |                               |
| updatedat       | datetime            | YES  |     | NULL                | on update current_timestamp() |
| symbol          | varchar(50)         | YES  | MUL | NULL                |                               |
| price           | varchar(40)         | YES  |     | NULL                |                               |
| assetId         | int(11) unsigned    | YES  |     | NULL                |                               |
| timestamp       | bigint(20) unsigned | YES  | MUL | NULL                |                               |
| open            | varchar(40)         | YES  |     | NULL                |                               |
| high            | varchar(40)         | YES  |     | NULL                |                               |
| low             | varchar(40)         | YES  |     | NULL                |                               |
| close           | varchar(40)         | YES  |     | NULL                |                               |
| volume          | varchar(40)         | YES  |     | NULL                |                               |
| timestamp1      | bigint(20) unsigned | YES  |     | NULL                |                               |
| timelengthinsec | int(10) unsigned    | YES  | */

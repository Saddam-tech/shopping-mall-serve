
// const { watchTokenTransfers : watchtx01 } = require( './depositListener_binance_mainnet_01' )
// const { watchTokenTransfers : watchtx02 } = require( './depositListener_binance_mainnet_02' )
// const { watchTokenTransfers : watchtx01 } = require( './dplistener_binance_mainnet_01' )
// const { watchTokenTransfers : watchtx02 } = require( './dplistener_binance_mainnet_02' )

// let fptrs = [ watchtx01 , watchtx02 ]
const db=require('../models')
const exec = require('child_process').exec;

const TIMEDELTA_THRESH_TO_CALL_DEAD = 10 * 1000
const PERIOD_SAMPLING = 12 * 1000
const { redisconfig } = require( '../configs/redis.conf' )
const cliredisa = require ( 'async-redis').createClient ( redisconfig ) 
const TXRECEIVER_IDS=[ 1, 2]
const moment=require('moment')
const LOGGER=console.log

const main =async _=>{
	let timenow = moment().unix()
	for ( let idxinst = 0; idxinst < TXRECEIVER_IDS.length ; idxinst ++ ) {
		let instanceid = TXRECEIVER_IDS [ idxinst ]
		let resp = await cliredisa.hget( 'TX_EVT_RX' , instanceid )
		if ( resp ) {
			let timedelta = timenow - +resp 
			if ( timedelta > TIMEDELTA_THRESH_TO_CALL_DEAD ) { //				fptrs [ idxinst ] ()
				if ( idxinst == 0 ) { LOGGER(`@@restart dpl-01`) // watchtx01 () 
					exec ( `pm2 restart dplistener_binance_mainnet_01` )
				}
	else	if ( idxinst == 1 ) { LOGGER(`@@restart dpl-02`)// watchtx02 () 
					exec ( `pm2 restart dplistener_binance_mainnet_02` )
	}	
				db[ 'logcrashes' ].create ( {
					instanaceid : instanceid 
					,  type : 'DEAD'  //					,  `timestamp` bigint(20) unsigned DEFAULT unix_timestamp(),
					,  instancetype : 'TX',
				})
			}
			else {}  
		 }
		else { //fptrs [ idxinst ] ()
			continue
			if ( idxinst == 0 ) { LOGGER(`@@restart dpl-01`)// watchtx01 () 
					exec ( `pm2 restart dplistener_binance_mainnet_01` )
			}
			else	if ( idxinst == 1 ) { LOGGER(`@@restart dpl-02`)// watchtx02 () 
					exec ( `pm2 restart dplistener_binance_mainnet_02` )
			}	
	}
	}
}
setTimeout ( _=> {
	setInterval ( _=> {
		main()
	} , PERIOD_SAMPLING )
} , 20 * 1000 )

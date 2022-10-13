///////////////////////////////// telegram /////////////////////////////////
/** const TelegramBot = require('node-telegram-bot-api');
const token = '5476345761:AAHu7pgjWdMFXZF-FvugQI3pM9t12FWI3Rw';
const bot = new TelegramBot(token);
const bot_option = true; */
///////////////////////////////// telegram /////////////////////////////////
const PREC_VOLUME = 6;
var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype } = require("../utils/common");
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/authMiddleware");
const db = require("../models");
const dbstreams = require("../models-streamer");
const { lookup } = require("geoip-lite");
var moment = require("moment");
const e = require("express");
const LOGGER = console.log;
let { Op } = db.Sequelize;
// const cliredisa = require('async-redis').createClient();
const { ASSETID_REDIS_SYMBOL } = require("../utils/ticker_symbol");
// const ASSETID_REDIS_SYMBOL = [
//   '__SKIPPER__',
//   'btcusdt',
//   'ethusdt',
//   'xrpusdt',
//   'EUR/USD',
//   'USD/JPY',
//   'GBP/USD',
//   'USD/CAD',
//   'USD/CHF',
// ];
var router = express.Router();
const { create_uuid_via_namespace } = require("../utils/common");
const STRINGER = JSON.stringify;

const sha256 = require("js-sha256");
let MAP_CANDLE_TIMEWINDOW_LEN = {
  5000: 1, // 5s
  10000: 1, // 10s
  30000: 1, // 30s
  60000: 1, // 1m
  300000: 1, // 5m
  1800000: 1, // 30m
  3600000: 1, // 1h
  14400000: 1, // 4h
  86400000: 1, // 24h
  //  84 400000 : 1 , // 24h

  5: 1, // 5s
  10: 1, // 10s
  30: 1, // 30s
  60: 1, // 1m
  300: 1, // 5m
  1800: 1, // 30m
  3600: 1, // 1h
  14400: 1, // 4h
  86400: 1, // 24h
  //  84 400 : 1 , // 24h
};
const MAP_BARSIZE_TIMELENGTHINSEC = {
//  5: 5, // 5s
  5: 1, // 5s
  10: 5, // 10s
  30: 5, // 30s
	60 : 5 ,
//  60: 60, // 1m
  300: 60, // 5m
  1800: 60, // 30m
  3600: 60, // 1h
  14400: 60, // 4h
  86400: 60, // 24h
  //  84 400 : 60 , // 24h
};
const normalize_timepoint = (timepoint, barsize) => {
  //	barsize = +barsize/ 1000 // in seconds
  timepoint -= timepoint % barsize;
  return timepoint;
};
const ISFINITE=Number.isFinite
const aggregate_candles_in_subinterval = (arr, timestamp, timestamp1) => {
  // assume sorted in time order asc
  if (arr && arr.length) {
  } else {
    return null;
  }
  let { open, timestamp: timestamp_local } = arr[0];
  let { close, timestamp1: timestamp1_local } = arr[arr.length - 1];
  let high = Math.max(...arr.map((elem) => +elem.high));
  let low = Math.min(...arr.map((elem) => +elem.low));
  let volume = arr
    .map((elem) => +elem.volume)
    .reduce((a, b) => a + b, 0)
    .toFixed(PREC_VOLUME);
	let arr4pts = [ +open , +high , +low, +close ] 
	let arrfinites = arr4pts.filter ( elem => ISFINITE ( elem ) && elem>0 )
	let jdata 
	if (arrfinites.length ) {
		let replaceelem = arrfinites.reduce ( (a,b)=>a+b, 0 ) / arrfinites.length 
  	jdata = {
    	open : ISFINITE( +open) && +open>0? open :replaceelem ,
	    high : ISFINITE( +high ) && +high>0? high :replaceelem,
  	  low : ISFINITE ( +low ) && +low>0 ? low :replaceelem,
    	close : ISFINITE ( +close) && +close>0 ? close :replaceelem,
	    volume,
    //		, timestamp // : ''
    //	, timestamp1 // : ''
  	  starttime: timestamp,
	    endtime: timestamp1, show : true
  	};
	  false && LOGGER(`@jdata`,  STRINGER( jdata) );
	} else {
		jdata = { open:null,high:null,low:null,close:null,volume:null,  	  starttime: timestamp,	    endtime: timestamp1, show : false
	 } 
	}
  return jdata;
};
const get_candles = async (jargs) => {
  let { APISymbol, barsize, time0, time1, N } = jargs; //	let time0unix = moment( time0).unix() //let time1unix = moment( time1).unix()
  let time0unix = time0;
  let time1unix = time1;
  let timedelta01 = time1unix - time0unix;

  let dblocal;
  if (barsize > 30) {
    dblocal = db;
  } else {
    dblocal = db // streams;
  }
  let resplist = await dblocal["tickercandles"].findAll({
    raw: true,
    where: {
      symbol: APISymbol,
      timestamp: {
        [Op.gte]: time0unix,
        [Op.lt]: time1unix,
      },
      //			, timestamp : { 	[ Op.between ] : [ time0unix , time1unix ] }
      timelengthinsec: MAP_BARSIZE_TIMELENGTHINSEC[barsize],
    },
    order: [["id", "ASC"]],
  });
  //	LOGGER( `@resplist` , resplist ) // .length
  LOGGER(`@resplist`, resplist.length); // .length
  let aaidx_datapoints = [];
  resplist.forEach(async (elem) => {
    let { timestamp } = elem;
    let idx = (N * (timestamp - time0unix)) / timedelta01;
    idx = parseInt(idx);
    if (aaidx_datapoints[idx]) {
      aaidx_datapoints[idx].push(elem);
    } else {
      aaidx_datapoints[idx] = [];
      aaidx_datapoints[idx][0] = elem;
    }
  });
  let aggregated_points = [];
  aaidx_datapoints.forEach((arr_dp, idx) => {
    let timestamp = time0 + idx * barsize; // : ''
    let timestamp1 = time0 + (idx + 1) * barsize; // : ''
    if (arr_dp && arr_dp.length) {
      aggregated_points[idx] = aggregate_candles_in_subinterval(
        arr_dp,
        timestamp,
        timestamp1
      );
    } else {
      //				let timestamp = time0 + idx * barsize // : ''
      //			let timestamp1 = time0 + ( idx + 1 ) * barsize // : ''
      aggregated_points[idx] = {
        open: null,
        high: null,
        low: null,
        close: null,
        volume: null,
        //				, timestamp // : time0 + idx * barsize // : ''
        //			, timestamp1 // : time0 + ( idx + 1 ) * barsize // : ''
        starttime: timestamp,
        endtime: timestamp1,
				show : false
      };
    }
  });
  return aggregated_points;
};
router.get("/", async (req, res) => {
//  let { symbol,  barsize, N = 10, time0, time1 } = req.query;
  let { symbol, barSize: barsize, N = 10, time0, time1 } = req.query;
  LOGGER('@querystr'  ,req.query);
  if (MAP_CANDLE_TIMEWINDOW_LEN[barsize]) {
  } else {
    resperr(res, "BAR-SIZE-NOT-OF-SUPPORTED-VALUE");
    return;
  }
  barsize = +barsize / 1000; // in seconds
  if (symbol) {
  } else {
    resperr(res, "ARG-MISSING ", null, { reason: "symbol" });
    return;
  }
  let timenow = moment().unix();
  if (time1) {
    time1 = normalize_timepoint(time1, barsize);
  } else {
    time1 = normalize_timepoint(timenow, barsize);
  }
  if (N >= 5) {
  } else {
    N = 5;
  }
  time0 = time1 - barsize * N;
  LOGGER(`@time1 , time0`, time1, time0);
  let APISymbol = symbol;
  let list = await get_candles({ APISymbol, barsize, time0, time1, N });
  false &&
    LOGGER(`@list`, list[0], list[list.length - 1], list.length, {
      time0,
      time1,
    });
  respok(res, null, null, { list, time0, time1, N });
  //	if ( time0 ) {		}
});

module.exports = router;

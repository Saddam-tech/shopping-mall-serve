const db = require("../models");
// const dbs treams = require("../models-tickers");
const dbstreams = require("../models-streamer");
// const db1secsrc = require('../models-tickers' ) //
let db1secsrc; // = require('../models-streamer' ) //
let db5secsrc;
const moment = require("moment");
// const getunixtimemili = _=>moment().valueOf()
// const getunixtimesec  = _=>moment().unix()
const { getunixtimemili, getunixtimesec } = require("../utils/common");
const LOGGER = console.log;
const { findall } = require("./db");
const { Op } = db.Sequelize;
const { redisconfig } = require("../configs/redis.conf");
const cliredisa = require("async-redis").createClient(redisconfig);
const ISFINITE = Number.isFinite;
/** const init = async (_) => {
  let { value } = await db["settings"].findOne({
    raw: true,
    where: { name: "USE_1SEC_TICKER_MODEL", active: 1 },
  });
  if (value) {
    db1secsrc = require("../" + value);
  } else {
    db1secsrc = require("../models-streamer");
  }

  let { value: value02 } = await db["settings"].findOne({
    raw: true,
    where: { name: "USE_5SEC_CANDLES_MODEL", active: 1 },
  });
  if (value02) {
    db5secsrc = require("../" + value02);
  } else {
    db5secsrc = require("../models-streamer");
  }
  false && LOGGER("@init", db1secsrc, db5secsrc);
}; // ( 'USE_1SEC_TICKE R_MODEL' , 'db-tickers')
init();
*/
const get_latest_tickers_redis=async _=>{
	return await cliredisa.hgetall ( 'STREAM_ASSET_PRICE' );
}
const get_latest_ticker_redis = async ({ symbol }) => {
  return await cliredisa.hget("STREAM_ASSET_PRICE", symbol);
};
const get_stats_of_asset_proper = async ({ symbol }) => {
  let dblocal = db;
  //	let close = await get_latest_ticker_price_not_null ( {symbol } )
  //	let tickerprice24hago = await get_closest_24h_tickerprice ( { symbol } )
  let close = await get_latest_ticker_redis({ symbol });
  let tickerprice24hago = await get_24h_tickerprice_redis({ symbol });
  let change;
  tickerprice24hago = +tickerprice24hago;
  if (ISFINITE(+close) && ISFINITE(tickerprice24hago)) {
    //	{ change = +close - tickerprice24hago } // diff
    change = (100 * (+close - tickerprice24hago)) / tickerprice24hago;
    change = change.toFixed(2);
  }
  return { close, change, currentprice: close };
};
const get_time_closest_ticker = async ({
  symbol,
  reftimepointsec,
  output_is_object_or_scalar,
  timelengthinsec,
}) => {
  //	db['ticke rcandles'].findAll ( { raw: true		, where : { symbol } 		, order : [ [] ]		})
  let dblocal;
  switch ("" + timelengthinsec) {
    case "1":
      dblocal = db1secsrc;
      LOGGER(`@sel 1secsrc`);
      break;
    case "5":
      dblocal = db5secsrc;
      LOGGER(`@sel 5secsrc`);
      break;
    default:
      dblocal = db;
      LOGGER(`@sel localdb`);
      break;
  }
  let list = await dblocal.sequelize.query(
    `select * from tickercandles where symbol='${symbol}' and timelengthinsec=${timelengthinsec} and close is not null order by abs(${reftimepointsec} - timestamp) asc limit 1`
  );
  //	let list = await dblocal.sequelize.query (`select * from ticke rcandles where symbol='${symbol}' and timelengthinsec=${timelengthinsec} order by abs(${reftimepointsec} - timestamp) asc limit 1`)
  //	let list = await dblocal.sequelize.query (`select * from ticke rcandles where symbol='${symbol}' order by abs(${reftimepointsec} - timestamp) asc limit 1`)
  if (list && list[0] && list[0][0]) {
    if (output_is_object_or_scalar == "object") {
      return list[0][0];
    } else {
      return list[0][0].close;
    }
  } else if (true) {
    let price = await cliredisa.hget("STREAM_ASSET_PRICE", symbol);
    return price;
  } else {
    let resp = await dblocal.sequelize.query(
      `select * from tickerrawstreamdata order by abs(${reftimepointsec} - timestamp) asc limit 1`
    );
    if (resp && resp[0] && resp[0][0]) {
      if (output_is_object_or_scalar == "object") {
        return resp[0][0];
      } else {
        return resp[0][0].price;
      }
    } else {
      return null;
    }
  }
};
const get_valid_tickers_with_min_timediff_from_reftime = async ({
  reftimepointsec,
  reftimepointseccalendar,
  timedeltarequiredsec,
}) => {
  let listassets = await findall("assets", {
    // this should not matter a lot , since the base table will be here
    // acti ve: 1,
		[ Op.or ] : [ { activereel : 1 } , { activebet : 1 } ] , 
    APISymbol: { [Op.ne]: null },
  });
  let aproms = [];
  if (reftimepointseccalendar) {
    reftimepointsec = moment(reftimepointseccalendar).unix();
  }
  listassets.forEach((elem) => {
    let { APISymbol: symbol } = elem;
    aproms[aproms.length] = get_valid_ticker_with_min_timediff_from_reftime({
      symbol,
      reftimepointsec,
      timedeltarequiredsec,
      //			, istickercomingbeforereftime : true } )
      istickercomingbeforereftime: false,
    });
  });
  let arrresolved = await Promise.all(aproms);
  let jsymbol_ticker = {};
  arrresolved.forEach((elem) => {
    if (elem) {
    } else {
      return;
    }
    jsymbol_ticker[elem.symbol] = elem.price;
    //		jsymbol_ticker [ elem.APISymbol ] = elem
  });
  return jsymbol_ticker;
};
const get_valid_tickers_with_orderterm = async ({
  reftimepointsec,
  reftimepointseccalendar,
  timedeltarequiredsec,
  orderterm,
}) => {
  let listassets = await findall("assets", { //    active: 1,
		[ Op.or ] : [ { activereel : 1 } , { activebet : 1 } ] ,
    APISymbol: { [Op.ne]: null },
  });
  let aproms = [];
  let aproms_redis = [];
  if (reftimepointseccalendar) {
    reftimepointsec = moment(reftimepointseccalendar).unix();
  }
  false && LOGGER("@listassets", listassets);
  listassets.forEach((elem, idx) => {
    let { APISymbol: symbol } = elem;
    aproms[idx] = get_a_ticker_with_orderterm({
      symbol,
      reftimepointsec,
      timedeltarequiredsec,
      orderterm,
    });
    aproms_redis[idx] = cliredisa.hget("STREAM_ASSET_PRICE", symbol);
  });
  let arrresolved = await Promise.all(aproms);
  let arrresolved_redis = await Promise.all(aproms_redis);
  let jsymbol_ticker = {};
  arrresolved.forEach((elem, idx) => {
    let symbol = listassets[idx]["APISymbol"];
    if (elem && elem.price) {
      jsymbol_ticker[symbol] = elem.price;
    } else if (ISFINITE(+arrresolved_redis[idx])) {
      jsymbol_ticker[symbol] = arrresolved_redis[idx];
      return;
    }
  });
  return jsymbol_ticker;
};

const get_a_ticker_with_orderterm = async ({
  symbol,
  reftimepointsec,
  timedeltarequiredsec,
  orderterm,
}) => {
  return await get_time_closest_ticker({
    symbol,
    reftimepointsec,
    output_is_object_or_scalar: "object", //
    timelengthinsec: 1, //
  }); /************/
};
/** const get_a_ticker_with_orderterm = async ( { symbol , reftimepointsec , timedeltarequiredsec ,orderterm } ) => {
	let MAP_ORDERTERM_QUERY = { // reftime - queried timepoints < 0
//		'-1' : `select * from ticke rrawstreamdata where symbol='${symbol}' and ${reftimepointsec} < timestampsec order by abs(${reftimepointsec} - timestampsec ) asc limit 1 `  
		'lte': `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec >= ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1`  , //		0 : //cannot require this
		'gt' : `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec <  ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1` ,
		'lt' : `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec >  ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1`  , //		0 : //cannot require this
		'gte': `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec <= ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1`
	}
	let querystatement = MAP_ORDERTERM_QUERY [ orderterm ]
	if ( querystatement){}
	else { LOGGER( `invalid orderterm ${orderterm}`) ; return null  }
//	let resp = await d b.sequelize.query ( querystatement )  
	let dblocal = get_random_db_src ()
//	let resp = await dbstr eams.sequelize.query ( querystatement )  
	let resp = await dblocal.sequelize.query ( querystatement )  
	if ( resp && resp[0] && resp[0][0] ) {
		return resp[0 ][0] 
	} else { return false }
} */
const get_a_ticker_with_min_timediff_from_reftime_and_preceding_constraint =
  async ({ symbol, reftimepointsec, timedeltarequiredsec }) => {
    //    let resp = await d b.sequelize.query(      `select * from ticke rrawstreamdata where symbol='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
    let dblocal = get_random_db_src();
    let resp = await dblocal.sequelize.query(
      `select * from tickerrawstreamdata where symbol='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
    );
    if (resp && resp[0] && resp[0][0]) {
      return resp[0][0];
    } //
    else {
      return false;
    }
  };

const get_a_ticker_with_min_timediff_from_reftime = async ({
  symbol,
  reftimepointsec,
  timedeltarequiredsec,
}) => {
  //  let resp = await d b.sequelize.query(    `select * from tick errawstreamdata where symbol ='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
  let dblocal = get_random_db_src();
  let resp = await dblocal.sequelize.query(
    `select * from tickerrawstreamdata where symbol ='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
  );
  if (resp && resp[0] && resp[0][0]) {
    return resp[0][0];
  } //
  else {
    return false;
  }
};
const get_valid_ticker_with_min_timediff_from_reftime = async ({
  symbol,
  reftimepointsec,
  timedeltarequiredsec,
  istickercomingbeforereftime,
}) => {
  let respticker;
  if (istickercomingbeforereftime) {
    respticker =
      await get_a_ticker_with_min_timediff_from_reftime_and_preceding_constraint(
        { symbol, reftimepointsec, timedeltarequiredsec }
      );
  } else {
    respticker = await get_a_ticker_with_min_timediff_from_reftime({
      symbol,
      reftimepointsec,
      timedeltarequiredsec,
    });
  }
  if (respticker) {
  } else {
    return false;
  }

  if (
    Math.abs(reftimepointsec - respticker["timestampsec"]) <
    timedeltarequiredsec
  ) {
    // console.table({
    //   timedeltarequiredsec,
    //   symbol,
    //   resptime: moment(respticker.timestamp).format("YYYYMMDD hh:mm:ss"),
    //   timestamp: respticker.timestamp,
    // });
    return respticker;
  } else {
    return false;
  }
};
const get_random_db_src = (_) => (Math.random() > 0.5 ? dbstreams : db1secsrc);
const get_24h_tickerprice_redis = async ({ symbol }) => {
  return await cliredisa.hget("24H_TICKER_CLOSE", symbol);
};
const get_closest_24h_tickerprice = async ({ symbol }) => {
  let resp = await db["tickercandles"].findAll({
    raw: true,
    limit: 1,
    order: [["id", "DESC"]],
    where: { symbol, timelengthinsec: 3600 * 24 },
  });
  LOGGER(`@get_closest_24h_tickerprice`, resp);
  if (resp && resp[0]) {
    return resp[0].close;
  } else {
  }
  let timeref = moment().subtract(24, "hours").unix();
  let list = await db.sequelize.query(
    `select * from tickercandles where symbol='${symbol}' and timelengthinsec=60 and close is not null order by abs(${timeref} - timestamp) asc limit 1`
  );
  if (list && list[0] && list[0][0]) {
    return list[0][0].close;
  } else {
    return null;
  }
};

const get_latest_ticker = async (symbol) => {
  let resp = await db["tickercandles"].findAll({
    raw: true,
    order: [["timestamp", "DESC"]],
    limit: 1,
    where: { close: { [Op.ne]: null }, symbol }, // ,where : { symbol }
  });
  if (resp && resp[0]) {
    resp[0].price = resp[0].close;
    return resp;
  } else {
    return null;
  }
};
const get_latest_ticker_price = async ({ symbol }) => {
  let resp = await db["tickercandles"].findAll({
    raw: true,
    order: [["id", "DESC"]],
    limit: 1,
    where: {
      symbol, // close : { [Op.ne]: null } ,
    }, // ,where : { symbol }
  });
  false &&
    LOGGER(
      `@ticker resp`,
      resp[0].open,
      resp[0].close,
      resp[0].ipaddress,
      resp[0].timelengthinsec
    );
  if (resp && resp[0]) {
    return resp[0].close;
  } else {
    return null;
  }
};
const get_latest_ticker_price_not_null = async ({ symbol }) => {
  let resp = await db["tickercandles"].findAll({
    raw: true,
    order: [["id", "DESC"]],
    limit: 1,
    where: { symbol, close: { [Op.ne]: null } }, // ,where : { symbol }
  });
  if (resp && resp[0]) {
    // LOGGER( `@ticker resp` , resp , resp[0].open, resp[0].close, resp[0].ipaddress , resp[0].timelengthinsec )
    return resp[0].close;
  } else {
    return null;
  }
};

/** const get_l atest_ticker = async (symbol) => {
//  let resp = await d b["ticke rrawstreamdata"].findAll({
	let dblocal = get_random_db_src ()
  let resp = await dblocal [ "tickerrawstreamdata"].findAll({
    raw: true,
    where: { symbol },
    order: [["timestampmili", "DESC"]],
    limit: 1,
  });
  if (resp && resp[0]) {
  } else {
    return null;
  }
  return resp[0]; // [0]
}; */
/** const get_la ntest_ticker = async (symbol) => {
//  let resp = await d b["ticke rrawstreamdata"].findAll({
  let resp = await dbstr eams["ticker rawstreamdata"].findAll({
    raw: true,
    where: { symbol },
    order: [["timestampmili", "DESC"]],
    limit: 1,
  });
  if (resp && resp[0]) {
  } else {
    return null;
  }
  return resp[0]; // [0]
}; */
const get_valid_latest_ticker_price = async ({
  symbol,
  reftimepoint,
  timerequiredsec,
}) => {
  // , ismiliorsec
  LOGGER("@args", symbol, reftimepoint, timerequiredsec);
  let tickerlatest = await get_latest_ticker(symbol);
  LOGGER("@tickerlatest ", tickerlatest);
  if (tickerlatest) {
  } else {
    return false;
  }
  return tickerlatest;

  LOGGER(
    "@returns",
    reftimepoint,
    tickerlatest["timestampsec"],
    timerequiredsec,
    reftimepoint - tickerlatest["timestampsec"]
  );
  if (Math.abs(reftimepoint - tickerlatest["timestampsec"]) < timerequiredsec) {
  } else {
    return false;
  }
  return tickerlatest;
};
const validate_time_against_latesttickertime = async ({
  symbol,
  reftimepoint,
  timerequiredsec,
}) => {
  // , ismiliorsec
  let tickerlatest = await get_latest_ticker(symbol);
  if (tickerlatest) {
  } else {
    return false;
  }
  if (+reftimepoint - tickerlatest["timestampsec"] < +timerequiredsec) {
    return true;
  }
  return false;
}; //	const timenowmili = getunixtimemili()	//if (timenowmili - tickerlatest[ 'timestampmili' ]	 //	const timenowsec = getunixtimesec ()

module.exports = {
  get_stats_of_asset_proper,
  get_closest_24h_tickerprice,
  get_time_closest_ticker,
  get_a_ticker_with_orderterm,
  get_valid_tickers_with_orderterm,
  get_valid_tickers_with_min_timediff_from_reftime,

	get_latest_tickers_redis ,
  get_latest_ticker,
  get_latest_ticker_price,
  get_latest_ticker_price_not_null,
  get_valid_latest_ticker_price,
  validate_time_against_latesttickertime,
  get_valid_ticker_with_min_timediff_from_reftime,
};

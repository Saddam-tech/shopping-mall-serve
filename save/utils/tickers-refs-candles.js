const db = require("../models");
// const dbstreams = require("../models-tickers");
const dbstreams = require("../models-streamer");
const moment = require("moment");
// const getunixtimemili = _=>moment().valueOf()
// const getunixtimesec  = _=>moment().unix()
const { getunixtimemili, getunixtimesec } = require("../utils/common");
const LOGGER = console.log;
const { findall } = require("./db");
const { Op } = db.Sequelize;

const get_time_closest_ticker=async({
	symbol	
	, reftimepointsec
	, output_is_object_or_scalar
	, timelengthinsec
})=>{
//	db['tickercandles'].findAll ( { raw: true		, where : { symbol } 		, order : [ [] ]		})
	let list = await db.sequelize.query (`select * from tickercandles where symbol='${symbol}' and timelengthinsec=${timelengthinsec} order by abs(${reftimepointsec} - timestamp) asc limit 1`) 
	if ( list && list[0] && list[0][0] ) {
		if ( output_is_object_or_scalar == 'object' ) {
			return list[0][0]
		} else {
			return list[0][0].close
		}
	} else { return null }
}
const get_valid_tickers_with_min_timediff_from_reftime = async ({
  reftimepointsec,
  reftimepointseccalendar,
  timedeltarequiredsec,
}) => {
  let listassets = await findall("assets", { // this should not matter a lot , since the base table will be here
    active: 1,
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
	orderterm
}) => {
	  let listassets = await findall("assets", {
    active: 1,
    APISymbol: { [Op.ne]: null },
  });
  let aproms = [];
  if (reftimepointseccalendar) {
    reftimepointsec = moment(reftimepointseccalendar).unix();
  }
  listassets.forEach((elem) => {
    let { APISymbol: symbol } = elem;
    aproms[aproms.length] = get_a_ticker_with_orderterm ( { symbol , reftimepointsec , timedeltarequiredsec ,orderterm } )
	})
	let arrresolved = await Promise.all ( aproms )
	let jsymbol_ticker={}
	arrresolved.forEach ( elem => {
		if ( elem ) {}
		else { return } 
		jsymbol_ticker [elem.symbol ] = elem.price
	})
	return jsymbol_ticker
}
 
const get_a_ticker_with_orderterm = async ( { symbol , reftimepointsec , timedeltarequiredsec ,orderterm } ) => {
	let MAP_ORDERTERM_QUERY = { // reftime - queried timepoints < 0
//		'-1' : `select * from tickerrawstreamdata where symbol='${symbol}' and ${reftimepointsec} < timestampsec order by abs(${reftimepointsec} - timestampsec ) asc limit 1 `  
		'lte': `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec >= ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1`  , //		0 : //cannot require this
		'gt' : `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec <  ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1` ,
/************/
		'lt' : `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec >  ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1`  , //		0 : //cannot require this
		'gte': `select * from tickerrawstreamdata where symbol='${symbol}' and timestampsec <= ${reftimepointsec} order by abs(${reftimepointsec} - timestampsec ) asc limit 1`
	}

	let querystatement = MAP_ORDERTERM_QUERY [ orderterm ]
	if ( querystatement){}
	else { LOGGER( `invalid orderterm ${orderterm}`) ; return null  }
//	let resp = await d b.sequelize.query ( querystatement )  
	let resp = await dbstreams.sequelize.query ( querystatement )  
	if ( resp && resp[0] && resp[0][0] ) {
		return resp[0 ][0] 
	} else { return false }
}
const get_a_ticker_with_min_timediff_from_reftime_and_preceding_constraint =
  async ({ symbol, reftimepointsec, timedeltarequiredsec }) => {
//    let resp = await d b.sequelize.query(      `select * from tickerrawstreamdata where symbol='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
    let resp = await dbstreams.sequelize.query(      `select * from tickerrawstreamdata where symbol='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
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
//  let resp = await d b.sequelize.query(    `select * from tickerrawstreamdata where symbol ='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
  let resp = await dbstreams.sequelize.query(    `select * from tickerrawstreamdata where symbol ='${symbol}' order by abs(${reftimepointsec}-timestampsec) asc limit 1`
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
const get_latest_ticker = async (symbol) => {
//  let resp = await d b["tickerrawstreamdata"].findAll({
  let resp = await dbstreams["tickerrawstreamdata"].findAll({
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
};
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
	get_time_closest_ticker ,
	get_a_ticker_with_orderterm ,
	get_valid_tickers_with_orderterm , 
  get_valid_tickers_with_min_timediff_from_reftime,
  get_latest_ticker,
  get_valid_latest_ticker_price,
  validate_time_against_latesttickertime,
  get_valid_ticker_with_min_timediff_from_reftime,
};

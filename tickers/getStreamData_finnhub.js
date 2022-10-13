const WebSocket = require("ws");
const cron = require("node-cron");
const db = require("../models");
const { Op } = db.Sequelize;
// const socket = new WebSocket('wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0');
const finnhubSocket = new WebSocket(
  "wss://ws.finnhub.io?token=ccc5t3iad3i8urq8oceg" // "
  // "wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0"
);
const moment = require("moment");
const cliredisa = require("async-redis").createClient();
const LOGGER = console.log;
const { bot: telbot } = require("../telbot/configs");
const getAssetSymbolList = async () => {
  let assetSymbolList = [];
  await db["assets"]
    .findAll({
      where: { active: 1, group: { [Op.in]: [1, 2] } },
      APISymbol: { [Op.ne]: null },
      raw: true,
    })
    .then((resp) => {
      resp.map((el) => {
        let { APISymbol, tickerSrc } = el;
        tickerSrc = tickerSrc.toUpperCase();
        assetSymbolList.push(`${tickerSrc}:${APISymbol}`);
      });
    });
  let result = assetSymbolList;
  LOGGER(result);
  return result;
};
function heartbeat() {
  clearTimeout(this.pingTimeout); // Use `WebSocket#terminate()`, which immediately destroys the connection,  // instead of `WebSocket#close()`, which waits for the close timer.  // Delay should be equal to the interval at which your server  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}
let idx = 0;
const sendTickerDataSocketEvent = async () => {
  finnhubSocket = new WebSocket(
    "wss://ws.finnhub.io?token=ccc5t3iad3i8urq8oceg" // "
    // "wss://ws.finnhub.io?token=c9se572ad3i4aps1soq0"
  );
  let symbolList = await getAssetSymbolList();
  finnhubSocket.addEventListener("open", function (event) {
    symbolList.forEach((symbol) => {
      finnhubSocket.send(
        JSON.stringify({ type: "subscribe", symbol: symbol })
        // JSON.stringify({ type: 'subscribe', symbol: 'FXCM:GBP/USD' })
        // JSON.stringify({ type: 'subscribe', symbol: '700.HK' })
        // JSON.stringify({ type: 'subscribe', symbol: 'B' })
        // 'BINANCE:BTCUSDT'
      );
    });
  });
  finnhubSocket.on("ping", heartbeat);
  // Listen for messages
  finnhubSocket.addEventListener("message", async function (event) {
    // console.log(JSON.parse(event.data));
    //    console.log( event.data );
    let resp = JSON.parse(event.data).data;
    false && LOGGER("@listen", resp);
    if (resp) {
      resp.forEach(async (elem) => {
        let { s, p, t, v } = elem;
        s = s.split(":")[1];
        p = p.toFixed(5);
        let timestampsec = ~~(+t / 1000);
        // console.log(s, p);
        cliredisa.hset("STREAM_ASSET_PRICE", s, p);
        cliredisa.hset("STREAM_ASSET_VOLUME", s, v);
        cliredisa.hset("STREAM_ASSET_UPDATE", s, timestampsec);
        cliredisa.hset("STREAM_ASSET_UPDATE_MILI", s, t);
        cliredisa.hset("STREAM_ASSET_UPDATE_SEC", s, timestampsec);
        await db["tickerrawstreamdata"].create({
          timestampmili: t, // '',
          timestampsec, // : '' ,
          timestamp: timestampsec, // : '' ,
          symbol: s, // '' ,
          //				  assetid : '' ,
          price: p, // '' ,
          volume: v,
        });
        if (s.match(/BTC/)) {
          if (++idx % 200 == 0) {
            LOGGER(timestampsec, t, p);
          }
        } else {
        }
      });
    }
  });
  finnhubSocket.addEventListener("close", function () {
    LOGGER(
      "[finnsocket]: Connection has been lost! Reconnection will be attempted in 1 second"
    );
    false &&
      telbot.sendMessage(
        -1001775593548,
        `[soc ket off]: @close \n${moment().format(
          "YYYY-MM-DD HH:mm:ss.SSS"
        )} , ${moment().unix()}`
      );
    setTimeout(() => {
      sendTickerDataSocketEvent();
    }, 1000);
  });
  finnhubSocket.addEventListener("disconnect", function () {
    LOGGER(
      "@finnsocket disconnected! Reconnection will be attempted in 1 second"
    );
    false &&
      telbot.sendMessage(
        -1001775593548,
        `[s ocket off]: @disconnect \n${moment().format(
          "YYYY-MM-DD HH:mm:ss.SSS"
        )} , ${moment().unix()}`
      );
    setTimeout(() => {
      sendTickerDataSocketEvent();
    }, 1000);
  });
};

/**
CREATE TABLE `tickerrawstreamdata` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `createdat` datetime DEFAULT current_timestamp(),
  `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
  timestampmili bigint unsigned ,
  timestamp int unsigned ,
  symbol varchar(40) ,
  assetid int unsigned ,
  price varchar(40) ,
  primary key (id)
);
*/
/** @listen [
 {   c: null,
   p: 20263.32,
   s: 'BINANCE:BTCUSDT',
   t: 1661952994628,
   v: 0.00492
 },
 {   c: null,
   p: 20263.32,
   s: 'BINANCE:BTCUSDT',
   t: 1661952994628,
   v: 0.01387
 },
 {   c: null,
   p: 20263.31,
   s: 'BINANCE:BTCUSDT',
   t: 1661952994628,
   v: 0.00557
 },
 {
   c: null,
   p: 20263.78,
*/
sendTickerDataSocketEvent();
// cron.schedule('0 * * * * *', () => {
//   co nsole.log('@GET Finnhub Data');
//   sendTickerDataSocketEvent();
// })

module.exports = { sendTickerDataSocketEvent };
const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 3600; // == 60 min , 600
// const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 2700; // == 45 min , 600
// const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 1800; // == 30 min , 600
// const TIMEWINDOW_TO_RETAIN_DATA_IN_SEC = 300; // == 5 min , 600
const periodic_cleaner = async (_) => {
  let timenow = moment().unix();
  let time0 = timenow - TIMEWINDOW_TO_RETAIN_DATA_IN_SEC;
  LOGGER(`@deleting old tickerrawstreamdata `);
  await db["tickerrawstreamdata"].destroy({
    where: { timestamp: { [Op.lt]: time0 } },
  });
  //		await db.sequelize.query ( `delete from tickerrawstreamdata where timestamp<${time0}` )
  /**
	let listassets = await getAssetSymbolList ()
	listassets.forEach ( async elem => {
		let { APISymbol } = elem
		await db.sequelize.query ( `delete from tickerrawstreamdata where symbol='${APISymbol }' and timestamp<${time0}` )
	}) */
};
false &&
  cron.schedule("9 * * * * *", (_) => {
    // a little delay from
    periodic_cleaner();
  });

/**tickerrawstreamdata;
| timestampmili | bigint(20) 
| timestamp     | int(10) uns
| symbol        | varchar(40)
| assetid       | int(10) uns
| price         | varchar(40)  
*/

/** timestamps and btc tickers 
 1661956023383 20312.42000
 1661956023414 20313.20000
 1661956023497 20313.19000
 1661956023503 20313.19000
 1661956023503 20313.18000
 1661956023504 20313.20000
 1661956023504 20313.59000
 1661956023514 20313.18000
 1661956023524 20312.05000
 1661956023524 20312.02000
 1661956023533 20312.97000
 1661956023698 20312.47000
 1661956023698 20312.05000
 1661956023701 20312.05000
 1661956023701 20312.04000
 1661956023701 20312.01000
 1661956023701 20311.51000
 1661956023701 20311.50000
 1661956023701 20311.47000
 1661956023701 20311.45000
 16_6195_6023_703 20310.75000
 1661956023703 20310.52000
 1661956023703 20310.49000
 1661956023703 20310.42000
 1661956023703 20310.36000
 1661956023703 20310.29000
 1661956023722 20310.76000
 1661956023862 20311.76000
 1661956023869 20311.76000
 1661956023870 20311.76000
 1661956023873 20311.75000
 1661956023893 20312.00000
 1661956023988 20311.98000
 1661956024020 20311.74000
 1661956024067 20311.81000
 1661956024083 20311.67000
 1661956024083 20311.31000
 1661956024083 20311.31000
 1661956024083 20310.67000
 1661956024083 20310.40000
 1661956024292 20310.40000
 1661956024292 20310.40000
 1661956024263 20310.42000
 1661956024264 20310.42000
 1661956024274 20310.41000
 1661956024274 20310.41000
 1661956024274 20310.41000
 1661956024307 20310.36000
 1661956024320 20310.35000
 1661956024320 20310.35000
 1661956024346 20311.40000
 1661956024346 20311.40000
 1661956024359 20311.39000
*/

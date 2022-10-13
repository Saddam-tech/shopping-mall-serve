var express = require("express");
var router = express.Router();
let { respok, resperr } = require("../utils/rest");
const jwt = require("jsonwebtoken");
const { softauth, auth, adminauth } = require("../utils/authMiddleware");
const db = require("../models");
const dbstreams = require("../models-streamer");
const {
  get_closest_24h_tickerprice,
  get_latest_ticker_price_not_null,
  get_stats_of_asset_proper,
} = require("../utils/tickers");
// const dbti ckers = require('../models-tickers' ) //
const LOGGER = console.log;
let dbtickers; // = require('../models-streamer' ) //
const { socket_receiver_ipaddresses } = require('../configs/configs')

const init = async (_) => {
  let { value } = await db["settings"].findOne({
    raw: true,
    where: { name: "USE_1SEC_TICKER_MODEL", active: 1 },
  });
  LOGGER("USE_1SEC_TICKER_MODEL", value);
  if (value) {
    dbtickers = require("../" + value);
  } else {
    dbtickers = require("../models-streamer");
  }
}; // ( 'USE_1SEC_TIC KER_MODEL' , 'db-tickers')
init();

var crypto = require("crypto");
let { Op } = db.Sequelize;
const axios = require("axios");
// const cli redisa = require("async-redis").createClient();
const { redisconfig} =require('../configs/redis.conf')
const cliredisa = require("async-redis").createClient( redisconfig );
const fs = require("fs");
const { upload_symbol } = require("../utils/multer");
const moment = require("moment");
const ISFINITE = Number.isFinite;

const WEB_URL = "https://options1.net/resource";
const {
  findone,
  findall,
  createifnoneexistent,
  updaterow,
} = require("../utils/db");
const { v4: uuidv4 } = require("uuid");
const { synthesize_forex_pair_image } = require("../utils/synthesize-image");
// const {  sendTickerDataSocketEvent,} = require("../tickers/getStreamData_finnhub.js");
// const {  sendTwelveDataSocketEvent,} = require("../tickers/getStreamData_twelveData.js");
// router.get('/', function (req, res, next) {
//   res.send('respond with a resource');
// });
/** const get_stats_of_asset_p roper = async symbol=>{
	let dblocal= db
	let close = await get_latest_ticker_price_not_null ( {symbol } ) 
	let tickerprice24hago = await get_closest_24h_tickerprice ( { symbol } )   	
	let change 
	if ( ISFINITE( +close ) && ISFINITE( +tickerprice24hago  ) ) { change = +close - +tickerprice24hago } 
	return { close , change , currentprice : close } 
} */
const get_stats_of_asset_secondcandle = async (symbol) => {
  //	let dblocal = dbstr eams
  let dblocal = dbtickers;
  let list = await dblocal["tickercandles"].findAll({
    raw: true,
    where: {
      symbol,
      timelengthinsec: 1, // 1000 // 60
      close: { [Op.ne]: null },
    },
    order: [["id", "DESC"]],
    limit: 2,
  });
  let close = 0,
    change = 0,
    currentprice; //	if ( list && list[0] && list[0][0] ) { close = list[0][0].close } else { close = 0 } 	//if ( list && list[0] && list[0][1] ) { change = list[0][0] - list[0][1] } else { change = 0 }
  if (list && list[0]) {
    close = list[0].close;
    currentprice = list[1].close;
  } // else { close = 0 }
  if (list && list[1]) {
    change = list[1].close - list[0].close;
  } // else { change = 0 }
  return { close, change, currentprice };
};
const get_stats_of_asset_minutecandle = async (symbol) => {
  //	let dbl ocal = dbstreams
  let dblocal = db;
  let list = await dblocal["tickercandles"].findAll({
    raw: true,
    where: { symbol, timelengthinsec: 60, close: { [Op.ne]: null } },
    order: [["id", "DESC"]],
    limit: 2,
  });
  let close = 0,
    change = 0; //	if ( list && list[0] && list[0][0] ) { close = list[0][0].close } else { close = 0 } 	//if ( list && list[0] && list[0][1] ) { change = list[0][0] - list[0][1] } else { change = 0 }
  if (list && list[0]) {
    close = list[0].close;
  } // else { close = 0 }
  if (list && list[1]) {
    change = list[1].close - list[0].close;
  } // else { change = 0 }
  return { close, change };
};
const get_stats_of_asset = get_stats_of_asset_proper; // get_stats_of_asset_secondcandle
router.get("/groups", async (req, res) => {
  let listgroups = await findall("assetgroups", { active: 1 });
  let jgroup_assets = {};
  //	listgroups.forEach ( async elem => {
  for (let i = 0; i < listgroups.length; i++) {
    let elem = listgroups[i];
    let { groupid } = elem;
    let respassets = await findall("assets", { group: +groupid, active: 1 });
    jgroup_assets[groupid] = respassets;
  }
  //	})
  respok(res, null, null, {
    listgroups, // jgroup_assets
  });
});
router.get("/list", softauth, async (req, res) => {
  //  let start_time = moment()    .subtract(2, "minute")    .set("second", 0)    .format("YYYY-MM-DD HH:mm:ss");  // let end_time = moment()    .subtract(1, "minute")    .set("second", 0)    .format("YYYY-MM-DD HH:mm:ss");
  let id;
  let { group, searchkey, date0, date1 } = req.query;
  let jfilter = {};
  if (group && group !== "crypto") {
    jfilter["groupstr"] = group;
  } else if (group && group === "crypto") {
    jfilter["groupstr"] = "coin";
  } else if (group && group === "coin") {
    jfilter["groupstr"] = group;
  }
  if (searchkey) {
    // jfilter = { ...jfilter, [Op.or]: [ { name: { [Op.like]: `%${searchkey}%` }}, { groupstr: { [Op.like]: `%${searchkey}%` }} ]};
    jfilter = { ...jfilter, name: { [Op.like]: `%${searchkey}%` } };
  }
  if (date0) {
    startDate = moment(date0).format("YYYY-MM-DD HH:mm:ss");
    jfilter = { ...jfilter, createdat: { [Op.gte]: startDate } };
  }
  if (date1) {
    endDate = moment(date1).format("YYYY-MM-DD HH:mm:ss");
    jfilter = { ...jfilter, createdat: { [Op.lte]: endDate } };
  } //  console.log(start_time);  // console.log(end_time);
  const defaultfilter = { active: 1, groupactive: 1 };
  let respassetgroups = await findall("assetgroups", {});
  if (req.decoded) {
    if (req.decoded.id) {
      db["assets"]
        .findAll({
          where: { ...jfilter, ...defaultfilter },
          raw: true, //            active: 1,
        })
        .then(async (resp) => {
          let promises = resp.map(async (el) => {
            let { id: assetId, APISymbol: symbol } = el; // .id;
            let respclosechange = await get_stats_of_asset({ symbol });
            el["close"] = respclosechange["close"];
            el["change"] = respclosechange["change"];
            el["currentprice"] = respclosechange["currentprice"];
            /** let price = await db["ticker price"].findAll({where: {assetId: assetId,createdat: {[Op.or]: [start_time, end_time],},},order: [["id", "ASC"]],              raw: true,            });            let [startPrice, endPrice] = price;            if (endPrice && startPrice) {              el["close"] = endPrice.price;              el["change"] = (endPrice.price - startPrice.price).toFixed(2);            } else {		price = await db["tick erprice"].findAll({where: {assetId: assetId,},order: [["id", "DESC"]],limit: 2,                raw: true,              });              let [startPrice, endPrice] = price;              if (endPrice && startPrice) {                el["close"] = endPrice.price;                el["change"] = endPrice.price - startPrice.price;              } else {                el["close"] = 0;               el["change"] = 0;              }            } */
            await db["bookmarks"]
              .findOne({
                where: { assetsId: assetId, uid: req.decoded.id },
                raw: true,
              })
              .then((resp) => {
                if (!resp) {
                  el["bookmark"] = 0;
                } else {
                  el["bookmark"] = 1;
                }
              });
          });
          await Promise.all(promises);
          respok(res, null, null, { resp, groupactive: respassetgroups });
        });
    } else {
      db["assets"]
        .findAll({
          where: {
            ...jfilter,
            ...defaultfilter, //            active: 1,
          },
          raw: true,
        })
        .then(async (resp) => {
          let promises = resp.map(async (el) => {
            //            let assetId = el.id;
            let { id: assetId, APISymbol: symbol } = el; // .id;
            let respclosechange = await get_stats_of_asset({ symbol });
            el["close"] = respclosechange["close"];
            el["change"] = respclosechange["change"];
            el["currentprice"] = respclosechange["currentprice"];
            /** let price = await db["tick erprice"].findAll({where: {assetId: assetId,createdat: {[Op.or]: [start_time, end_time],},},order: [["id", "ASC"]],              raw: true,            });            let [startPrice, endPrice] = price;            if (endPrice && startPrice) {              el["close"] = endPrice.price;              el["change"] = (endPrice.price - startPrice.price).toFixed(2);            } else {		price = await db["tic kerprice"].findAll({where: {assetId: assetId,},order: [["id", "DESC"]],limit: 2,                raw: true,              });              let [startPrice, endPrice] = price;              if (endPrice && startPrice) {                el["close"] = endPrice.price;                el["change"] = endPrice.price - startPrice.price;              } else {                el["close"] = 0;                el["change"] = 0;              }
            } */
          });
          await Promise.all(promises);
          respok(res, null, null, { resp, groupactive: respassetgroups });
          return;
        });
    }
  } else {
    db["assets"]
      .findAll({
        where: {
          ...jfilter,
          ...defaultfilter, //          active: 1,
        },
        raw: true,
      })
      .then(async (resp) => {
        let promises = resp.map(async (el) => {
          let { id: assetId, APISymbol: symbol } = el; // .id;
          let respclosechange = await get_stats_of_asset({ symbol });
          el["close"] = respclosechange["close"];
          el["change"] = respclosechange["change"];
          el["currentprice"] = respclosechange["currentprice"];
          /** let price = await db["tick erprice"].findAll({where: {assetId: assetId,createdat: {[Op.or]: [start_time, end_time],},},order: [["id", "ASC"]],            raw: true,          });          let [startPrice, endPrice] = price;          if (endPrice && startPrice) {            el["close"] = endPrice.price;            el["change"] = (endPrice.price - startPrice.price).toFixed(2);          } else {		price = await db["ticker price"].findAll({where: {assetId: assetId,},order: [["id", "DESC"]],limit: 2,              raw: true,            });            let [startPrice, endPrice] = price;            if (endPrice && startPrice) {              el["close"] = endPrice.price;              el["change"] = endPrice.price - startPrice.price;            } else {              el["close"] = 0;              el["change"] = 0;            }          }
           */
        });
        await Promise.all(promises);
        respok(res, null, null, { resp, groupactive: respassetgroups });
        return;
      });
  }
});
const sharp = require("sharp");
router.post("/test/merge-images/:base/:quote", async (req, res) => {
  let { base, quote } = req.params;
  const file0 = "/var/www/html/resource/flags/KOR.png";
  const file1 = "/var/www/html/resource/flags/EUR.jpeg";
  const fileout = `/var/www/html/tmp/${base}-${quote}.png`;
  let img0 = await sharp(file0);
  let img1 = await sharp(file1);
  img0.composite([{ input: file1 }]).toFile(fileout);
  respok(res);
});
const Jimp = require("jimp");
router.post("/test/merge-two-images/:base/:quote", async (req, res) => {
  let { base, quote } = req.params;
  base = "KRW";
  quote = "JPY";
  let { urllogo: urllogo0 } = await findone("forexcurrencies", {
    symbol: base,
  });
  let { urllogo: urllogo1 } = await findone("forexcurrencies", {
    symbol: quote,
  });
  //	let img0 = await Jimp.read ( urllogo0 )
  // let img1 = await Jimp.read ( urllogo1 )
  //	let img0 = await Jimp.read ( '/var/www/html/resource/flags/KRW.svg' )
  //let img1 = await Jimp.read ( '/var/www/html/resource/flags/JPY.svg' )
  let img0 = await Jimp.read("/var/www/html/resource/flags/KOR.png");
  let img1 = await Jimp.read("/var/www/html/resource/flags/EUR.jpeg");
  img0.composite((await img1.resize(128, 128), 0, 0)); //create and attachment using buffer from edited picture and sending it
  //	await img0.getBufferAsync(Jimp.MIME_PNG)
  await img0.write(`/var/www/html/tmp/${base}-${quote}.png`);
  respok(res);
});
router.post("/synthesize/image", async (req, res) => {
  let { base, target, name } = req.body;
  if (!base || !target || !name) {
    resperr(res, "MISSING ASSETS!");
    return;
  }

  let imgurl = await synthesize_forex_pair_image(base, target);
  let uuid = uuidv4();
  await createifnoneexistent(
    "assets",
    { symbol: `${base}_${target}` },
    {
      name,
      symbol: `${base}_${target}`,
      baseAsset: base,
      targetAsset: target,
      imgurl,
      uuid,
      tickerSrc: "FXCM",
      group: 2,
      groupstr: "forex",
      active: 1,
      APISymbol: `${base}/${target}`,
    }
  );
  respok(res, "Successfully added to assets!");
});

router.post("/image/add/:assetId", upload_symbol.single("img"), (req, res) => {
  const imgfile = req.file;
  let imgurl = `${WEB_URL}/symbols/${imgfile.filename}`;
  let { assetId } = req.params;
  db["assets"].update({ imgurl }, { id: assetId }).then((resp) => {
    respok(res, "OK");
  });
});

const MAP_GROUPS_ALLOWED = { coin: 1, forex: 1, stock: 1 };
router.post("/add/:type", upload_symbol.single("img"), async (req, res) => {
  // type => coin / forex / stock
  LOGGER("", req.body);
  const imgfile = req.file;
  console.log("img file@@@@@@@@@@@@@@", req.file);
  let imgurl = `${WEB_URL}/symbols/${imgfile.filename}`;
  let { name, baseAsset, targetAsset, stockSymbol } = req.body;
  if (baseAsset) {
    baseAsset = baseAsset.toUpperCase();
  }
  if (targetAsset) {
    targetAsset = targetAsset.toUpperCase();
  }
  let { type } = req.params;
  let symbol, dispSymbol, APISymbol, socketAPISymbol;
  symbol = `${baseAsset}_${targetAsset}`;
  dispSymbol = `${baseAsset}${targetAsset}`;

  let groupstr = type;
  if (MAP_GROUPS_ALLOWED[groupstr]) {
  } else {
    resperr(res, "NOT-SUPPORTED-GROUP");
    return;
  }
  // let resp = await db['assets'].findOne({
  //   raw: true,
  //   where: { symbol, groupstr },
  // });
  // if (resp) {
  //   resperr(res, 'DATA-DUPLICATE');
  //   return;
  // } else {
  // }
  if (type === "coin" || type === "crypto") {
    // APISymbol = APISymbol.slice(0, -1);
    console.log("baseAsset", baseAsset);
    console.log("targetAsset", targetAsset);
    APISymbol = `${baseAsset}${targetAsset}`;
    await db["finnhubapisymbols"]
      .findOne({
        where: { symbol: APISymbol, assetkind: "coin" },
        raw: true,
      })
      .then(async (resp) => {
        if (!resp) {
          resperr(res, "UNSUPPORTED_ASSET");
          return;
        } else {
          await db["assets"]
            .findOne({
              where: { APISymbol: APISymbol },
              raw: true,
            })
            .then((resp) => {
              if (resp) {
                resperr(res, "EXIST_ASSET");
                return;
              } else {
                let jdata = {
                  group: 1,
                  groupstr: "coin",
                  name,
                  baseAsset,
                  targetAsset,
                  symbol,
                  dispSymbol,
                  APISymbol,
                  tickerSrc: "Binance",
                  socketAPISymbol: dispSymbol,
                  imgurl: imgurl,
                  active: 0,
                };

                db["assets"].create(jdata).then((resp) => {
                  respok(res, null, null, { resp });
                });
                try {
                  dbstreams["assets"].create(jdata);
                  dbtickers["assets"].create(jdata);
                } catch (err) {
                  LOGGER(ERR);
                }
              }
            });
        }
      });
  } else if (type === "forex") {
    APISymbol = `${baseAsset}/${targetAsset}`;
    await db["finnhubapisymbols"]
      .findOne({
        where: { symbol: APISymbol, assetkind: "forex" },
        raw: true,
      })
      .then(async (resp) => {
        if (!resp) {
          resperr(res, "UNSUPPORTED_ASSET");
          return;
        } else {
          await db["assets"]
            .findOne({
              where: { APISymbol: APISymbol },
              raw: true,
            })
            .then((resp) => {
              if (resp) {
                resperr(res, "EXIST_ASSET");
                return;
              } else {
                let jdata = {
                  group: 2,
                  groupstr: "forex",
                  name,
                  baseAsset,
                  targetAsset,
                  symbol,
                  dispSymbol,
                  APISymbol,
                  tickerSrc: "FXCM",
                  socketAPISymbol: APISymbol,
                  imgurl: imgurl,
                  active: 0,
                };
                db["assets"].create(jdata).then((resp) => {
                  respok(res, null, null, { resp });
                });
                try {
                  dbstreams["assets"].create(jdata);
                  dbtickers["assets"].create(jdata);
                } catch (err) {
                  LOGGER(ERR);
                } //            });
              }
            });
        }
      });
  } else if (type === "stock") {
    await db["twelvedataapisymbols"]
      .findOne({
        where: { symbol: stockSymbol },
        raw: true,
      })
      .then(async (resp) => {
        if (!resp) {
          resperr(res, "UNSUPPORTED_ASSET");
          return;
        } else {
          await db["assets"]
            .findOne({
              where: { APISymbol: stockSymbol },
              raw: true,
            })
            .then((resp) => {
              if (resp) {
                resperr(res, "EXIST_ASSET");
                return;
              } else {
                db["assets"]
                  .create({
                    group: 3,
                    groupstr: "stock",
                    name,
                    // baseAsset,
                    // targetAsset,
                    // tickerSrc,
                    symbol: stockSymbol,
                    dispSymbol: stockSymbol,
                    APISymbol: stockSymbol,
                    socketAPISymbol: stockSymbol,
                    imgurl: imgurl,
                    active: 0,
                  })
                  .then((resp) => {
                    respok(res, null, null, { resp });
                  });
              }
            });
        }
      });
  } else {
  }
});

router.patch(
  "/group_setting/:group/:groupactive",
  // adminauth,
  async (req, res) => {
    // if (req.isadmin !== 2) {
    // return res.status(401).json({
    //   code: 401,
    //   message: "No Admin Privileges",
    // });
    // } else {
    // }
    let { group, groupactive } = req.params;
    await updaterow("assets", { group }, { groupactive: +groupactive });
    await updaterow(
      "assetgroups",
      { groupid: group },
      { active: +groupactive }
    );
    respok(res, "Successfully modified");
    try {
      await dbstreams["assets"].update(
        { groupactive: +groupactive },
        { where: { group } }
      );
      await dbtickers["assets"].update(
        { groupactive: +groupactive },
        { where: { group } }
      );
    } catch (err) {
      LOGGER(err);
    }
  }
);
/** assetgroups;
| id | createdat           | updatedat           | groupid | groupstr | active | name       |
|  1 | 2022-09-05 03:40:59 | 2022-09-05 04:24:43 |       1 | coin     |      1 | Coin       |
|  2 | 2022-09-05 03:41:09 | 2022-09-05 04:24:54 |       2 | forex    |      0 | Currencies |
|  3 | 2022-09-05 03:41:19 | 2022-09-05 04:25:04 |       3 | stock    |      0 | Stocks     | */
router.patch(  "/setting/:assetId/:active",
  // , adminauth
  async (req, res) => {
    if (false && req.isadmin !== 2) {
      return res.status(401).json({
        code: 401,
        message: "No Admin Privileges",
      });
    } else {
    }
    let { assetId, active } = req.params;
    let { id, APISymbol: symbol } = await db["assets"].findOne({
      raw: true,
			where : { id : assetId } 
//      where: { symbol: `${assetname}_USDT` },
    });

    let jupdates = {};
    if (ISFINITE(+assetId)) {
    } else {
      let assetname = assetId;
//      let { id, APISymbol: symbol } = await db["assets"].findOne({
  //      raw: true,
    //    where: { symbol: `${assetname}_USDT` },
      // });
      if (ISFINITE(+id)) {
        assetId = id;
				
    		jupdates [ 'active' ] = active
				cliredisa.hget ( '24H_TICKER_CLOSE' , symbol ).then(resp=>{
					if ( resp ) {}
					else { // setTimeout (_=>{						cliredisa.hset ( '24H_TICKER_CLOSE' , symbol ) } , 60*1000 ) 
					}
				})
      } else {
        resperr(res, "DATA-NOT-FOUND");
        return;
      }
    }
    let { imgurl } = req.query;
//    let jupdates = {};
    if (imgurl) {
      jupdates["imgurl"] = imgurl;
    }
    if (active) {
      jupdates["active"] = active;
    }
    db["assets"] //    .update({      ...jupdates,		    })
      .update(jupdates, { where: { id: assetId } })
      .then((resp) => {
        false && sendTickerDataSocketEvent();
        false && sendTwelveDataSocketEvent();
        respok(res, "successfully modified");
      })
      .catch((err) => {
        LOGGER(err);
        resperr(res, "INTERNAL-ERR");
        return;
      });
    try {
//      await dbstreams["assets"].update(jupdates, { where: { id: assetId } });
  //    await dbtickers["assets"].update(jupdates, { where: { id: assetId } });
    } catch (err) {
      LOGGER(err);
    }

    try { 
      axios
        .put(
          `http://${socket_receiver_ipaddresses['socket_receiver_02']}:30708/admins/symbol_sub_status/${symbol}/${active}` // 15.164.135.98
        )
        .then((resp) => {
          LOGGER("@patch remote resp1", resp.data);
        })
        .catch(LOGGER);
    } catch (err) {
      LOGGER(`@patch symbol status1`, err);
    }
    try { // return
      axios
        .put(
          `http://${socket_receiver_ipaddresses['socket_receiver_01'] }:30708/admins/symbol_sub_status/${symbol}/${active}` // p43.200.217.81
        )
        .then((resp) => {
          LOGGER("@patch remote resp0", resp.data);
        })
        .catch(LOGGER);
    } catch (err) {
      LOGGER(`@patch symbol status0`, err);
    }
  }
);

router.get("/search", async (req, res) => {
  let { assetSymbol, assetSrc } = req.query;
  let price = await axios
    .get(
      `https://api.twelvedata.com/price?symbol=${assetSymbol}&exchange=${assetSrc}&apikey=c092ff5093bf4eef83897889e96b3ba7&source=docs`
    )
    .then((resp) => {
      if (resp.data) {
        let { price } = resp.data;
        respok(res, "Can be added", null, { price });
      } else {
        resperr(
          res,
          "**symbol** not found: EUR/US. Please specify it correctly according to API Documentation."
        );
      }
    });
});

router.get("/api", async (req, res) => {
  // await axios
  //   .get('https://api.twelvedata.com/stocks?exchange=HKEX&?source=docs')
  //   .then((resp) => {
  //     resp.data.data.forEach((el) => {
  //       let { currency, name, symbol } = el;
  //       db['twelvedataapisymbols'].create({
  //         symbol: symbol,
  //         description: name,
  //         assetkind: 'stock',
  //       });
  //     });
  //   });
  await axios
    .get(
      "https://finnhub.io/api/v1/forex/symbol?exchange=fxcm&token=c9se572ad3i4aps1soq0"
    )
    .then((resp) => {
      // console.log(resp.data);
      // respok(res,null,null, resp.data)
      resp.data.forEach((el) => {
        let { description, displaySymbol, symbol } = el;

        let baseAsset = displaySymbol.split("/")[0];
        let targetAsset = displaySymbol.split("/")[1];
        let vendor = symbol.split(":")[0];
        let symbol_ = symbol.split(":")[1];
        console.log(targetAsset, baseAsset, vendor, symbol_);
        db["finnhubapisymbols"].create({
          symbol: symbol_,
          description: description,
          assetkind: "forex",
          exchanges: vendor,
          targetAsset: targetAsset,
          baseAsset: baseAsset,
        });
      });
    });
});

router.get("/api/docs/:type/:offset/:limit", async (req, res) => {
  let { type, offset, limit } = req.params;
  let { searchkey } = req.query;
  offset = +offset;
  limit = +limit;
  let jfilter = {};
  if (searchkey) {
    jfilter = {
      ...jfilter,
      description: {
        [Op.like]: `%${searchkey}%`,
      },
    };
  }
  if (type === "coin" || type === "forex") {
    await db["finnhubapisymbols"]
      .findAndCountAll({
        where: {
          ...jfilter,
          assetkind: type,
        },
        raw: true,
        offset,
        limit,
      })
      .then(async (resp) => {
        if (type === "forex") {
          let promises = resp.rows.map(async (el) => {
            let { baseAsset, targetAsset } = el;
            if (baseAsset) {
              let baseAssetData = await db["forexcurrencies"].findOne({
                where: { name: baseAsset },
                raw: true,
              });
              if (baseAssetData) {
                let { urllogo } = baseAssetData;
                if (urllogo) {
                  el["baseAsset_imgurl"] = baseAssetData.urllogo;
                }
              }
            }

            if (targetAsset) {
              let targetAssetData = await db["forexcurrencies"].findOne({
                where: { name: targetAsset },
                raw: true,
              });
              if (targetAssetData) {
                let { urllogo } = targetAssetData;
                if (urllogo) {
                  el["targetAsset_imgurl"] = targetAssetData.urllogo;
                }
              }
            }
          });
          await Promise.all(promises);
        }
        respok(res, null, null, resp);
      });
  } else if (type === "stock") {
    await db["twelvedataapisymbols"]
      .findAndCountAll({
        where: {
          ...jfilter,
          assetkind: type,
        },
        raw: true,
        offset,
        limit,
      })
      .then((resp) => {
        respok(res, null, null, resp);
      });
  }
});

/** router.get("/ticker/price", async (req, res) => {
  let { symbol, limit } = req.query;
  if (limit) {
    limit = +limit;
  } else {
    limit = 5000;
  }
await db["tick erprice"]    .findAll({where: { symbol },order: [["id", "DESC"]],limit: limit,
    })
    .then((resp) => {
      resp = resp.reverse();
      respok(res, null, null, { resp });
    });
}); */

router.get("/time/frame", async (req, res) => {});

module.exports = router;

// CREATE TABLE `twelvedataapisymbols` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `symbol` varchar(60) DEFAULT NULL,
//   `displaySymbol` varchar(60) DEFAULT NULL,
//   `description` text DEFAULT NULL,
//   `vendorname` varchar(60) DEFAULT NULL,
//   `assetkind` varchar(60) DEFAULT NULL,
//   `exchanges` varchar(60) DEFAULT NULL,
//   `active` tinyint(4) DEFAULT 1,
//   PRIMARY KEY (`id`)
// )

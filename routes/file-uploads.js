var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype, convaj } = require("../utils/common");
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/authMiddleware");
const db = require("../models");
const { lookup } = require("geoip-lite");
var crypto = require("crypto");
const LOGGER = console.log;
const { tableexists, fieldexists } = require("../utils/db");
let { Op } = db.Sequelize;
// const { calculate_dividendrate } = require('../schedule/XXX-calculateDividendRate');
const axios = require("axios");
const { redisconfig } = require("../configs/redis.conf");
const cliredisa = require("async-redis").createClient(redisconfig);
const { findone } = require("../utils/db");
const { filehandler } = require("../utils/file-uploads");
var router = express.Router();
const { messages } = require("../configs/messages");
const { storefiletoawss3 } = require("../utils/repo-s3");
const moment = require("moment");

router.put(
  "/:tablename/:uuid",
  filehandler.fields([
    { name: "image00", maxCount: 1 },
    { name: "image01", maxCount: 1 },
    { name: "image02", maxCount: 1 },
    { name: "image03", maxCount: 1 },
    { name: "image04", maxCount: 1 },
  ]),
  async (req, res) => {
    let m0 = moment().valueOf();
    let { tablename, uuid } = req.params;
    let resptableex = await tableexists(tablename);
    if (resptableex) {
    } else {
      resperr(res, messages.MSG_TABLENOTFOUND);
      return;
    }

    let resprow = await db[tablename].findOne({ raw: true, where: { uuid } });
    if (resprow) {
    } else {
      resperr(res, messages.MSG_DATANOTFOUND);
      return;
    }
    if (req.files) {
    } else {
      resperr(res, messages.MSG_FILEMISSING);
      return;
    }
    //	let { image00 , image01 , image02 , image03 , image04 } = req.files
    let arrimagepaths = [
      req?.files?.image00,
      req?.files?.image01,
      req?.files?.image02,
      req?.files?.image03,
      req?.files?.image04,
    ];
    let count = 0;
    let jupdatestoreturn = {};
    for (let idx = 0; idx < arrimagepaths.length; idx++) {
      let file;
      if ((file = arrimagepaths[idx][0])) {
        let urltos3 = await storefiletoawss3(file.path);
        let jupdates = {};
        jupdates[`imageurl0${idx}`] = urltos3;
        jupdatestoreturn[`imageurl0${idx}`] = urltos3;
        await db[tablename].update(
          { ...jupdates },
          { where: { id: resprow.id } }
        );
        ++count;
      } else {
        continue;
      }
    }
    respok(res, null, null, {
      respdata: {
        count,
        timedeltainmili: moment().valueOf() - m0,
        urls: jupdatestoreturn,
      },
    });
  }
);
module.exports = router;

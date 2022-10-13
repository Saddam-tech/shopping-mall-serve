var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype } = require("../utils/common");
const jwt = require("jsonwebtoken");
const { auth } = require("../utils/authMiddleware");
const db = require("../models");
const { lookup } = require("geoip-lite");
var crypto = require("crypto");
const LOGGER = console.log;
let { Op } = db.Sequelize;
const { web3 } = require("../configs/configweb3");
let { I_LEVEL, LEVEL_I } = require("../configs/userlevel");
let moment = require("moment");
var router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { sendMessage } = require("../services/twilio");
const { sendEmailMessage } = require("../services/nodemailer");
const { v4: uuidv4 } = require("uuid");
const e = require("express");
const KEYS = Object.keys;
const ISFINITE = Number.isFinite;
// router.get( '/daily-summary/:id' , auth , async ( req,res)=>{
router.get("/daily-summary/:id", async (req, res) => {
  //	let { id } =req.decoded
  let { id } = req.params;
  let date0 = moment().subtract(30, "days").format("YYYY-MM-DDTHH:mm:ss");
  //	let resp = await db.sequelize.query ( `select date( createdat),sum(amount) from betlogs where uid=${id} group by date ( createdat ) where createdat >='${date0}'` )
  //	let resp = await db.sequelize.query ( `select date( createdat) as date ,sum(amount) as sumamount from betlogs  group by date(createdat) where uid=${id}` )
  let resp = await db.sequelize.query(
    `select date( createdat) as date ,sum(amount) as sumbetamount from betlogs where uid=${id} and createdat>='${date0}' group by date(createdat) `
  );
  if (resp && resp[0] && resp[0][0]) {
  } else {
    respok(res, null, null, { list: [] });
    return;
  }
  LOGGER(resp[0]);
  respok(res, null, null, { list: resp[0] });
});

router.get("/daily-summary", auth, async (req, res) => {
  let { id } = req.decoded;
  let date0 = moment().subtract(30, "days").format("YYYY-MM-DDTHH:mm:ss");

  let resp = await db.sequelize.query(
    `select date( createdat) as date ,sum(winamount) as sumbetamount from betlogs where uid=${id} and createdat>='${date0}' group by date(createdat) `
  );
  if (resp && resp[0] && resp[0][0]) {
  } else {
    respok(res, null, null, { list: [] });
    return;
  }
  LOGGER(resp[0]);
  let [{ date, sumbetamount }] = resp[0];
  sumbetamount = sumbetamount * 10 ** 6;
  respok(res, null, null, {
//    list: [{ date: date, sumbetamount: sumbetamount }],
		list : resp[ 0 ] 
  });
});

router.get("/notice/insert", async (req, res) => {
  await db["users"]
    .findAll({
      raw: true,
    })
    .then((resp) => {
      resp.forEach((el) => {
        db["usernoticesettings"]
          .findOne({
            where: { uid: el.id },
            raw: true,
          })
          .then((res) => {
            if (!res) {
              db["usernoticesettings"].create({
                uid: el.id,
              });
            }
          });
      });
    });
});

module.exports = router;

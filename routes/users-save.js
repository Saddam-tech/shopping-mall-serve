var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype } = require("../utils/common");
const jwt = require("jsonwebtoken");
const { auth, softauth } = require("../utils/authMiddleware");
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
const { sendMessage, test } = require("../services/twilio");
const { sendEmailMessage } = require("../services/nodemailer");
const { v4: uuidv4 } = require("uuid");
const e = require("express");
const KEYS = Object.keys;
const ISFINITE = Number.isFinite;
const { getipaddress } = require("../utils/session");
require("dotenv").config({ path: "../.env" });
const { resolve_nettype } = require ( '../utils/nettypes' ) 
// let NETTYPE_DEF = 'BSC_MAIN NET' 
let NETTYPEID_DEF 

async function generateRefCode(uid, i = 0) {
  let code = String(crypto.createHash("md5").update(uid).digest("hex")).slice(
    i,
    i + 14 // 10
  );
  console.log(code);
  let findOne = await db["users"].findOne({ where: { referercode: code } });
  if (findOne) {
    console.log(i);
    return generateRefCode(uid, ++i);
  } else {
    return code;
  }
}

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  console.log(process.env.GOOGLE_CLIENT_ID);
  const payload = ticket.getPayload();
  return payload;
}

async function createJWT(jfilter) {
  let userwallet;
  let userinfo = await db["users"].findOne({
    where: {
      ...jfilter,
    },
    attributes: [
      "id",
      "firstname",
      "lastname",
      "email",
      "phone",
      "level",
      "referercode",
      "isadmin",
      "isbranch",
      "profileimage",
      "countryNum",
      "language",
      "mailVerified",
      "phoneVerified",
      "mybranch",
      "myreferer",
	'nettype' ,
	'nettypeid'
    ],
    raw: true,
  });

  await db["userwallets"]    .findOne({
      attributes: ["walletaddress"],
      where: {        uid: userinfo?.id,      },
      raw: true,
    })
    .then(async (result) => {
      if (!result) {
        let walletgen = await web3.eth.accounts.create(
          userinfo.id + "BINARY@##12"
        );
        await db["userwallets"].create({
          uid: userinfo.id,
          walletaddress: walletgen.address,
          privatekey: walletgen.privateKey,
					nettype : jfilter?.nettype || null
        });
        userwallet = walletgen.address;
      } else {
        userwallet = result.walletaddress;
      }
    });

  if (!userinfo) {
    return false;
  }
	let expiresIn = "48h"
	let resptoken = await db[ 'settings' ].findOne ({ raw: true , where : {name: 'TOKEN_EXPIRES_IN' , subkey: userinfo.nettype } } )
	if ( resptoken && resptoken.value ) {
		expiresIn = resptoken[ 'value' ]
	}
  let token = jwt.sign(
    {
      type: "JWT",
      ...userinfo,
      wallet: userwallet,
    },
    process.env.JWT_SECRET,
    {
      expiresIn , // : "48h", // 3h",
      // expiresIn: '24h',
      issuer: "EXPRESS",
    }
  );
  console.log("SECREEET", process.env.JWT_SECRET);
  return {
    tokenId: token,
    ...userinfo,
  };
}

/**
 * Check users auth status
 */
// const jwt = require('jsonwebtoken');
// require("do tenv").config();
router.get("/validate/token", (req, res) => {
  try {
    jwt.verify(
      `${req.headers.authorization}`,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          respok(res, null, null, { result: false });
          return;
        } else {
          respok(res, null, null, { result: true });
        }
      }
    );
  } catch (err) {
    respok(res, null, null, { result: false });
  }
});
router.get("/auth", auth, async (req, res) => {
  respok(res, "AUTH", null, { result: req.decoded });
});
const getnextdemouserid=async _=>{

}
router.get("/demo/token", async (req, res) => {
  let demo_uuid = uuidv4();
  let timestampunixstarttime = moment().unix();
  let timestampunixexpiry = timestampunixstarttime + 24 * 3600;
  db["demoUsers"].create({
    uuid: demo_uuid,
    timestampunixstarttime,
    timestampunixexpiry,
  });
  let token = jwt.sign({ type: "JWT", demo_uuid }, process.env.JWT_SECRET, {
    expiresIn: "24h",
    issuer: "EXPRESS",
  });
  // let ipaddr = requestIp.getClientIp(req).replace('::ffff:', '');
  // let ipinfo = lookup(ipaddr);
  // let temp_uid = ipaddr.split('.').join('');
  // await db['loginhistories'].create({
  //   uid: temp_uid,
  //   ipaddress: ipaddr,
  //   deviceos: platform + ' / ' + os,
  //   browser: browser,
  //   country: ipinfo.country,
  //   status: ipinfo.city,
  // });

  await db["demoUsers"].findOne({
      where: { uuid: demo_uuid },
      raw: true,
    })
    .then((resp) => {
      if (resp) {
        respok(res, "DEMO/TOKEN", null, { token });
        return;
      }
			else {
				false && db['demoUsers' ].create ( {					uuid : demo_uuid 				} )
			}
    });

  await db["balances"].create({
    uuid: demo_uuid,
    total: 1000000000,
    locked: 0,
    avail: 1000000000,
    typestr: "DEMO",
    isMember: 0,
  });
  db["usernoticesettings"].create({
    uuid: demo_uuid,
    betend: 1,
    orderrequest: 1,
  });
  respok(res, "DEMO/TOKEN", null, { token });
});

router.get("/auth/demo", auth, (req, res) => {
  respok(res, "AUTH/DEMO", null, { result: req.decoded });
});

/**
 * Refresh token
 */

router.get("/refresh", auth, async (req, res) => {
  let { id } = req.decoded;
  let jwt = createJWT({ id }); // refresh
  respok(res, "REFRESHED", null, { tokenId: jwt });
});
/**
 * EDIT users
 */

router.patch("/edit/:type", auth, async (req, res) => {
  let { type } = req.params;
  let { refcode, firstname, lastname } = req.body;
  let { id } = req.decoded;
  console.log(req.decoded);
  if (type == "ref") {
    let myreferer = await db["users"].findOne({
      where: { referercode: refcode },
    });
    if (!myreferer) {
      resperr(res, "REFERER-NOT-FOUND");
      return;
    }
    await db["users"].update(
      { myreferer: myreferer.id, mybranch: myreferer["mybranch"] },
      { where: { id } }
    );
    db["referrals"]
      .create({
        referer_uid: myreferer.id,
        referral_uid: id,
      })
      .then(async (_) => {
        if (myreferer.isadmin == 1) {
          await db["users"].update(
            { isbranch: 1, myreferer: myreferer.id },
            { where: { id } }
          );
        }
        let _jtoken = await createJWT({ id }); // patch edit/type
        respok(res, "EDITED", null, { result: _jtoken });
        return;
      });
  } else if (type == "userinfo") {
    db["users"]
      .update({
        firstname,
        lastname,
      })
      .then((_) => {
        respok(res, "EDITED");
        return;
      });
  } else if (type == "email") {
  } else if (type == "phone") {
  }
});

/*
 * Check if user referred or not
 */

router.get("/refchk", auth, async (req, res) => {
  let { id } = req.decoded;

  let ref = await db["referrals"].findOne({ where: { referral_uid: id } });

  if (ref) {
    resperr(res, "ALREADY-REGISTERED");
    return;
  } else {
    respok(res, "REF-REQUIRED");
    return;
  }
});
const gethqid = async (_) => {
  let { id } = await db["users"].findOne({ raw: true, where: { isadmin: 2 } });
  return id;
};
/* * REGISTER ENDPOINT */
router.post("/signup/:type", async (req, res) => {
  let transaction = await db.sequelize.transaction();
  let { type } = req.params;
  let { browser, os, platform } = req.useragent;
  let { countryNum, phone, password, email, token, refcode } = req.body;
  let jwttoken;
/**	let nettypeid;	let {nettype}=req.query
	if(nettype){		let resp = await db['nettypes'].findOne( { raw: true, where : { name : nettype} } );		nettypeid = resp?.id	}
	else {nettype = NETTY PE_DEF ;  nettypeid = NETTYPEID_DEF } //	else{ resperr(res,'ARG-MISSING',null,{reason:'nettype query string'}); return}
*/
	let { nettype , nettypeid } = resolve_nettype ( {req } )
  /////////////////////////////////////////////// PRE CHECK ///////////////////////////////////////////////
  if (refcode) {
    let referer = await db["users"].findOne({
      where: { referercode: refcode , nettype },
      raw: true,
    });
    if (referer) {
    } else {
      resperr(res, "INVALID-CODE");
      return;
    }
  }
  /////////////////////////////////////////////// GOOGLE LOGIN REGISTER ///////////////////////////////////////////////
  if (type == "google") {
    //GOOGLE-LOGIN
    if (!token) {
      resperr(res, "INVALID-DATA");
      return;
    }
    let respond = await verify(token);
    let { email, given_name, family_name, picture, email_verified, sub } =
      respond;
    if (!email || !email_verified) {
      resperr(res, "WRONG-TOKEN");
      return;
    }
    let findUser = await db["users"].findOne({
      where: { email: email , nettype },
      raw: true,
    });
    if (findUser) {
      if (findUser.oauth_type == 0) {
        //respok and lead to login
        jwttoken = createJWT({ oauth_id: findUser.oauth_id , nettype }); // google login
      } else {
        //resperr failed
        resperr(res, "CREATED-NON-GOOGLE-ACCOUNT");
        return;
      }
    } else {
      // ACCOUNT DOES NOT EXIST
      db["users"]        .create({
          email: email,
          firstname: given_name,
          lastname: family_name,
          oauth_type: 0,
          oauth_id: sub,
          profileimage: picture,
					nettypeid  ,
					nettype
        })
        .then(async (new_acc) => {
          let refcodegen = await generateRefCode("" + new_acc.id);
          await db["users"].update( 
            { referercode: String(refcodegen) },
            { where: { id: new_acc.id } }
          );
          //respok and lead to login
          await db["balances"]            .bulkCreate([
              {                uid: new_acc.id,                typestr: "DEMO",              },
              {                uid: new_acc.id,                typestr: "LIVE",              },
            ])
            .then(async (_) => {
              //TOKEN GENERATE
              jwttoken = createJWT({ id: new_acc.id , nettype }); // google create
            });
          db["usernoticesettings"].create({
            uid: new_acc.id,
            betend: 1,
            orderrequest: 1,
          });
        });
    }
    /////////////////////////////////////////////// EMAIL REGISTER ///////////////////////////////////////////////
  } else if (type == "email") {
    //EMAIL LOGIN
    if (!email || !password) {
      resperr(res, "INVALID-DATA");
      return;
    }
    try {
      await db.sequelize.transaction(async (t) => {
        let respond = await db["users"].findOne({
          where: { email: email , nettype },
          transaction: t,
        });
        if (respond) {
          resperr(res, "EMAIL-EXIST");
          return;
        }
        let new_acc = await db["users"].create(
          { email: email, password , nettype , nettypeid },
          { transaction: t }
        );
        let refcodegen = await generateRefCode("" + new_acc.id);
        await db["users"].update(
          {            referercode: String(refcodegen),          },
          { where: { id: new_acc.id }, transaction: t }
        );
        await db["balances"].bulkCreate(
          [ { uid: new_acc.id, typestr: "DEMO", nettype, nettypeid           },
            { uid: new_acc.id, typestr: "LIVE", nettype, nettypeid            },
          ],
          {            transaction: t,
          }
        );
        db["usernoticesettings"].create({
          uid: new_acc.id,
          betend: 1,
          orderrequest: 1,
        });
      });
    } catch (err) {
      respok(res, "FAILED");
    }
    //TOKEN GENERATE
    jwttoken = createJWT({ email: email, password , nettype });
  } else if (type == "phone") {
    // MOBILE LOGIN
    if (!phone || !password || !countryNum) {
      resperr(res, "INVALID-DATA");
      return;
    }
    let respond = await db["users"].findOne({
      where: { phone: phone, countryNum: countryNum , nettype },
    });
    if (respond) {
      resperr(res, "PHONE-EXIST");
      return;
    }
    await db["users"]      .create({
        phone: phone,
        countryNum: countryNum,
        password,
				 nettypeid ,
				nettype ,
      })
      .then(async (new_acc) => {
        let refcodegen = await generateRefCode("" + new_acc.id);
        console.log(refcodegen);
        await db["users"].update(
          {            referercode: String(refcodegen),          },
          {            where: { id: new_acc.id },          }
        );
        db["balances"].bulkCreate([
          { uid: new_acc.id, typestr: "DEMO", nettype, nettypeid },
          { uid: new_acc.id, typestr: "LIVE", nettype, nettypeid },
        ]);
        db["usernoticesettings"].create({
          uid: new_acc.id,
          betend: 1,
          orderrequest: 1,
        });
      });
    //TOKEN GENERATE
    jwttoken = createJWT({ phone, countryNum, password , nettype });
  } else {
    resperr(res, "INVALID-LOGIN-TYPE");
    return;
  }
  let jtoken = await jwttoken;
  if (jtoken) {
    if (refcode) {
      let referer = await db["users"].findOne({
        where: { referercode: refcode , nettype           },
        raw: true,                               
      });
      if (referer) {
        if (referer.isadmin == 1) {
          await db["referrals"].create({
            referer_uid: referer.id,
            referral_uid: jtoken.id,
            isRefererBranch: 1, nettype , nettypeid
          }); //            .then(async (_) => {
          await db["users"].update(
            { isbranch: 1, myreferer: referer.id, mybranch: referer.id },
            { where: { id: jtoken.id } }
          );
          //            });
        } else if (referer.isadmin == 3) {
          await db["referrals"].create({
            referer_uid: referer.id,
            referral_uid: jtoken.id,
            isRefererBranch: 1 , nettype , nettypeid
          }); //            .then(async (_) => {
          await db["users"].update(
            { isbranch: 2, myreferer: referer.id, mybranch: referer.id },
            { where: { id: jtoken.id } }
          );
          //            });
        } else if (referer.isadmin == 2) {
          await db["referrals"].create({
            referer_uid: referer.id,
            referral_uid: jtoken.id,
            isRefererBranch: 2 , nettype , nettypeid
          });
          await db["users"].update(
            { isbranch: 0, myreferer: referer.id, mybranch: referer.id },
            { where: { id: jtoken.id } }
          );
        } else if (referer.isadmin == 0) {
          let { mybranch } = referer; //					let { isadmin } = db['users'].findOne ( {raw: true , where : { id : mybranch } } )
          //					if ( mybranch ) {}
          //					else { mybranch = await gethqid () }
          await db["referrals"].create({
            referer_uid: referer.id,
            referral_uid: jtoken.id,
            isRefererBranch: 0, nettype , nettypeid
          });
          await db["users"].update(
            { myreferer: referer.id, mybranch: mybranch ? mybranch : null },
            { where: { id: jtoken.id } }
          );
        }
      } else {
        resperr(res, "INVALID-CODE");
        return;
      }
    }
    await db["userwallets"]      .findOne({        where: {          uid: jtoken.id,
        },
      })
      .then(async (res) => {
        if (!res) {
          let walletgen = await web3.eth.accounts.create(
            jtoken.id + "BINARY@##12"
          );
          await db["userwallets"].create({
            uid: jtoken.id,
            walletaddress: walletgen.address,
            privatekey: walletgen.privateKey, 
						nettype , 
						nettypeid
          });
        }
      });
    let ipaddr = requestIp.getClientIp(req).replace("::ffff:", "");
    let ipinfo = lookup(ipaddr);
    await db["loginhistories"].create({
      uid: jtoken.id,
      ipaddress: ipaddr,
      deviceos: platform + " / " + os,
      browser: browser,
      country: ipinfo.country,
      status: ipinfo.city, nettype , nettypeid
    });
    _jtoken = await createJWT({ id: jtoken.id , nettype });
    respok(res, "TOKEN_CREATED", null, { result: _jtoken });
    return;
  } else {
    resperr(res, "USER-NOT-FOUND");
    return;
  }
  // if (jtoken) {
  // if (refcode) {
  //   let referer = await db['branchusers'].findOne({
  //     raw: true,
  //     where: { referercode: refcode },
  //   });
  //   if (referer) {
  //   } else {
  //     resperr(res, 'INVALID-CODE');
  //     return;
  //   }
  //   switch (referer.typestr) {
  //     case 'branch-chinese':
  //       await db['refer rals'].create({
  //         referer_uid: referer.id,
  //         referral_uid: jtoken.id,
  //         isRefererBranch: 1,
  //       });
  //       await db['users'].update(
  //         { isbranch: 1 },
  //         { where: { id: jtoken.id } }
  //       );
  //       break;
  //     case 'branch-common':
  //       await db['referr als'].create({
  //         referer_uid: referer.id,
  //         referral_uid: jtoken.id,
  //         isRefererBranch: 1,
  //       });
  //       await db['users'].update(
  //         { isbranch: 2 },
  //         { where: { id: jtoken.id } }
  //       );
  //       break;
  //     case 'hq':
  //       await db['referra ls'].create({
  //         referer_uid: referer.id,
  //         referral_uid: jtoken.id,
  //         isRefererBranch: 0,
  //       });
  //       break;
  //   }
  // }
}); // end signup ep
/**
 * LOGIN ENDPOINT
 */
///////////////////////////////// telegram /////////////////////////////////
const TelegramBot = require("node-telegram-bot-api");
const token = "5476345761:AAHu7pgjWdMFXZF-FvugQI3pM9t12FWI3Rw";
const bot = new TelegramBot(token);
const bot_option = true;
///////////////////////////////// telegram /////////////////////////////////

router.post("/login/:type", async (req, res) => {
  const NOW = moment(new Date()).format("MM-DD HH:mm:ss");
  let { type } = req.params;
  let { countryNum, phone, password, email, user, token } = req.body;
  let { browser, os, platform } = req.useragent;
  let jwttoken;
  let isFirstSocial = false;
	let {nettype , nettypeid} = resolve_nettype ( { req } )
  /////////////////////////////////////////////// GOOGLE LOGIN ///////////////////////////////////////////////
  if (type == "google") {
    if (!token) {
      resperr(res, "INVALID-DATA");
      return;
    }
    let respond = await verify(token);
    let {
      email: gmail,
      given_name,
      family_name,
      picture,
      email_verified,
      sub,
    } = respond;
    if (!gmail || !email_verified) {
      resperr(res, "WRONG-TOKEN");
      return;
    }
    let findUser = await db["users"].findOne({
      where: { email: gmail 
				, nettype
			},
      raw: true,
    });

    console.log("DATABASE_USER", findUser);

    if (findUser?.active === 0) {
      resperr(res, "ACCESS-NOT-ALLOWED");
      return;
    }
    if (findUser) {
      if (findUser.oauth_type == 0) {
        //respok and lead to login
        jwttoken = createJWT({ oauth_id: findUser.oauth_id });
      } else {
        //resperr failed
        resperr(res, "CREATED-NON-GOOGLE-ACCOUNT");
        return;
      }
    } else {
      // ACCOUNT DOES NOT EXIST AND CREATE NEW ONE
      isFirstSocial = true;
      await db["users"]        .create({
          email: gmail,
          firstname: given_name,
          lastname: family_name,
          oauth_type: 0,
          oauth_id: sub,
          profileimage: picture,
					nettype , nettypeid
        })
        .then(async (new_acc) => {
          let refcodegen = await generateRefCode("" + new_acc.id);
          await db["users"].update(
            {              referercode: refcodegen,            },
            {              where: { id: new_acc.id },            }
          );
          //respok and lead to login
          await db["balances"]            .bulkCreate([
              { uid: new_acc.id, typestr: "DEMO",	nettype , nettypeid              },
              { uid: new_acc.id, typestr: "LIVE",	nettype , nettypeid              },
            ])
            .then(async (_) => {
              //TOKEN GENERATE
            });
          jwttoken = createJWT({ oauth_id: sub });
        });
    }
    if (bot_option) {
      // false &&
      //   bot.sendM essage(
      //     -1001775593548,
      //     `[Google Login]
      //    time: ${NOW}
      //    id: ${findUser.id}
      //    email: ${email}
      // 	 ipaddress : ${getipaddress(req)}
      //   `
      //   );
    }
    /////////////////////////////////////////////// EMAIL LOGIN ///////////////////////////////////////////////
  } else if (type == "email") {
    if (!email || !password) {
      resperr(res, "INVALID-DATA");
      return;
    }
    let emailChk = await db["users"].findOne({
      where: { email: email , nettype },
      raw: true,
    });

    if (emailChk && emailChk.active === 0) {
      resperr(res, "ACCESS-NOT-ALLOWED");
      return;
    }
    if (!emailChk) {
      resperr(res, "EMAIL-DOESNT-EXIST");
      return;
    }
    if (emailChk.password != password) {
      resperr(res, "INVALID-PASSWORD");
      return;
    }
    jwttoken = createJWT({ email: email, password });
    if (bot_option) {
      // bot.sendMes sage(
      //   -1001775593548,
      //   `[Email Login]
      //    time: ${NOW}
      //    id: ${emailChk.id}
      //    email: ${email}
      // 	 ipaddress : ${getipaddress(req)}
      //   `
      // );
    }
    /////////////////////////////////////////////// PHONE LOGIN ///////////////////////////////////////////////
  } else if (type == "phone") {
    if (!phone || !password || !countryNum) {
      resperr(res, "INVALID-DATA");
      return;
    }
    let phoneChk = await db["users"].findOne({
      where: { phone, countryNum , nettype },
      raw: true,
    });
    if (!phoneChk) {
      resperr(res, "PHONE-NUMBER-DOESNT-EXIST");
      return;
    }
    if (phoneChk && phoneChk?.active === 0) {
      resperr(res, "ACCESS-NOT-ALLOWED");
      return;
    }
    /**    if (!phoneChk) {
      resperr(res, 'PHONE-NUMBER-DOESNT-EXIST');
      return;
    } */
    if (phoneChk.password != password) {
      resperr(res, "INVALID-PASSWORD");
      return;
    }
    jwttoken = createJWT({ phone, password });
    if (bot_option) {
      // bot.sendM essage(
      //   -1001775593548,
      //   `[Phone Login]
      //    time: ${NOW}
      //    id: ${phoneChk.id}
      //    phone: ${countryNum}${phone}
      //   `
      // );
    }
  } else {
    resperr(res, "INVALID-LOGIN-TYPE");
    return;
  }
  /////////////////////////////////////////////// GENERAL LOGIN ///////////////////////////////////////////////
  let jtoken = await jwttoken;
  console.log("JTOKEN**", jtoken);
  if (jtoken) {
    let ref = await db["referrals"].findOne({
      where: { referral_uid: jtoken.id },
    });
    if (ref) {
      ref = true;
    } else {
      ref = false;
    }
    let ipaddr = requestIp.getClientIp(req).replace("::ffff:", "");
    let ipinfo = lookup(ipaddr);
    await db["loginhistories"].create({
      uid: jtoken.id,
      ipaddress: ipaddr,
      deviceos: platform + " / " + os,
      browser: browser,
      country: ipinfo.country,
      status: ipinfo.city,
			nettype , nettypeid
    });
    res.cookie("token", jtoken);
    respok(res, "TOKEN_CREATED", null, { result: jtoken, ref, isFirstSocial });
    return;
  } else {
    resperr(res, "USER-NOT-FOUND");
    return;
  }
  // let jwttoken = createJWT(userinfo)
  // respok(res, 'TOKEN_CREATED', null, {token: jwttoken})
});

router.get("/notice/setting", auth, async (req, res) => {
  if (req.decoded.id) {
    let { id } = req.decoded;
    await db["usernoticesettings"]
      .findOne({
        where: { uid: id },
        raw: true,
      })
      .then((resp) => {
        respok(res, null, null, { resp });
      });
  } else if (req.decoded.demo_uuid) {
    await db["usernoticesettings"]
      .findOne({
        where: { uuid: req.decoded.demo_uuid },
        raw: true,
      })
      .then((resp) => {
        respok(res, null, null, { resp });
      });
  }
});

router.patch("/notice/set", auth, async (req, res) => {
  let { id } = req.decoded;
  let { betend, orderrequest, emailnotice, latestnews, questions } = req.body;
  let jfilter = {};
  jfilter["betend"] = betend;
  jfilter["orderrequest"] = orderrequest;
  jfilter["emailnotice"] = emailnotice;
  jfilter["latestnews"] = latestnews;
  jfilter["questions"] = questions;
  await db["usernoticesettings"]
    .update({ ...jfilter }, { where: { uid: id } })
    .then((resp) => respok(res, "CHANGED"));
});

router.patch("/change/password/:type", async (req, res) => {
  let { type } = req.params;
  let { password, confirmPassword, email, countryNum, phone } = req.body;
	let { nettype } = resolve_nettype ( { req } )
  if (password !== confirmPassword) {
    resperr(res, "The password you entered does not match.");
  }
  let user;
  if (type === "email") {
    user = await db["users"].findOne({
      where: { email: email , nettype },
      raw: true,
    });
    db["users"]      .update({ password: password }, { where: { id: user.id } })
      .then((resp) => {
        respok(res, "successfully changed");
      });
  }
  if (type === "phone") {
    user = await db["users"].findOne({
      where: { countryNum: countryNum, phone: phone , nettype },
      raw: true,
    });
    db["users"]
      .update({ password: password }, { where: { id: user.id } })
      .then((resp) => {
        respok(res, "successfully changed");
      });
  }
});
const { validateEmail } = require("../utils/validates");
router.post("/reset/password/:type", async (req, res) => {
  let { type } = req.params;
  let { email, countryNum, phone } = req.body;
	let { nettype } = resolve_nettype ( { req } )
  const randNum = "" + Math.floor(100000 + Math.random() * 900000);
  const timenow = moment().unix();
  let expiry = moment().add(10, "minute").unix();
  if (type === "email") {
    if (email) {
    } else {
      resperr(res, "ARG-MISSING");
      return;
    }
    if (validateEmail(email)) {
    } else {
      resperr(res, "ARG-INVALID");
      return;
    }

    let user = await db["users"]
      .findOne({ where: { email: email , nettype }, raw: true })
      .then((resp) => {
        if (!resp) {
          resperr(res, "NOT_EXIST_USER");
        } else {
          return resp;
        }
      });
    await sendEmailMessage(email, randNum);
    await db["verifycode"]
      .create({
        uid: user.id,
        code: randNum,
        type: "email",
        email: email,
        expiry,
      })
      .then((_) => {
        respok(res, "SENT");
      });
  } else if (type === "phone") {
    let user = await db["users"]
      .findOne({ where: { countryNum: countryNum, phone: phone  , nettype }, raw: true })
      .then((resp) => {
        if (!resp) {
          resperr(res, "NOT_EXIST_USER");
        } else {
          return resp;
        }
      });
    // await sen dMessage(countryNum + phone, randNum);
    await db["verifycode"]
      .create({
        uid: user?.id ? user.id : 0, // null,
        code: randNum,
        type: "phone",
        countryNum: countryNum,
        phone: phone,
        expiry,
      })
      .then((_) => {
        respok(res, "SENT");
      });
  }
});

router.post("/reset/verify/:type/:code", async (req, res) => {
  let timenow = moment().unix();
  let { type, code } = req.params;

  if (type === "email") {
    await db["verifycode"]
      .findOne({
        where: { code, type: "email" },
        raw: true,
      })
      .then(async (resp) => {
        if (!resp) {
          resperr(res, "INVALID_CODE");
        } else {
          if (resp.expiry < timenow) {
            resperr(res, "CODE_EXPIRED");
          } else {
            respok(res, "VALID_CODE");
          }
        }
      });
  } else if (type === "phone") {
    await db["verifycode"]
      .findOne({
        where: { code, type: "phone" },
        raw: true,
      })
      .then(async (resp) => {
        if (!resp) {
          resperr(res, "INVALID_CODE");
        } else {
          if (resp.expiry < timenow) {
            resperr(res, "CODE_EXPIRED");
          } else {
            respok(res, "VALID_CODE");
          }
        }
      });
  }
});

router.post("/send/verification/:type", auth, async (req, res) => {
  let { type } = req.params;
  let { id } = req.decoded;
  let { phone, email, countryNum } = req.body;
  const randNum = "" + Math.floor(100000 + Math.random() * 900000);
  const timenow = moment().unix();
  let expiry = moment().add(10, "minute").unix();
  if (type === "phone") {
    //PHONE
    let phoneNum = countryNum + phone;

    console.log(countryNum + phone, randNum);
    let b = await test.phone(phoneNum, randNum);
    console.log(b);
    // let a = await sendMessage(countryNum + phone, randNum);

    await db["verifycode"]
      .create({
        uid: id,
        code: randNum,
        type: "phone",
        countryNum: countryNum,
        phone: phone,
        expiry,
      })
      .then((_) => {
        respok(res, "SENT");
      });
  } else if (type === "email") {
    //mail
    await sendEmailMessage(email, randNum);
    await db["verifycode"]
      .create({
        uid: id,
        code: randNum,
        type: "email",
        email: email,
        expiry,
      })
      .then((_) => {
        respok(res, "SENT");
      });
  }
});

router.post("/verify/:type/:code", auth, async (req, res) => {
  let timenow = moment().unix();
  let jwttoken;
  let { id } = req.decoded;
  let { type, code } = req.params;

  if (type === "email") {
    await db["verifycode"]
      .findOne({
        where: { code, type: "email" },
        raw: true,
      })
      .then(async (resp) => {
        if (!resp) {
          resperr(res, "INVALID_CODE");
        } else {
          if (resp.expiry < timenow) {
            resperr(res, "CODE_EXPIRED");
          } else {
            await db["users"]
              .update({ mailVerified: 1, email: resp.email }, { where: { id } })
              .then(async (respdata) => {
                jwttoken = await createJWT({ id, email: resp.email });
              });

            respok(res, "VALID_CODE", null, { result: jwttoken });
          }
        }
      });
  } else if (type === "phone") {
    await db["verifycode"]
      .findOne({
        where: { code, type: "phone" },
        raw: true,
      })
      .then(async (resp) => {
        if (!resp) {
          resperr(res, "INVALID_CODE");
        } else {
          if (resp.expiry < timenow) {
            resperr(res, "CODE_EXPIRED");
          } else {
            await db["users"]
              .update(
                {
                  phoneVerified: 1,
                  phone: resp.phone,
                  countryNum: resp.countryNum,
                },
                { where: { id } }
              )
              .then(async (respdata) => {
                // console.log(resp);
                jwttoken = await createJWT({ id, phone: resp.phone, countryNum: resp.countryNum, });
              });
            respok(res, "VALID_CODE", null, { result: jwttoken });
          }
        }
      });
  }
});

router.get("/my/position", softauth, async (req, res) => {
  let id;
  let result = {};
  if (!req.decoded) {
    result["cashback"] = 0;
  } else {
    id = req.decoded.id;

    let date0 = moment().startOf("days").unix();
    let date1 = moment().endOf("days").unix();
    let start = moment().startOf("days");
    let end = moment().endOf("days");
    // let id = 114;
    // let { id } = req.decoded;
    // if (Number.isFinite(+id)) {
    // } else {
    //   resperr(res, 'PLEASE-LOGIN');
    //   return;
    // }
    const I_LEVEL_DISP = ["Bronze", "Sliver", "Gold", "Diamond"];
    //	let myi nfo
    let today_betamount;
    let today_lose_amount;
    let today_win_amount;
    // await db['']
    let promises = [];
    // let userLevel = ['Bronze', 'Silver', 'Gold', 'Diamond'];
    await db["users"]
      .findOne({
        where: { id },
        raw: true,
      })
      .then(async (resp) => {
        //  my info = resp
        let name;
        await db["levelsettings"]
          .findOne({
            where: { level: resp.level },
            raw: true,
          })
          .then((resp) => {
            result["level_img"] = resp.imgurl;
            result["level_str"] = I_LEVEL_DISP[resp.level];
          });
        if (!resp.firstname && !resp.lastname) {
          name = resp.id;
        } else {
          name = `${resp.lastname} ${resp.firstname}`;
        }

        result["name"] = name;
        result["level"] = resp.level;
        if (resp.isadmin === 0) {
          await db["feesettings"]
            .findOne({
              where: { key_: `FEE_TO_REFERER_${I_LEVEL[resp.level]}` },
              raw: true,
            })
            .then((resp) => {
              if (resp) {
                result["cashback"] = resp.value_ / 100;
              } else {
                result["cashback"] = 0;
              }
            });
        } else if (resp.isadmin === 1 || resp.isadmin === 3) {
          await db["feesettings"]
            .findOne({
              where: { key_: "FEE_TO_BRANCH" },
              raw: true,
            })
            .then((resp) => {
              if (resp) {
                result["cashback"] = resp.value_ / 100;
              } else {
                result["cashback"] = 0;
              }
            });
        } else if (resp.isadmin === 2) {
          await db["feesettings"]
            .findOne({
              where: { key_: "FEE_TO_ADMIN" },
              raw: true,
            })
            .then((resp) => {
              result["cashback"] = resp.value_ / 100;
            });
        }
      });

    await db["balances"]      .findOne({
        where: { uid: id, typestr: "LIVE" },
        raw: true,
      })
      .then((resp) => {
				if ( resp ) {}
				else { return null }
        let { total, avail, locked } = resp;
        result["total"] = (total / 10 ** 6).toFixed(2);
        result["safeBalance"] = (avail / 10 ** 6).toFixed(2);
      });

    await db["betlogs"]
      .findAll({
        where: {
          uid: id,
          expiry: { [Op.gte]: date0, [Op.lte]: date1 },
          type: "LIVE",
        },
        raw: true,
      })
      .then((resp) => {
        let today_betamount = 0;
        let today_lose_amount = 0;
        let today_win_amount = 0;

        resp.forEach((bet) => {
          let { status, amount, winamount } = bet;
          winamount = +winamount;
          amount = amount / 10 ** 6;
          today_betamount += amount;
          if (status === 0) {
            today_lose_amount += amount;
          } else if (status === 1) {
            today_win_amount += winamount;
          }
        });

        result["today_betamount"] = today_betamount;
        result["today_lose_amount"] = today_lose_amount;
        result["today_win_amount"] = Number(today_win_amount);
        if (today_betamount === 0) {
          result["profit_today"] = 0;
        } else {
          result["profit_today"] = (
            (today_win_amount / today_betamount) *
            100
          ).toFixed(2);
        }
      });

    await db["betlogs"]
      .findAll({
        where: { uid: id, type: "LIVE" },
        raw: true,
      })
      .then(async (resp) => {
        let total_bet_count = 0;
        let total_betamount = 0;
        let total_lose_amount = 0;
        let total_win_amount = 0;
        let net_turnover = 0;
        let min_trade_amount = 0;
        let max_trade_amount = 0;
        let max_trade_profit = 0;
        let max_profit = 0;
        let win_count = 0;

        let total_feeamount = 0;
        await db["logfees"]
          .findAll({
            where: { payer_uid: id },
            raw: true,
            attributes: [
              [db.Sequelize.fn("SUM", db.Sequelize.col("feeamount")), "sum"],
            ],
          })
          .then((resp) => {
            let [{ sum }] = resp;
            total_feeamount = sum / 10 ** 6;
          });

        resp.forEach((bet, i) => {
          let { status, amount, diffRate, winamount } = bet;
          winamount = +winamount;
          amount = amount / 10 ** 6;
          total_bet_count += 1;
          // 최대 베팅금
          if (amount > max_trade_amount) {
            max_trade_amount = amount;
          }
          //최소 베팅금
          if (i === 0 || amount < min_trade_amount) {
            min_trade_amount = amount;
          }

          //최대 수익
          if (status === 1 && max_profit < Number(winamount)) {
            max_profit = Number(winamount);
          }

          total_betamount += amount;

          if (status === 0) {
            total_lose_amount += amount;
          } else if (status === 1) {
            win_count += 1;
            total_win_amount += Number(((amount * diffRate) / 100).toFixed(2));
            net_turnover += winamount;
          }
        });

        result["deal"] = total_bet_count;
        result["trading_turnover"] = total_betamount;
        // result['total_lose_amount'] = total_lose_amount;
        // total_win_amount = Number(total_win_amount)
        result["total_win_amount"] = total_win_amount;
        if (total_betamount === 0) {
          result["total_profit"] = 0;
        } else {
          result["total_profit"] = (
            (total_win_amount / total_betamount) *
            100
          ).toFixed(2);
        }
        result["max_trade_amount"] = max_trade_amount;
        result["min_trade_amount"] = min_trade_amount;
        result["max_profit"] = max_profit;
        result["net_turnover"] = net_turnover;
        result["hedged_trades"] = total_lose_amount;
        if (win_count === 0) {
          result["average_profit"] = 0;
        } else {
          result["average_profit"] = (total_win_amount / win_count).toFixed(2);
        }
      });

    await Promise.all(promises);
  }
  // 	result = { ... result , ... myinfo }
  let myinfo, mywallet;
  if (id) {
    myinfo = await db["users"].findOne({ raw: true, where: { id } });
    mywallet = await db["userwallets"].findOne({
      raw: true,
      where: { uid: id },
    });
  }
  delete mywallet["privatekey"];
  LOGGER("@myinfo", myinfo);
  respok(res, null, null, { result, myinfo, mywallet }); // , myinfo
});

router.get("/balance", auth, async (req, res) => {
  let { type } = req.params;
  let id;
  if (req.decoded.id) {
    id = req.decoded.id;
    db["balances"]      .findAll({
        where: {
          uid: id,
        },
      })
      .then((result) => {
        let respdata = {};
        result.map((v) => {
          respdata[v.typestr] = {
            total: v.total,
            avail: v.avail,
            locked: v.locked,
          };
        });
        respok(res, null, null, { respdata });
      });
  } else {
    let uuid = req.decoded.demo_uuid;
    db["balances"]      .findAll({
        where: {
          uuid,
        },
      })
      .then((result) => {
        let respdata = {};
        result.map((v) => {
          respdata[v.typestr] = {
            total: v.total,
            avail: v.avail,
            locked: v.locked,
          };
        });
        respok(res, null, null, { respdata });
      });
  }
});
const EXPONENT_FOR_PREC_DEF = 6 
router.get("/query/:tblname/:offset/:limit", auth, (req, res) => {
  let { startDate, endDate } = req.query;
  let { tblname, offset, limit } = req.params;
  let { key, val } = req.query;
  let { id } = req.decoded;
  let jfilter = {};
  if (key && val) {
    jfilter[key] = val;
    if (val == "DEPOSIT") {
      jfilter[key] = { [Op.or]: ["DEPOSIT", "LOCALEDEPOSIT"] };
    }
  }
  if (startDate && endDate) {
    jfilter = {
      ...jfilter,
      createdat: {
        [Op.between]: [startDate, endDate],
      },
    };
  }

  db[tblname]
    .findAndCountAll({
      where: {
        uid: id,
        ...jfilter,
      },
      offset: parseInt(+offset),
      limit: parseInt(+limit),
      order: [["id", "DESC"]],
    })
    .then((respdata) => {
      respdata.rows.map((el) => {
        let { amount, localeAmount } = el;
        amount = amount / 10 ** EXPONENT_FOR_PREC_DEF ;
        if (amount && localeAmount) {
          localeAmount = localeAmount / 10 ** EXPONENT_FOR_PREC_DEF ;
          el["localeAmount"] = localeAmount;
        } else {
        }
        el["amount"] = amount;
      });
      respok(res, null, null, { respdata });
    });
});

router.get("/betlogs/:type/:offset/:limit", auth, async (req, res) => {
  let { id } = req.decoded;
  let { type, offset, limit } = req.params;
  let { startDate, endDate, searchkey } = req.query;
  let jfilter = {};
  console.log("startDate", moment(startDate).format("YYYY-MM-DD HH:mm:ss"));
  if (startDate && endDate) {
    jfilter = {
      ...jfilter,
      createdat: {
        [Op.between]: [startDate, endDate],
      },
    };
  } // id = 114;
  if (searchkey && getobjtype(searchkey) == "String" && searchkey.length) {
    //		let jfilter_local={}
    //	jfilter_local ['name'] = searchkey
    // jfilter_local ['baseAsset' ] = searchkey
    let listassets;
    listassets = await db["assets"].findAll({
      raw: true,
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${searchkey}%` } },
          { baseAsset: { [Op.like]: `%${searchkey}%` } },
        ],
      },
    });
    listassets = listassets.map((elem) => elem.id);
    listassets = listassets.map((assetId) => {
      return { assetId };
    });
    if (ISFINITE(+searchkey)) {
      listassets.push({ id: +searchkey });
    }
    LOGGER("@listassets", listassets);
    //		let jfilter_local_02 = {}
    //	jfilter_local_02[ [Op.or] ]= listassets
    //		jfilter = { ... jfilter , [Op.or] : listassets ... jfilter_local_02 }
    jfilter = { ...jfilter, [Op.or]: listassets };
  }
  offset = +offset;
  limit = +limit;
  let bet_log = await db["betlogs"]
    .findAndCountAll({
      where: {
        uid: id,
        type,
        ...jfilter,
      },
      raw: true,
      offset,
      limit,
      order: [["id", "DESC"]],
    })
    .then(async (resp) => {
      let promises = resp.rows.map(async (el) => {
        let { assetId, amount, diffRate, status, winamount } = el;
        amount = amount / 10 ** 6;
        winamount = +winamount;
        if (status === 0) {
          el["profit_amount"] = -1 * amount;
          el["profit_percent"] = -1 * 100;
        }
        if (status === 1) {
          let profit_amount = winamount;
          if (profit_amount === 0) {
            el["profit_amount"] = "0";
          } else {
            el["profit_amount"] = profit_amount;
          }
          el["profit_percent"] = profit_amount.toFixed(2);
        }

        if (status === 2) {
          el["profit_amount"] = "0";
          el["profit_percent"] = "0.00";
        }
        let assetName = await db["assets"]
          .findOne({ where: { id: assetId }, raw: true })
          .then((resp) => {
            el["name"] = resp.name;
          });
        return el;
      });
      await Promise.all(promises);
      respok(res, null, null, { bet_log: resp });
    });
});
router.put("/my/info", auth, async (req, res) => {
  let { firstname, lastname, password, language, nickname } = req.body; // , profileimage
  if (KEYS(req.body).length) {
  } else {
    resperr(res, "REQ-BODY-EMPTY");
    return;
  }
  let { id } = req.decoded;
  if (ISFINITE(+id)) {
  } else {
    resperr(res, "PLEASE-LOGIN", 58818);
    return;
  }
  delete req.body["id"];
  delete req.body["referercode"];
  delete req.body["uuid"];
  delete req.body["isadmin"];
  delete req.body["isbranch"];
  delete req.body["mailVerified"];
  delete req.body["phoneVerified"];
  delete req.body["active"];
  await db["users"]
    .update({ ...req.body }, { where: { id } })
    .then(async (resp) => {
      let jwt = await createJWT({ id }); // put my/info
      respok(res, "CHANGED", null, { token: jwt });
    });
});
router.patch("/profile", auth, async (req, res) => {
  let { firstName, lastName, email, password } = req.body;
  let { id } = req.decoded;
  let jwttoken;
  db["users"]
    .update(
      {        firstname: firstName,
        lastname: lastName,
        password: password,
      },
      {
        where: {          id,
        },
      }
    )
    .then(async (_) => {
      jwttoken = await createJWT({ id, firstname: firstName, lastname: lastName, });
      respok(res, "CHANGED", null, { jwttoken });
    });
});

router.get("/predeposit", auth, async (req, res) => {
  console.log("@@@@@@@@@@@@@@@@@@predeposit");
  let { id } = req.decoded;
  db["transactions"]
    .findOne({
      where: {
        uid: id,
        checked: 0,
      },
    })
    .then(async (result) => {
      // console.log('result@@@@@@@@@@@',result);
      result = false;
      if (result) {
        await result.update({ checked: 1 });
        respok(res, null, null, { respdata: result });
        return;
      } else {
        respok(res, "NOT-FOUND");
        return;
      }
    });
});

router.get(  "/myreferrals/:offset/:limit/:orderkey/:orderval", // logfees
  auth,
  async (req, res) => {
    // /:offset/:limit/:orderkey/:orderval
    let { id } = req.decoded;
    let { offset, limit, orderkey, orderval } = req.params;
    offset = +offset;
    limit = +limit;
    // id = 99;
    await db["referrals"]
      .findAndCountAll({
        where: { referer_uid: id },
        order: [[orderkey, orderval]],
        offset,
        limit,
        raw: true,
      })
      .then(async (resp) => {
        console.log(resp);
        let { rows, count } = resp;
        let promises = rows.map(async (v) => {
          let { referral_uid, createdat } = v;
          let referral_user = await db["users"].findOne({
            where: { id: referral_uid },
            raw: true,
          });

          let referral_user_trade_amount = await db["betlogs"].findAll({
            where: { uid: referral_uid },
            attributes: [
              [
                db.Sequelize.fn("SUM", db.Sequelize.col("amount")),
                "trade_amount",
              ],
            ],
            raw: true,
          });
          let referral_user_bet_profit = await db["betlogs"].findAll({
            where: { uid: referral_uid, status: 1 },
            attributes: [
              [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "profit"],
            ],
            raw: true,
          });
          let received = await db["logfees"]
            .findAll({
              where: {
                recipient_uid: id,
                payer_uid: referral_uid,
              },
              raw: true,
              attributes: [
                [db.Sequelize.fn("SUM", db.Sequelize.col("feeamount")), "sum"],
              ],
            })
            .then((resp) => {
              let [{ sum }] = resp;
              sum = sum / 10 ** 6;
              return sum;
            });

          let trade_amount =
            referral_user_trade_amount[0].trade_amount === null
              ? 0
              : referral_user_trade_amount[0].trade_amount / 10 ** 6;
          let profit =
            referral_user_bet_profit[0].profit === null
              ? 0
              : referral_user_bet_profit[0].profit / 10 ** 6;
          let referral_user_profit_percent = (
            (profit / trade_amount) *
            100
          ).toFixed(2);
          let profit_percent =
            referral_user_profit_percent === "NaN"
              ? 0
              : referral_user_profit_percent;
          v["referral_user"] = referral_user;
          v["trade_amount"] = trade_amount;
          v["profit"] = profit;
          v["profit_percent"] = profit_percent;
          v["received"] = received.toFixed(2);
        });
        await Promise.all(promises);
        respok(res, null, null, { resp });
      });
  }
);

router.get(  "/myreferrals/fee/log/:offset/:limit/:orderkey/:orderval", // logfees  // '/myrefe rrals/fee/log/:uid',
  auth,
  async (req, res) => {
    let { id } = req.decoded;
    let { limit, offset, orderkey, orderval } = req.params;
    offset = +offset;
    limit = +limit;

    await db["logfees"]
      .findAndCountAll({
        where: { recipient_uid: id, typestr: "FEE_TO_REFERER" },
        offset,
        limit,
        raw: true,
      })
      .then(async (resp) => {
        let { rows, count } = resp;
        let promises = rows.map(async (el) => {
          let { id: ID, feeamount, betamount, payer_uid } = el;
          console.log("feeamount", ID, feeamount);
          await db["users"]
            .findOne({
              where: { id: payer_uid },
              raw: true,
            })
            .then((resp) => {
              el["payer_info"] = resp;
            });
          await db["users"]
            .findOne({
              where: { id },
              raw: true,
            })
            .then(async (resp) => {
              let { level } = resp;
              let { value_ } = await db["feesettings"].findOne({
                where: { key_: `FEE_TO_REFERER_${I_LEVEL[level]}` },
                raw: true,
              });
              el["profit"] = (feeamount / 10 ** 6 / (value_ / 10000)).toFixed(
                2
              );
              el["cashback_percent"] = value_ / 100;
            });
          el["feeamount"] = (feeamount / 10 ** 6).toFixed(2);
          el["betamount"] = betamount / 10 ** 6;

          return el;
        });
        await Promise.all(promises);
        respok(res, null, null, { resp });
      });
    // await db['refe rrals']
    //   .findAndCountAll({
    //     where: { referer_uid: id },
    //     order: [[orderkey, orderval]],
    //     raw: true,
    //   })
    //   .then(async (resp) => {
    //     console.log(resp);
    //     let data = [];
    //     let promises = resp.rows.map(async (v) => {
    //       let { referral_uid } = v;
    //       // let referral_user = await db['users'].findOne({
    //       //   where: {id: referral_uid},
    //       //   raw: true
    //       // })
    //       let referral_user_logfee = await db['log fees'].findAndCountAll({
    //         where: { payer_uid: referral_uid, recipient_uid: id },
    //         offset,
    //         limit,
    //         raw: true,
    //       }).then((resp) => {
    //         let {rows, count} = resp;

    //       });
    //       // let cashback_percent = await db['users']
    //       //   .findOne({
    //       //     where: { id: referral_uid },
    //       //     raw: true,
    //       //   })
    //       //   .then(async (resp) => {
    //       //     let level = I_LEVEL[resp.level];
    //       //     return await db['feesettings']
    //       //       .findOne({
    //       //         where: { key_: `FEE_TO_REFERER_${level}` },
    //       //         raw: true,
    //       //       })
    //       //       .then((resp) => {
    //       //         return +resp.value_ / 100;
    //       //       });
    //       //   });
    //       // if (referral_user_logfee.length !== 0) {
    //       //   data.push({ referral_user_logfee, cashback_percent });
    //       // }
    //     });
    //     await Promise.all(promises);
    //     respok(res, null, null, { data });
    //   });
  }
);
router.get(  "/branch/:offset/:limit/:orderkey/:orderval",  auth,  async (req, res) => {
    let { offset, limit, orderkey, orderval } = req.params;
    let { id } = req.decoded;
    offset = +offset;
    limit = +limit;

    db["referrals"]
      .findAndCountAll({
        where: {
          referer_uid: id,
        },
        raw: true,
        offset,
        limit,
        order: [[orderkey, orderval]],
      })
      .then(async (resp) => {
        let { rows, count } = resp;
        let promises = rows.map(async (v) => {
          let { referral_uid, createdat } = v;
          await db["users"]
            .findOne({
              where: { id: referral_uid },
              raw: true,
            })
            .then((resp) => {
              v["referral_user"] = resp;
            });
          await db["users"]
            .findOne({
              where: { id },
              raw: true,
            })
            .then((resp) => {
              v["recommender"] = resp;
            });

          await db["transactions"]
            .findAll({
              where: { uid: referral_uid, typestr: "WITHDRAW" },
              attributes: [
                [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "sum"],
              ],
              raw: true,
            })
            .then((resp) => {
              if (resp) {
                let [{ sum }] = resp;
                v["total_withdraw_amount"] = sum / 10 ** 6;
              } else {
                v["total_withdraw_amount"] = 0;
              }
            });
          await db["transactions"]
            .findAll({
              where: { uid: referral_uid, typestr: "DEPOSIT" },
              attributes: [
                [db.Sequelize.fn("SUM", db.Sequelize.col("amount")), "sum"],
              ],
              raw: true,
            })
            .then((resp) => {
              if (resp) {
                let [{ sum }] = resp;
                v["total_deposit_amount"] = sum / 10 ** 6;
              } else {
                v["total_deposit_amount"] = 0;
              }
            });
          await db["balances"]            .findOne({
              where: { uid: referral_uid, typestr: "LIVE" },
              raw: true,
            })
            .then((resp) => {
              let possess;
              possess = resp.total / 10 ** 6;
              if (possess % 10 !== 0) {
                possess = possess.toFixed(2);
              }
              // v['possess'] = (resp.total / 10 ** 6).toFixed(2);
              v["possess"] = possess;
            });
          v["trade_amount"] =
            Number(v.total_deposit_amount) + Number(v.total_withdraw_amount);
        });
        await Promise.all(promises);
        respok(res, null, null, { resp });
      });
  }
);

router.get(  "/branch/fee/log/:offset/:limit/:orderkey/:orderval", // logfees
  auth,
  async (req, res) => {
    let { offset, limit, orderkey, orderval } = req.params;
    let { id } = req.decoded;
    let { searchkey, startDate, endDate } = req.query;
    let jfilter = {};
    let jfilter2 = {};
    offset = +offset;
    limit = +limit;
    if (startDate) {
      jfilter = {
        ...jfilter,
        createdat: {
          [Op.gte]: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
        },
      };
    }
    if (endDate) {
      jfilter = {
        ...jfilter,
        createdat: {
          [Op.lte]: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
        },
      };
    }
    if (startDate && endDate) {
      jfilter = {
        ...jfilter,
        createdat: {
          [Op.gte]: moment(startDate).format("YYYY-MM-DD HH:mm:ss"),
          [Op.lte]: moment(endDate).format("YYYY-MM-DD HH:mm:ss"),
        },
      };
    }
    let userList = [];
    if (searchkey) {
      await db["users"]
        .findAll({
          where: {
            email: {
              [Op.like]: `%${searchkey}%`,
            },
          },
          raw: true,
        })
        .then((resp) => {
          resp.map((user) => {
            let { id } = user;
            userList.push(id);
          });
        });
      jfilter = {
        ...jfilter,
        payer_uid: { [Op.in]: userList },
      };
    }
    db["logfees"]
      .findAndCountAll({
        where: { ...jfilter, recipient_uid: id },
        raw: true,
        offset,
        limit,
        order: [[orderkey, orderval]],
      })
      .then(async (resp) => {
        let { rows, count } = resp;
        let promises = rows.map(async (el) => {
          let { payer_uid, assetId, feeamount, betamount } = el;
          await db["users"]
            .findOne({
              where: { id: payer_uid },
              raw: true,
            })
            .then((resp) => {
              let { id } = resp;
              el["referral_user"] = resp;
            });
          // await db['users'].findOne({
          //   where: {id},
          //   raw: true,
          // }).then((resp) => {
          //   el['referer_user'] = resp
          // })
          let fee_percent;
          await db["feesettings"]
            .findOne({
              where: { key_: "FEE_TO_BRANCH" },
              raw: true,
            })
            .then((resp) => {
              fee_percent = resp.value_ / 10000;
              el["received_percent"] = resp.value_ / 100;
            });
          await db["assets"]
            .findOne({
              where: { id: assetId },
              raw: true,
            })
            .then((resp) => {
              el["assets"] = resp;
            });
          el["received_amount"] = (feeamount / 10 ** 6).toFixed(2);

          el["using"] = (betamount / 10 ** 6).toFixed(2);
          el["profit"] = (feeamount / 10 ** 6 / fee_percent).toFixed(2);
        });
        await Promise.all(promises);
        respok(res, null, null, { resp });
      });
  }
);

router.get("/my/fee/setting", auth, async (req, res) => {
  let { id } = req.decoded;
  // let id = 119;
  let user = await db["users"].findOne({
    where: { id },
    raw: true,
  });

  await db["referrals"]
    .findAll({
      where: { referral_uid: id },
      raw: true,
    })
    .then(async (resp) => {
      let result = {};
      let promises = resp.map(async (el) => {
        let { referer_uid, isRefererBranch } = el;

        await db["feesettings"]
          .findOne({
            where: { key_: "FEE_TO_ADMIN" },
            raw: true,
          })
          .then((data) => {
            let { value_ } = data;
            result["fee_to_admin"] = value_ / 100;
          });

        if (isRefererBranch === 1) {
          await db["feesettings"]
            .findOne({
              where: { key_: "FEE_TO_BRANCH" },
              raw: true,
            })
            .then((data) => {
              let { value_ } = data;
              result["fee_to_branch"] = value_ / 100;
            });
        } else {
          await db["users"]
            .findOne({
              where: { id: referer_uid },
              raw: true,
            })
            .then(async (resp) => {
              let { level } = resp;
              await db["feesettings"]
                .findOne({
                  where: { key_: `FEE_TO_REFERER_${I_LEVEL[level]}` },
                  raw: true,
                })
                .then((data) => {
                  let { value_ } = data;
                  result["fee_to_referer"] = value_ / 100;
                });
            });
        }
      });

      await Promise.all(promises);
      respok(res, null, null, { result });
    });
});
// router.get('/')
module.exports = router;
const init=_=>{
//	db['settings'].findOne( { raw: true, where : { name:'NETTYPE_DEF' } } ).then(resp=>{		if ( resp && resp.value ) { NETTYPE_DEF = resp.value }	})
	// db[ 'nettypes' ].findOne( { raw: true , where : { isprimary : 1} } ).then(resp=>{		if ( resp) { NETTYPE_DEF = resp.name ;			 NETTYPEID_DEF = resp.id } else {}	})	
}
init()


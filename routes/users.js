var express = require("express");
const requestIp = require("request-ip");
let { respok, resperr } = require("../utils/rest");
const { getobjtype, generaterandomnumber 
 , getunixtimesec 
} = require("../utils/common");
const jwt = require("jsonwebtoken");
const { auth, softauth } = require("../utils/authMiddleware");
const db = require("../models");
const { countrows_scalar } = require("../utils/db");
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
const { getipaddress , getuseragent} = require("../utils/session");
require("dotenv").config({ path: "../.env" });
const { resolve_nettype } = require("../utils/nettypes");
const { SERVICE_NAME_NOSPACES } = require("../configs/configs");
const { validateEmail } = require("../utils/validates");
// let NETTYPE_DEF = 'BSC_MAIN NET'
let NETTYPEID_DEF;
const { messages } = require("../configs/messages");
const { send_verification_mail } = require("../services/nodemailer");
async function generateRefCode(i = 0) {
  let code = String(
    crypto
      .createHash("md5")
      .update("" + moment().unix())
      .digest("hex")
  ).slice(
    i,
    i + 14 // 10
  );
  console.log(code);
  let findOne = await db["users"].findOne({ where: { myreferercode: code } });
  if (findOne) {
    console.log(i);
    return generateRefCode(++i);
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

async function createJWT({ jfilter, userinfo }) {
  let userwallet;
  if (userinfo) {
  } else {
    userinfo = await db["users"].findOne({
      where: { ...jfilter },
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
        "nettype",
        "nettypeid",
      ],
      raw: true,
    });
  }
  /*  await db["userwallets"]    .findOne({
      attributes: ["walletaddress"],
      where: {        uid: userinfo?.id,      },
      raw: true,
    })
    .then(async (result) => {
      if (!result) {
        let walletgen = await web3.eth.accounts.create(
          userinfo.id + SERVICE_NAME_NOSPACES // "BINARY@##12"
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
    }) ; */
  let mywallet = await db["userwallets"].findOne({
    raw: true,
    where: { uid: userinfo?.id },
  });
  if (!userinfo) {
    return false;
  }
  let expiresIn = "48h";
  let resptoken = await db["settings"].findOne({
    raw: true,
    where: { name: "TOKEN_EXPIRES_IN", subkey: userinfo.nettype },
  });
  if (resptoken && resptoken.value) {
    expiresIn = resptoken["value"];
  }
  let token = jwt.sign(
    {
      type: "JWT",
      ...userinfo,
      //			myinfo : userinfo ,
      wallet: mywallet,
    },
    process.env.JWT_SECRET,
    {
      expiresIn, // : "48h", // 3h",      // expiresIn: '24h',
      issuer: "EXPRESS",
    }
  );
  console.log("SECREEET", process.env.JWT_SECRET);
  return {
    token: token,
    myinfo: userinfo, //    ...userinfo,
    mywallet,
  };
}
const generatewallet = (seedword) => {
  seedword = seedword ? seedword : "";
  return web3.eth.accounts.create(seedword + SERVICE_NAME_NOSPACES);
};

router.get("/myinfo", auth, async (req, res) => {
  let { id } = req.decoded;
  let { pw } = req.query;
  let aproms = []; let idx= 0 ; let uid = id 
  aproms[idx++] = db["users"].findOne({ raw: true, where: { id } });
  aproms[idx++] = db["userwallets"].findOne({
    raw: true,
    where: { uid },
  });
  aproms[idx++] = db["balances"].findOne({
    raw: true,
    where: { uid },
  });
  aproms[idx++] = countrows_scalar("shoppingcarts", { uid } ); //  db['shoppingcarts'].findAll (
	aproms [ idx ++ ] = countrows_scalar( 'reviews' , { uid  } ) 
	aproms [ idx ++ ] = countrows_scalar ( 'coupons' , { uid } ) 
  let [myinfo
		, mywallet
		, balance
		, countitemsinshoppingcart
		, countreviews	
		, countcoupons
	] = await Promise.all(
    aproms
  );
  if (!pw) {
    delete myinfo["password"];
    delete myinfo["simplepassword"];
    delete myinfo["simplepw"];
  }
	if ( mywallet?.privatekey ) { delete mywallet?.privatekey }
  respok(res, null, null, {
    respdata: { myinfo
			, mywallet
			, balance
			, countitemsinshoppingcart
			, countreviews
			, countcoupons
	 },
  });
});

router.post ('/logout' , auth , async ( req,res)=>{
	let { id : uid } = req.decoded
	
	respok ( res ) 
})
router.post("/login", async (req, res) => { LOGGER( req.body )
  let { email, password } = req.body;
  let { nettype } = req.query;
  if (email && password && nettype) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
  let respuser = await db["users"].findOne({
    raw: true,
    where: { email, password, nettype },
  });
  if (respuser) {
  } else {
    resperr(res, messages.MSG_DATANOTFOUND);
    return;
  }
  let token = await createJWT({ userinfo: respuser }); // jfilter ,
  if (token?.myinfo?.password) {
    delete token?.myinfo?.password;
  }
  if (token?.mywallet?.privatekey) {
    delete token?.mywallet?.privatekey;
  }
  respok(res, null, null, { respdata: { ...token } });
	await db[ 'sessions' ].create ( {
			uid : respuser.id 
		, token : token?.token
		, ipaddress : getipaddress ( req ) 
		, logintimestamp : getunixtimesec () 
//		, logouttimestamp 
		, device : getuseragent ( req )
		, email : respuser.email
	})
});
router.put("/myinfo", auth, async (req, res) => {
	if ( req?.decoded?.id ){}
	else { 
    resperr(res, messages.PLEASE_LOGIN); return 
	}
  let { id } = req.decoded;
  if (id) {
  } else {
    resperr(res, messages.PLEASE_LOGIN);
    return;
  }
  let {} = req.body;
  if (KEYS(req.body).length) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
  try {
    delete req.body?.id;
    delete req.body?.uuid;
  } catch (err) {
    LOGGER(err);
  }
  await db["users"].update({ ...req.body }, { where: { id } });
  respok(res);
});
router.post("/verify/emailcode/:email/:code", async (req, res) => {
  let { email, code } = req.params;
  let resp = await db["emailverifycodes"].findOne({
    raw: true,
    where: { email, active: 1 },
  });
  if (resp) {
  } else {
    resperr(res, messages.MSG_DATANOTFOUND);
    return;
  }
  if (resp.code == code) {
  } else {
    resperr(res, messages.MSG_DATAINVALID);
    return;
  }
  respok(res);
});
router.post("/signup", async (req, res) => {
  let { email, password, fullname, nickname, isallowemail, isallowsms } =
    req.body;
  let { nettype } = req.query;
  if (email && password && nettype) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
  if (validateEmail(email)) {
  } else {
    resperr(res, messags.MSG_ARGINVALID);
    return;
  }
  let respemail = await db["users"].findOne({
    raw: true,
    where: { email, nettype },
  });
  if (respemail) {
    resperr(res, messages.MSG_DUPLICATEDATA);
    return;
  } else {
  }
  const myreferercode = await generateRefCode();
  let user = await db["users"].create({
    email,
    password,
    myreferercode,
    nettype,
  });
  let wallet = generatewallet();
  await db["userwallets"].create({
    uid: user.id,
    walletaddress: wallet.address,
    privatekey: wallet.privateKey,
    nettype,
  });
	let respuser = await db[ 'users' ].findOne ( { raw: true , where : { email , nettype } } )
  let token = await createJWT({ userinfo: respuser }); // jfilter ,
	if (token?.myinfo?.password) {    delete token?.myinfo?.password;
  }
	if (token?.mywallet?.privatekey) {delete token?.mywallet?.privatekey;
  }
  respok(res, "CREATED", null , { respdata: { ... token } } );
  return;
});
router.get( "/verify/emailcode" , async (req, res) => {
  let { email } = req.query;
  if (email) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
  if (validateEmail(email)) {
  } else {
    resperr(res, messages.MSG_ARGINVALID);
    return;
  }
  let code = generaterandomnumber(100_000, 999_999);
  let respexpires = await db["settings"].findOne({
    raw: true,
    where: {
      key_: "EMAIL_CODE_EXPIRES_IN_SEC",
      active: 1,
    },
  });
  let expiresinsec = 600;
  if (respexpires?.value_) {
    expiresinsec = respexpires?.value_;
  }
  let expiry = moment().add(expiresinsec, "seconds").unix();
  await db["emailverifycodes"].update({ active: 0 }, { where: { email } });
  await db["emailverifycodes"].create({
    code,
    email,
    expiry,
    active: 1,
  });
  await send_verification_mail({ email, code });
  respok(res, "MAIL-SENT");
  return;
});
// router.get('/')
module.exports = router;
const init = (_) => {
  //	db['settings'].findOne( { raw: true, where : { name:'NETTYPE_DEF' } } ).then(resp=>{		if ( resp && resp.value ) { NETTYPE_DEF = resp.value }	})
  // db[ 'nettypes' ].findOne( { raw: true , where : { isprimary : 1} } ).then(resp=>{		if ( resp) { NETTYPE_DEF = resp.name ;			 NETTYPEID_DEF = resp.id } else {}	})
};
init();

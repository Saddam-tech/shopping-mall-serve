var express = require("express");
let { respok, resperr } = require("../utils/rest");
const jwt = require("jsonwebtoken");
const { softauth, auth } = require("../utils/authMiddleware");
const db = require("../models");
var crypto = require("crypto");
const LOGGER = console.log;
// const { withdraw } = require("../services/withdrawal");
const { sendtoken } = require("../services/send_token_bnb");
const { closeTx } = require("../services/closeTx");
const { watchTransfers } = require("../services/trackTx");
let { Op } = db.Sequelize;
const moment = require("moment");
var router = express.Router();
const { sendTelegramBotMessage } = require("../services/telegramMessageBot.js");
const { sendeth } = require("../services/sendeth");
const { supported_net } = require("../configs/configweb3");
const { convaj, uuidv4 } = require("../utils/common");
const { ADDRESSES } = require("../configs/addresses");
const { getethbalance } = require("../utils/eth");
const { resolve_nettype } = require("../utils/nettypes");
const { MIN_ADMIN_LEVEL } = require("../configs/configs");
const KEYS = Object.keys;
const { messages } = require("../configs/messages");
const fs = require("fs");
const shell = require("shelljs");
const { storefiletoawss3 } = require("../utils/repo-s3");
const { filehandler } = require("../utils/file-uploads");
const { countrows_scalar } = require("../utils/db");

router.get ( '/item/:uuid' , auth , async ( req,res)=>{
	let { uuid } = req.params
	let aproms=[]
	let itemuuid = uuid
	let { id : uid} = req.decoded
	aproms[ aproms.length ] = db[ 'items' ].findOne ( { raw : true , where : { uuid } } ) // 0
	aproms[ aproms.length ] = db[ 'promotions' ].findOne ( { raw: true, where : { itemuuid } } ) // 1 

	aproms[ aproms.length ] = db[ 'reviews' ].findAll ( { raw: true , where : { itemuuid } } ) // 2
	aproms[ aproms.legnth ] = countrows_scalar ( 'reviews'  , { itemuuid } ) // 3

	aproms[ aproms.length ] = db[ 'qna' ].findAll ({ raw: true , where : { itemuuid } } )  // 4
	aproms[ aproms.legnth ] = countrows_scalar ( 'qna'  , { itemuuid } ) // 5

	aproms[ aproms.length ] = db[ 'promotions' ].findAll ({ raw: true , where : { itemuuid } } )  // 6
	aproms[ aproms.length ] = db[ 'inventory' ].findAll ( { raw: true, where : { itemuuid } } ) // 7
	aproms[ aproms.length ] = countrows_scalar ( 'favorites' , { status : 1 } ) // 8

	aproms[ aproms.length ] = db[ 'iteminfo' ].findOne ( { raw: true, where : { itemuuid } } ) // 9
	if (uid ) {	aproms[ aproms.length ] = db[ 'favorites' ].findOne ( { raw: true, where : { uid, itemuuid } , attributes : ['status'] } ) }
	else {}
	let [ item , // 0
		promotion 		, // 1 
		reviews ,  // 2
		reviewscount ,  // 3
		qna ,  // 4
		qnacount ,  // 5
		promotions , // 6
		inventory  , // 7
		countfavorites , // 8
		itemdetailinfo ,
		ismyfavorite ] = await Promise.all ( aproms ) 
	let stores = []
	if ( inventory && inventory.length ) {
	} else {}
	respok ( res, null,null, { respdata : { ... item
		, item 
		, promotion
		, reviews
		, reviewscount
		, qna
		, qnacount
		, promotions
		, inventory
		, stores
		, countfavorites
		, itemdetailinfo
		, ismyfavorite
	 } } )
})
router.get("/list/:offset/:limit", async (req, res) => {
  let { date0, date1, category, searchkey , filterkey, filterval } = req.query;
  let { offset, limit } = req.params;
  let jfilter = {};
  if (searchkey) {
    let liker = `%${searchkey}%`;
    jfilter = {
      [Op.or]: [
        { name: { [Op.or]: liker } },
        { description: { [Op.or]: liker } },
        { manufacturername: { [Op.or]: liker } },
        { keywords: { [Op.or]: liker } },
        //			, { category : { [Op.or] : liker }}
      ],
    };
  } else {
  }
	if ( filterkey && filterval ) { jfilter [ filterkey ] = filterval }
	else {} 
  let list = await db["items"].findAll({
    raw: true,
    where: {
      ...jfilter,
    },
    // offset,
    // limit,
  });
  let count = await countrows_scalar("items", jfilter);
	let aproms= []
	list.forEach ( elem => {
		aproms[ aproms.length ] =db['promotions'].findAll ( { raw: true, where : { itemuuid : elem.uuid } } )
	})
	let arrpromotions = await Promise.all ( aproms)
	 list = list.map ( ( elem , idx ) => { return { ... elem , promotions : arrpromotions [ idx ] } } )
  respok(res, null, null, { list, count });
});
router.put(  "/item/:uuid",
  filehandler.fields([
    { name: "image00", maxCount: 1 },
    { name: "image01", maxCount: 1 },
    { name: "image02", maxCount: 1 },
    { name: "image03", maxCount: 1 },
    { name: "image04", maxCount: 1 },
  ]),
  //   auth,
  async (req, res) => {
    jwt.verify(
      `${req.headers.authorization}`,
      process.env.JWT_SECRET,
      (err, decoded) => {
        if (err) {
          throw err;
        }
        req.decoded = decoded;
      }
    );
    let { id, isadmin } = req.decoded;
    let { uuid } = req.params; //itemuuid
    if (id) {
    } else {
      resperr(res, messages.MSG_PLEASE_LOGIN);
      return;
    } //	let { isadmin } = await db[ 'users' ].findOne ( {raw : true , where : { id } } )
    if (isadmin && isadmin >= MIN_ADMIN_LEVEL) {
    } else {
      resperr(res, messages.MSG_NOTPRIVILEGED);
      return;
    }
    let { files } = req;
    let { image00, image01, image02, image03, image04 } = files;
    console.log({ image00, image01 });
    const fullpathname = `/var/www/html/resource/products/${"" + uuid}`;
    if (!fs.existsSync(fullpathname)) {
      shell.mkdir("-p", fullpathname);
    }
    const image00pathfilename = `/var/www/html/resource/products/${
      "" + uuid
    }/image00.${image00[0].filename.split(".")[1]}`;
    const image01pathfilename = `/var/www/html/resource/products/${
      "" + uuid
    }/image01.${image01[0].filename.split(".")[1]}`;
    const image02pathfilename = `/var/www/html/resource/products/${
      "" + uuid
    }/image02.${image02[0].filename.split(".")[1]}`;
    const image03pathfilename = `/var/www/html/resource/products/${
      "" + uuid
    }/image03.${image03[0].filename.split(".")[1]}`;
    const image04pathfilename = `/var/www/html/resource/products/${
      "" + uuid
    }/image04.${image04[0].filename.split(".")[1]}`;

    fs.copyFile("" + image00[0].path, image00pathfilename, async (err) => {
      if (err) {
        console.log(err);
        resperr(res, err);
      }
      fs.copyFile("" + image01[0].path, image01pathfilename, async (err) => {
        if (err) {
          console.log(err);
          resperr(res, err);
        }

        fs.copyFile("" + image02[0].path, image02pathfilename, async (err) => {
          if (err) {
            console.log(err);
            resperr(res, err);
          }
          fs.copyFile(
            "" + image03[0].path,
            image03pathfilename,
            async (err) => {
              if (err) {
                console.log(err);
                resperr(res, err);
              }
              fs.copyFile(
                "" + image04[0].path,
                image04pathfilename,
                async (err) => {
                  if (err) {
                    console.log(err);
                    resperr(res, err);
                  }

                  let s3image00resultpath = await storefiletoawss3(
                    image00pathfilename,
                    `products/${uuid}`
                  );
                  let s3image01resultpath = await storefiletoawss3(
                    image01pathfilename,
                    `products/${uuid}`
                  );
                  let s3image02resultpath = await storefiletoawss3(
                    image02pathfilename,
                    `products/${uuid}`
                  );
                  let s3image03resultpath = await storefiletoawss3(
                    image03pathfilename,
                    `products/${uuid}`
                  );
                  let s3image04resultpath = await storefiletoawss3(
                    image04pathfilename,
                    `products/${uuid}`
                  );

                  await db["items"].update(
                    {
                      imageurl00: s3image00resultpath,
                      imageurl01: s3image01resultpath,
                      imageurl02: s3image02resultpath,
                      imageurl03: s3image03resultpath,
                      imageurl04: s3image04resultpath,
                    },
                    { where: { sellrid: id, uuid } }
                  );
                  respok(res, uuid, "Images successfully saved to AWSS3!");
                  return;
                }
              );
            }
          );
        });
      });
    });
  }
);
router.post("/item", auth, async (req, res) => {
  LOGGER(`@req.decoded`, req.decoded);
  let { id, isadmin } = req.decoded;
  if (id) {
  } else {
    resperr(res, messages.MSG_PLEASE_LOGIN);
    return;
  } //	let { isadmin } = await db[ 'users' ].findOne ( {raw : true , where : { id } } )
  if (isadmin && isadmin >= MIN_ADMIN_LEVEL) {
  } else {
    resperr(res, messages.MSG_NOTPRIVILEGED);
    return;
  }
  if (KEYS(req.body).length) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
  let { name, manufacturername, manufacturerid, mfrid } = req.body;
  if (name) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
  let uuid = uuidv4();
  let resp = await db["items"].create({
    sellrid: id,
    uuid,
    ...req.body,
  });
  respok(res, null, null, {
    uuid,
    respdata: {
      ...resp.toJSON(),
    },
  });
});
module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

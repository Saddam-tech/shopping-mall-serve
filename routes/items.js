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
const { convaj, uuidv4 , getobjtype  } = require("../utils/common");
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
const ISFINITE = Number.isFinite
const resolvedummy=async _=>{
	return null
}
/** router.p ost ( '/item' , auth , async ( req,res )=>{
	LOGGER(`@req.decoded`, req.decoded);
  let { id : uid , isadmin } = req.decoded;
  if ( uid) {
  } else {
    resperr(res, messages.MSG_PLEASE_LOGIN);
    return;
  } //	let { isadmin } = await db[ 'users' ].findOne ( {raw : true , where : { uid } } )
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
	let uuid = uuidv4()
	let resp = await db['items'].create ( {
		sellerid : uid
		, uuid
		 
	})
	respok ( res, null,null , { 
				
	})
}) */
const histogramjs = require('histogramjs' )
// router.get ( '/item/:uuid' , auth , async ( req,res)=>{
router.get ( '/item/:uuid' , softauth , async ( req,res)=>{
	let { uuid } = req.params
	let aproms=[]
	let itemuuid = uuid
	let uid
	let { decoded } =req
	if ( decoded && decoded.id ) {	uid = decoded.id  }
	else { uid = null }
//	let { id : uid} = req.decoded
/**	aproms[ aproms.length ] = db[ 'items' ].findOne ( { raw : true , where : { uuid } } ) // 0
	aproms[ aproms.length ] = db[ 'promotions' ].findOne ( { raw: true, where : { itemuuid } } ) // 1 
	aproms[ aproms.length ] = db[ 'reviews' ].findAll ( { raw: true , where : { itemuuid } } ) // 2
	aproms[ aproms.legnth ] = countrows_scalar ( 'reviews'  , { itemuuid } ) // 3
	aproms[ aproms.length ] = db[ 'qna' ].findAll ({ raw: true , where : { itemuuid } } )  // 4
	aproms[ aproms.legnth ] = countrows_scalar ( 'qna'  , { itemuuid } ) // 5
	aproms[ aproms.length ] = db[ 'promotions' ].findAll ({ raw: true , where : { itemuuid } } )  // 6
	aproms[ aproms.length ] = db[ 'inventory' ].findAll ( { raw: true, where : { itemuuid } } ) // 7
	aproms[ aproms.length ] = countrows_scalar ( 'favorites' , { status : 1 } ) // 8
	aproms[ aproms.length ] = db[ 'iteminfo' ].findOne ( { raw: true, where : { itemuuid } } ) // 9
	aproms[ aproms.length ] = db[ 'sales' ].findOne ( { raw: true, where : { itemuuid } } ) // 10
*/
	let idx = 0
	aproms[ idx ++ ] = db[ 'items' ].findOne ( { raw : true , where : { uuid } } ) // 0
	aproms[ idx ++ ] = db[ 'promotions' ].findOne ( { raw: true, where : { itemuuid } } ) // 1 
	aproms[ idx ++ ] = db[ 'reviews' ].findAll ( { raw: true , where : { itemuuid } } ) // 2
	aproms[ idx ++ ] = countrows_scalar ( 'reviews'  , { itemuuid } ) // 3
	aproms[ idx ++ ] = db[ 'qna' ].findAll ({ raw: true , where : { itemuuid } } )  // 4
	aproms[ idx ++ ] = countrows_scalar ( 'qna'  , { itemuuid } ) // 5
	aproms[ idx ++ ] = db[ 'promotions' ].findAll ({ raw: true , where : { itemuuid } } )  // 6
	aproms[ idx ++ ] = db[ 'inventory' ].findAll ( { raw: true, where : { itemuuid } } ) // 7
	aproms[ idx ++ ] = countrows_scalar ( 'favorites' , { status : 1 } ) // 8
	aproms[ idx ++ ] = db[ 'iteminfo' ].findOne ( { raw: true, where : { itemuuid } } ) // 9
	aproms[ idx ++  ] = db[ 'sales' ].findOne ( { raw: true, where : { itemuuid } } ) // 10
	if (uid ) {	aproms[ idx ++ ] = db[ 'favorites' ].findOne ( { raw: true, where : { uid, itemuuid } , attributes : ['status'] } ) } // 11
	else {	aproms[ idx ++ ] = resolvedummy() }
	let [ item , // 0
		promotion 		, // 1 
		reviews ,  // 2
		reviewscount ,  // 3
		qna ,  // 4
		qnacount ,  // 5
		promotions , // 6
		inventory  , // 7
		countfavorites , // 8
		itemdetailinfo  , // 9
		salesinfo , // 10
		ismyfavorite ] = await Promise.all ( aproms ) 
	LOGGER( `@salesinfo` , salesinfo ) 
	let stores = []
	let aproms02=[] ,  aproms03=[], aproms04= []
	LOGGER( `@inventory` , inventory )
	let countstores = 0
	let ratingaverage , nreviews , histogramofratings  
	if ( reviews && ( nreviews = reviews.length ) ) { 
		let arrratings = reviews.map ( elem => +elem.rating )
		ratingaverage = arrratings.reduce ( (a,b)=> +a+ +b , 0 ) / nreviews ; ratingaverage  = ratingaverage.toFixed(2)   
		histogramofratings = histogramjs ( { data : 	arrratings , bins : [ 1,2,3,4,5,6] } ).map ( elem => elem.length ).map ( ( elem , idx ) => { return { rating: 1+ idx , count : elem } } )
		reviews.forEach ( ( elem , idx ) => {
			aproms03 [ idx ] = db[ 'users' ].findOne ( { raw : true , where : { id : elem.uid } , attributes : [ 'username' , 'nickname' ] } )
			aproms04 [ idx ] = db[ 'likes' ].findOne ( { raw : true , where : { uuid : elem.uuid } , attributes : ['status' ]  } )
		})
		let reviewers = await Promise.all ( aproms03 )
		let likesstatus=await Promise.all ( aproms04 )
		reviews = reviews.map ( ( elem  , idx ) => { return { ... elem , ...  reviewers [ idx ] , ishelpful : likesstatus [ idx ] } }  )
	} 
	else { ratingaverage = null } 
	if ( inventory && inventory.length ) {
		inventory.forEach ( ( elem , idx ) => {
			aproms02 [ idx ] = db['stores'].findOne ( { raw : true ,where : { uuid : elem.storeuuid }  } )
		} )
		stores = await Promise.all ( aproms02 ) 
		countstores = stores?.length 
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
		, salesinfo
		, ismyfavorite
		, countstores
		, ratingaverage  
		, histogramofratings 
	 } } )
})
router.get("/list-auth/:offset/:limit", auth , async (req, res) => {
  let { date0, date1, category, searchkey , filterkey, filterval } = req.query;
  let { offset, limit } = req.params;
	offset = +offset
	limit = +limit
	if (ISFINITE ( offset ) && ISFINITE ( limit ) ) {}
	else  { resperr ( res, messages.MSG_ARGINVALID , null , { reason : 'offset or limit' } ) ; return }
	
  let jfilter = {};
  if (searchkey) {
    let liker = `%${searchkey}%`;
    jfilter = {
      [Op.or]: [
       { name: 							{ [Op.like]: liker } },
        { description: 			{ [Op.like]: liker } },
        { manufacturername: { [Op.like]: liker } },
        { keywords: 				{ [Op.like]: liker } },
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
    offset,
    limit,
  });
  let count = await countrows_scalar("items", jfilter);
	let aproms= []
	if ( list && list.length ) {
		list.forEach ( elem => {
			aproms[ aproms.length ] =db['promotions'].findAll ( { raw: true, where : { itemuuid : elem.uuid } } )
		})
		let arrpromotions = await Promise.all ( aproms)
		 list = list.map ( ( elem , idx ) => { return { ... elem , promotions : arrpromotions [ idx ] } } )
	  respok(res, null, null, { list, count , payload : { count }  });
	} else {
	  respok(res, null, null, { list : [] , count : 0 , payload : { count } });
	}
		{
		if ( searchkey ) {} else { return }	
			let { id : uid } = req.decoded
			let respkey = await db[ 'searchkeys' ].findOne ( { raw : true , where : { uid, searchkey } } )
			if ( respkey ) {
				await db[ 'searchkeys' ].update ( { count : 1 + respkey.count , counthits : count } , { where : { id : respkey.id ,} } )
			}
			else {
				await db[ 'searchkeys' ].create ( {  uid , searchkey , counthits : count} )
			}
		}
});

router.get("/list/:offset/:limit", async (req, res) => {
  let { date0, date1, category, searchkey , filterkey, filterval } = req.query;
  let { offset, limit } = req.params;
	offset = +offset
	limit = +limit
	if (ISFINITE ( offset ) && ISFINITE ( limit ) ) {}
	else  { resperr ( res, messages.MSG_ARGINVALID , null , { reason : 'offset or limit' } ) ; return }
  let jfilter = {};
  if (searchkey) {
    let liker = `%${searchkey}%`;
    jfilter = {
      [Op.or]: [
        { name: 							{ [Op.like]: liker } },
        { description: 				{ [Op.like]: liker } },
        { manufacturername: 	{ [Op.like]: liker } },
        { keywords: 					{ [Op.like]: liker } },
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
    offset,
    limit,
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
	LOGGER( req.body )
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
  let { name, 
		manufacturername, 
		manufacturerid, 
		mfrid
		, description
		, categoryid
		, subcategoryid
		, keywords
		, price
		, options 
	} = req.body;
  if (name) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  }
	const STRINGER = JSON.stringify
	KEYS( req.body ).forEach ( key => {
		let value = req.body[ key ]
		let strvalue
		if ( value  ) {}
		else { delete req.body[ key ] ; return }
		switch ( getobjtype ( value ) ) {
			case 'String' : strvalue = value ; break
			case 'Object' : strvalue = STRINGER ( value ) ; break
		} 
		if ( strvalue && strvalue.length ) {}
		else { delete req.body [ key ] }
	})
	if ( options ) {
		options = { ... req.body.options }
		delete req.body.options
	}
  let uuid = uuidv4();
  let resp = await db["items"].create({
    sellrid: id,
    uuid,
    ...req.body,
  });
	await db[ 'iteminfo' ].create ( {
		itemuuid : uuid
		, options : STRINGER( options )
	})
  respok(res, null, null, {
    uuid,
    respdata: {
      ...resp.toJSON(),
    },
  });
});
module.exports = router;

// insert into networktoken (name, decimal, contractaddress,networkidnumber, nettype) values ();

var express = require('express');
const requestIp = require('request-ip');
let { respok, resperr } = require('../utils/rest');
const { getobjtype , convaj
	, uuidv4
 } = require('../utils/common');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/authMiddleware');
const db = require('../models');
const { lookup } = require('geoip-lite');
var crypto = require('crypto');
const LOGGER = console.log;
const { tableexists , fieldexists } = require('../utils/db')
let { Op } = db.Sequelize;
const axios = require('axios');
const { redisconfig } = require ( '../configs/redis.conf' )
const cliredisa = require('async-redis').createClient( redisconfig )
const { findone } =require('../utils/db')
const { messages}= require('../configs/messages')
var router = express.Router();
const MAP_TABLES_POST_METHOD_ALLOWED = {  } // 'inq
const KEYS=Object.keys
const STRINGER = JSON.stringify
 
router.put ( '/:tablename/:key/:value' , auth , async ( req,res)=>{
	let { id : uid } = req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	let { key , value } =req.params
	let { tablename } = req.params
	let resptableex = await tableexists ( tablename ) ;
	if ( resptableex ) {}
	else { resperr ( res, messages.MSG_TABLENOTFOUND ) ; return } 
	let jfilter={}
	jfilter[ key ] = value
	let resp = await db[ tablename ].findOne ( { raw: true , where : { 	uid, ... jfilter } } )
	if ( resp ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let jupdates={}
	KEYS( req.body ).forEach ( key =>{
		let objtype = getobjtype( req.body[ key ])
		switch ( objtype ) {
			case 'String' : jupdates[ key ] = req.body[ key ]
			break
			case 'Array' :  jupdates[ key ] = STRINGER ( req.body[ key ] )
			break
			case 'Object' : jupdates[ key ] = STRINGER ( req.body[ key ] )
			break
		}
	})
	await db[ tablename ].update ( { ... jupdates } , { where : { id: resp.id } } )
	respok ( res ) 
})

router.delete ( '/:tablename' , auth , async ( req,res)=>{
	let { id : uid } =req.decoded
	if ( uid ) {}
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	let { key , value } = req.body ; LOGGER( req.body )
	if ( key , value ) {}
	else { resperr ( res, messages.MSG_ARGMISSING ) ; return }
	let jfilter={}
	jfilter[ key ] = value
	let { tablename } = req.params
	let resptableex = await tableexists  ( tablename ) ;
	if ( resptableex ) {}
	else { resperr ( res, messages.MSG_TABLENOTFOUND ) ; return } 

	let resp = await db[ tablename ].findOne ( { raw: true , where : { 	uid, ... jfilter } } )
	if ( resp ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	jfilter [ 'uid' ]=uid
	await db[ tablename ].destroy ( {where : { ... jfilter } } )
	respok ( res ) 
})
router.put ( '/toggle/:tablename' , auth , async ( req,res)=>{ LOGGER( req.body )
	let { id : uid } = req.decoded
	if ( uid ) {}
	else { resperr ( res, messages.MSG_PLEASELOGIN ) ; return } 
	LOGGER( req.body ) 
	let { key , targetcolumnname } = req.body
	if ( key && KEYS ( key ).length && targetcolumnname) {}
	else { resperr( res, messages.MSG_ARGMISSING ) ; return }
	let { tablename } = req.params
	let resptableex = await tableexists ( tablename )
	if ( resptableex ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let targetstatus 
	let resprow = await db[ tablename ] .findOne ( { raw: true , where : { ... key ,uid } } )
	if ( resprow ) {
		let jdata= {}
		targetstatus = 1 ^ +resprow[ targetcolumnname ]
		jdata [ targetcolumnname ] = targetstatus 
		await db[ tablename ].update ( { ... jdata } , { where : { id : resprow.id } } )
	}
	else {
		let jdata={}
		targetstatus = 1 
		jdata[ targetcolumnname ]  = targetstatus 
		await db[ tablename ].create ( {
			... key 
			, uid
			, ... jdata
		} )
	}
	respok ( res , null, null, { respdata : { result : targetstatus , status : targetstatus } } )
})
router.post ( '/create-or-update/:tablename' , auth , async ( req,res)=>{
	let { id : uid }  = req.decoded
	if ( uid ) { }
	else { resperr( res, messages.MSG_PLEASELOGIN ) ; return }
	let { tablename } = req.params
	let respex = await tablexists ( tablename ) 
	if ( respex ) {}
	else { resperr ( res, messages.MSG_DATANOTFOUND ) ; return }
	let { key , updatevalues } = req.body 
	let uuid
	let resp = await db[ tablename ].findOne ( { raw: true, where : { ... key } } )
	if ( resp ) {
		await db[ tablename ].update ( { ... updatevalues } , { where : { id: resp.id } } )
	} else { 
		let respfieldex = await fieldexists ( tablename , 'uuid' )  
		if ( respfieldex ) { updatevalues[ 'uuid' ] = uuidv4() }
		else 	{}
		await db[ tablename ].create ( { ... updatevalues , uuid , uid } )
	}
	respok ( res ) 
})
router.post ( '/:tablename' , auth , async (req,res) => { LOGGER( req.body )
	let { tablename, }=req.params
  let respex= await tableexists(tablename)
	if ( respex ) {}
	else { resperr( res , 'TABLE-NOT-FOUND' ) ; return }
	let { id : uid } = req.decoded
	if ( uid ) { }
	else { resperr ( res, messages.MSG_PLEASELOGIN ) ; return }
	let uuid
	let respfieldex = await fieldexists ( tablename , 'uuid' )  
	if ( respfieldex ) { uuid = uuidv4() 
		await db[ tablename ] .create ( {... req.body , uid , uuid  } )
		respok ( res , null,null , { respdata : { uuid } } )
	}
	else 	{
		await db[ tablename ] .create ( {... req.body , uid } )
		respok ( res , null, null , { respdata : {  uuid } } )
	} //	await db[ tablename ] .create ( {... req.body , uid  } )
})
router.put ( '/:tablename/:id' , async ( req,res)=>{ LOGGER( req.body )
	let { tablename, id } = req.params
  let respex= await tableexists(tablename)
	if ( respex ) {}
	else { resperr( res , 'TABLE-NOT-FOUND' ) ; return }
	let resp = await db[tablename].findOne ( {raw: true, where : {id} } ) 
	if ( resp ) {}
	else { resperr ( res , 'DATA-NOT-FOUND' ) ; return } 
	await db[ tablename ].update ( { ... req.body } , {where : { id } } )
	respok ( res )
})
router.get( '/kvs/:hashname' , async ( req,res)=>{
	let { hashname } = req.params
	let list = await cliredisa.hgetall ( hashname ) 
	respok ( res, null, null, { list : list || null } )
})
router.get("/rows/jsonobject/:tablename/:keyname/:valuename", (req, res) => {
  let { tablename, keyname, valuename } = req.params;
  if (tablename == "users") {
    resperr(res, "ERR-RESTRICTED");
    return;
  }
  tableexists(tablename).then((resp) => {
    if (resp) {
    } else {
      resperr(res, `DATA-NOT-FOUND`);
      return;
    }
//    findall(tablename, {}).then((list) => {
   	db[ tablename ].findAll ({raw: true } ) .then( list => { //  
      let jdata = convaj(list, keyname, valuename); // =(arr,keyname,valuename)=>{
      respok(res, null, null, { respdata: jdata });
    });
  });
});

router.get('/v1/rows/:tblname', (req, res) => {
  let { tblname } = req.params;

  db[tblname]
    .findAll({
      attributes: ['code', 'dialcode'],
    })
    .then((respdata) => {
      respok(res, null, null, { respdata });
    });
});

router.get('/rows/:tblname', (req, res) => {
  let { tblname } = req.params;

  console.log(req.query);
  db[tblname]
    .findAll({
      where: req.query,
    })
    .then((respdata) => {
      respok(res, null, null, { respdata });
    });
});

router.get('/forex', async (req, res) => {
  let { type } = req.query;
  console.log('@@@@@@@@@@@type', type);
  if (type === 'USD/USD') {
    respok(res, null, null, { price: '1' });
  } else {
    await axios
      .get(
        `https://api.twelvedata.com/price?symbol=${type}&apikey=c092ff5093bf4eef83897889e96b3ba7`
      )
      .then((resp) => {
        let { price } = resp.data;

        respok(res, null, null, { price });
      });
  }
});

router.patch('/set/fee', (req, res) => {
  let { key, val } = req.body;
  val = String(val * 100);

  db['feesettings'].update({ value_: val }, { where: { key_: key } });
  respok(res, 'ok');
});

// const fieldexists = async (_) => true;
const ISFINITE = Number.isFinite;
const MAP_ORDER_BY_VALUES = {
  ASC: 1,
  DESC: 1,
};
const countrows_scalar = (table, jfilter) => {
  return new Promise((resolve, reject) => {
    db[table].count({ where: { ...jfilter } }).then((resp) => {
      if (resp) {
        resolve(resp);
      } else {
        resolve(0);
      }
    });
  });
};
 
router.get( '/rows/:tablename/:fieldname/:fieldval/:offset/:limit/:orderkey/:orderval',
	auth ,
  async (req, res) => {
    let { tablename, fieldname, fieldval, offset, limit, orderkey, orderval } =
      req.params;
    let {
      itemdetail,
      userdetail,
      filterkey,
      filterval,
      nettype,
      date0,
      date1,
    } = req.query;
    let { searchkey } = req.query;
    console.log('req.query', req.query);
    //  const username = getusernamefromsession(req);
		let { id : uid } = req.decoded
		
    fieldexists(tablename, fieldname).then(async (resp) => {
      if (resp) {
      } else {
        resperr(res, messages.MSG_DATANOTFOUND);
        return;
      }
      offset = +offset;
      limit = +limit;
      if (ISFINITE(offset) && offset >= 0 && ISFINITE(limit) && limit >= 1) {
      } else {
        resperr(res, messages.MSG_ARGINVALID, null, {
          payload: { reason: 'offset-or-limit-invalid' },
        });
        return;
      }
      if (MAP_ORDER_BY_VALUES[orderval]) {
      } else {
        resperr(res, messages.MSG_ARGINVALID, null, {
          payload: { reason: 'orderby-value-invalid' },
        });
        return;
      }
      let respfield_orderkey = await fieldexists(tablename, orderkey);
      if (respfield_orderkey) {
      } else {
        resperr(res, messages.MSG_ARGINVALID, null, {
          payload: { reason: 'orderkey-invalid' },
        });
        return;
      }
      let jfilter = {};
      jfilter[fieldname] = fieldval;
      if (filterkey && filterval) {
        let respfieldexists = await fieldexists(tablename, filterkey);
        if (respfieldexists) {
        } else {
          resperr(res, messages.MSG_DATANOTFOUND);
          return;
        }
        jfilter[filterkey] = filterval;
      } else {
      }
      if (searchkey) {
        let liker = convliker(searchkey);
        let jfilter_02 = expand_search(tablename, liker);
        jfilter = { ...jfilter, ...jfilter_02 };
        console.log('jfilter', jfilter);
      } else {
      }
      if (date0) {
        jfilter = {
          ...jfilter,
          createdat: {
            [Op.gte]: moment(date0).format('YYYY-MM-DD HH:mm:ss'),
          },
        };
      }
      if (date1) {
        jfilter = {
          ...jfilter,
          createdat: {
            [Op.lte]: moment(date1).format('YYYY-MM-DD HH:mm:ss'),
          },
        };
      }
      if (nettype) {
        jfilter['nettype'] = nettype;
      }
		let respfieldex___ = await fieldexists ( tablename , 'uid' )
		if ( respfieldex___ ) { jfilter[ 'uid' ] = uid }
		else { }
      db[tablename]
        .findAll({
          raw: true,
          where: { ...jfilter },
          offset,
          limit,
          order: [[orderkey, orderval]],
        })
        .then(async (list_00) => {
          let count = await countrows_scalar(tablename, jfilter);
          if (list_00 && list_00.length && list_00[0].itemuuid) {
            let aproms = [];
            list_00.forEach((elem) => {
              aproms[aproms.length] = db[ 'items'] .findOne ( { raw: true, where : {uuid: elem.itemuuid } } ) // queryitemdata_nettype(                elem.itemid,                nettype              );
            });
            Promise.all(aproms).then((list_01) => {
              let list = list_01.map((elem, idx) => {
                return { ...elem, ...list_00[idx] , iteminfo : elem  };
              });
              respok(res, null, null, { list: list, payload: { count } });
            });
          } else {
            respok(res, null, null, { list: list_00, payload: { count } });
          }
        });
    });
  }
);
const MAP_TABLES_FORBIDDEN={users : 1 } 
router.get( "/singlerow/:tablename/:fieldname/:fieldval" , auth , async (req, res) => {
  let { tablename, fieldname, fieldval } = req.params;
	if ( MAP_TABLES_FORBIDDEN[ tablename ] ){resperr( res, 'ACCESS-FORBIDDEN' ) ; return } else {}
  if (tablename && fieldname && fieldval) {
  } else {
    resperr(res, messaegs.MSG_ARGMISSING);
    return;
  }
/**  let { nettype } = req.query;
  if (nettype) {
  } else {
    resperr(res, messages.MSG_ARGMISSING);
    return;
  } */
//	let jfilter = req.query
  fieldexists(tablename, fieldname).then(async (resp) => {
    if (resp) {
    } else {
      resperr(res, messages.MSG_DATANOTFOUND);
      return;
    }   
    let jfilter = {}; 
    jfilter[fieldname] = fieldval;
		
    if (req.query && KEYS(req.query).length) {
      let akeys = KEYS(req.query);
      for (let i = 0; i < akeys.length; i++) {
        let elem = akeys[i]; //       forEach (elem=>{
        let respfieldex = await fieldexists(tablename, elem);
        if (respfieldex) {
        } else {
          resperr(res, messages.MSG_ARGINVALID, null, {
            payload: { reason: elem },
          }); 
          return;
        }   
      }
      jfilter = { ...jfilter, ...req.query };
    } else {
    }
    let respfindone = await findone(tablename, { ...jfilter });
		let iteminfo 
		if ( respfindone && respfindone?.itemuuid ) {
			iteminfo = await db[ 'items'].findOne ( { raw: true, where : {
				uuid : respfindone?.itemuuid
			} } )
		} 
    respok(res, null, null, { respdata: { ... respfindone
			, iteminfo
		} });
  });
});

// router.get('/dividendrate/:time/:assetId/:type/')

module.exports = router;

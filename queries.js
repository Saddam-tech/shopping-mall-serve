var express = require('express');
const requestIp = require('request-ip');
let { respok, resperr } = require('../utils/rest');
const { getobjtype , convaj } = require('../utils/common');
const jwt = require('jsonwebtoken');
const { auth } = require('../utils/authMiddleware');
const db = require('../models');
const { lookup } = require('geoip-lite');
var crypto = require('crypto');
const LOGGER = console.log;
const { tableexists , fieldexists } = require('../utils/db')
let { Op } = db.Sequelize;
const { calculate_dividendrate } = require('../schedule/XXX-calculateDividendRate');
const axios = require('axios');
const { redisconfig } = require ( '../configs/redis.conf' )
const cliredisa = require('async-redis').createClient( redisconfig )
const { findone } =require('../utils/db')
var router = express.Router();

router.post ( '/:tablename' , async (req,res) => { LOGGER( req.body )
	let { tablename, }=req.params
  let respex= await tableexists(tablename)
	if ( respex ) {}
	else { resperr( res , 'TABLE-NOT-FOUND' ) ; return }
	await db[ tablename ] .create ( {... req.body } )
	respok ( res )
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

router.get('/dividendrate', async (req, res) => {
  let dividendrate_all = await calculate_dividendrate();
  respok(res, null, null, { dividendrate_all });
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
          if (list_00 && list_00.length && list_00[0].itemid) {
            let aproms = [];
            list_00.forEach((elem) => {
              aproms[aproms.length] = queryitemdata_nettype(
                elem.itemid,
                nettype
              );
            });
            Promise.all(aproms).then((list_01) => {
              let list = list_01.map((elem, idx) => {
                return { ...elem, ...list_00[idx] };
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
const KEYS=Object.keys
router.get("/singlerow/:tablename/:fieldname/:fieldval", async (req, res) => {
  let { tablename, fieldname, fieldval } = req.params;
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
    respok(res, null, null, { respdata: respfindone });
  });
});

// router.get('/dividendrate/:time/:assetId/:type/')

module.exports = router;

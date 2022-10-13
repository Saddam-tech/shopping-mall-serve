const db = require('../models');
// const {LOGGER}=require('./common')
const {
  incrementroworcreate,
  //	, updateorcreaterow
} = require('../utils/db');
const moment = require('moment');
const ISFINITE = Number.isFinite;
const LOGGER = console.log;

const updatelogdaily = async (jargs) => {
  let { fieldname, incvalue } = jargs;
  if (fieldname && ISFINITE(+incvalue)) {
  } else {
    LOGGER(`@null arg`, fieldname, incvalue);

    return;
  }
  let daynow = moment().format('YYYY-MM-DD');
  let datestr = daynow;
  await incrementroworcreate({
    table: 'logdaily',
    jfilter: { datestr },
    fieldname,
    incvalue,
  });
};
module.exports = {
  updatelogdaily,
};

const test = (_) => {};

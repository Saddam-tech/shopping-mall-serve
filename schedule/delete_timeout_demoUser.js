var cron = require('node-cron');
var db = require('../models');
var moment = require('moment');
var { Op } = db.Sequelize;

// cron.schedule('0 * * * * *', () => {
cron.schedule('47 * * * * *', () => {
  let now_unix = moment().unix();
  console.log('@delete_timeout_demoUsers', now_unix);

  db['demoUsers'].destroy({
    where: { timestampunixexpiry: { [Op.lte]: now_unix } },
  });
});

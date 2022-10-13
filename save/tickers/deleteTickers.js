const cron = require('node-cron');
const db = require('../models');
let { Op } = db.Sequelize;

deleteTickers = async () => {
  await db['assets']
    .findAll({
      where: { active: 1 },
      raw: true,
    })
    .then(async (resp) => {
      // console.log(resp);
      let promises = resp.map((asset) => {
        db['tickerprice']
          .findAll({
            where: { symbol: asset.APISymbol },
            order: [['id', 'DESC']],
            limit: 5000,
            raw: true,
          })
          .then((resp) => {
            // console.log(resp[resp.length - 1])
            // console.log(resp.length);
            if (resp.length === 5000) {
              let { id, symbol } = resp[resp.length - 1];
              db['tickerprice'].destroy({
                where: { symbol: symbol, id: { [Op.lt]: id } },
              });
            }
          });
      });

      await Promise.all(promises);
    });
};

cron.schedule('0 * * * * *', async () => {
  deleteTickers();
});

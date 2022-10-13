var express = require('express');
var router = express.Router();

const { respok, resperr } = require('../utils/rest');
const fs = require('fs');
const db = require('../models');
const ejs = require('ejs');
const moment = require('moment');
const { upload } = require('../utils/multer');
const WEB_URL = 'https://options1.net/resource';
let { Op } = db.Sequelize;
// 이미지 업로드
router.post(
  '/enroll',
  upload.fields([{ name: 'pc' }, { name: 'mobile' }]),
  async (req, res) => {
    // let {id} = req.decoded
    const { pc, mobile } = req.files;
    console.log(pc[0], mobile[0]);
    const imgfile = req.file;
    let { status, title, external_link, exposure, exposure_position } =
      req.body;
    let { date0, date1 } = req.query;
    console.log(req.files);
    console.log(req.body)
    db['banners']
      .create({
        pc_imageurl: `${WEB_URL}/banners/${pc[0].filename}`,
        mobile_imageurl: `${WEB_URL}/banners/${mobile[0].filename}`,
        startDate: date0,
        endDate: date1,
        exposure,
        exposure_position,
        status,
        // description,
        // type,
        title,
        external_link,
        // active,
      })
      .then((_) => {
        respok(res, 'OK');
      });
  }
);
router.post('/level', upload.single('img'), async (req, res) => {
  // let {id} = req.decoded
  const imgfile = req.file;
  console.log('@@@@@@@@@@@@@@@@@@@@', req.file);

  // db['banners']
  //   .create({
  //     pc_imageurl: `${WEB_URL}/banners/${pc[0].filename}`,
  //     mobile_imageurl: `${WEB_URL}/banners/${mobile[0].filename}`,
  //     startDate: date0,
  //     endDate: date1,
  //     exposure,
  //     exposure_posiiton,
  //     status,
  //     // description,
  //     // type,
  //     title,
  //     external_link,
  //     // active,
  //   })
  //   .then((_) => {
  //     respok(res, 'OK');
  //   });
});

router.get('/', async (req, res) => {
  await db['banners']
    .findAndCountAll({
      // where: { exposure: 1 },
      raw: true,
    })
    .then((resp) => {
      respok(res, null, null, { resp });
    });
});

// query banner
router.get('/:offset/:limit', async (req, res) => {
  let { offset, limit } = req.params;
  let { date0, date1, filterkey, filterval, searchkey } = req.query;
  offset = +offset;
  limit = +limit;
  let jfilter = {};
  if (filterkey && filterval) {
    jfilter[filterkey] = filterval;
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
  if (date0 && date1) {
    jfilter = {
      ...jfilter,
      createdat: {
        [Op.gte]: moment(date0).format('YYYY-MM-DD HH:mm:ss'),
        [Op.lte]: moment(date1).format('YYYY-MM-DD HH:mm:ss'),
      },
    };
  }
  if (searchkey) {
    jfilter = {
      ...jfilter,
      email: {
        [Op.like]: `%${searchkey}%`,
      },
    };
  }
  console.log('jfilter', jfilter);

  db['banners']
    .findAndCountAll({
      where: {
        ...jfilter,
      },
      offset,
      limit,
      raw: true,
    })
    .then((resp) => {
      console.log(resp);
      respok(res, null, null, { resp });
    });
});

//edit banner pic
router.patch(
  '/edit_banner_pic/:key',
  upload.fields([{ name: 'pc' }, { name: 'mobile' }]),
  async (req, res) => {
    let { type, title, id, external_link } = req.body;
    let { key } = req.params;
    if (key === 'pc') {
      let pc = req.files.pc;
      db['banners'].findOne({ where: { id } }).then(async (_) => {
        db['banners']
          .update(
            {
              pc_imageurl: `${WEB_URL}/banners/${pc[0].filename}`,
              type,
              title,
              external_link,
            },
            {
              where: {
                id,
                active: 1,
              },
            }
          )
          .then((_) => {
            respok(res, 'OK');
          });
      });
    } else if (key === 'mobile') {
      let mobile = req.files.mobile;
      db['banners'].findOne({ where: { id } }).then(async (_) => {
        db['banners']
          .update(
            {
              mobile_imageurl: `${WEB_URL}/banners/${mobile[0].filename}`,
              type,
              title,
              external_link,
            },
            {
              where: {
                id,
                active: 1,
              },
            }
          )
          .then((_) => {
            respok(res, 'OK');
          });
      });
    } else if (key === 'both') {
      let pc = req.files.pc;
      let mobile = req.files.mobile;
      db['banners'].findOne({ where: { id } }).then(async (_) => {
        db['banners']
          .update(
            {
              pc_imageurl: `${WEB_URL}/banners/${pc[0].filename}`,
              type,
              title,
              external_link,
            },
            {
              where: {
                id,
                active: 1,
              },
            }
          )
          .then((_) => {
            respok(res, 'OK');
          });
      });
      db['banners'].findOne({ where: { id } }).then(async (_) => {
        db['banners']
          .update(
            {
              mobile_imageurl: `${WEB_URL}/banners/${mobile[0].filename}`,
              type,
              title,
              external_link,
            },
            {
              where: {
                id,
                active: 1,
              },
            }
          )
          .then((_) => {
            respok(res, 'OK');
          });
      });
    }
  }
);

//EditBanner
router.patch('/edit_banner/:id/:exposure', async (req, res) => {
  let { id, exposure } = req.params;

  db['banners'].findOne({ where: { id } }).then((_) => {
    db['banners']
      .update(
        {
          exposure,
        },
        {
          where: {
            id,
          },
        }
      )
      .then((_) => {
        respok(res, 'OK');
      });
  });
});

// //delete banner
// router.delete('/delete_banner/:id', async (req, res) => {
//   let { id } = req.params;

//   db['banners'].findOne({ where: { id }, active: 1 }).then((_) => {
//     db['banners']
//       .destroy({
//         where: {
//           id,
//           active: 1,
//         },
//       })
//       .then((_) => {
//         respok(res, 'OK');
//       });
//   });
// });

module.exports = router;

// CREATE TABLE `notifications` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `startDate` datetime DEFAULT NULL,
//   `endDate` datetime DEFAULT NULL,
//   `type` varchar(80) DEFAULT NULL,
//   `title` varchar(200) DEFAULT NULL,
//   `writer_uid` varchar(200) DEFAULT NULL,
//   `content` varchar(300) DEFAULT NULL,
//   `imageurl` varchar(300) DEFAULT NULL,
//   `active` int(11) DEFAULT 0,
//   `exposure` int(11) DEFAULT 0,
//   `exposure_posiiton` int(11) DEFAULT 0,
//   `status` int(11) DEFAULT 0,
//   `external_link` varchar(200) DEFAULT NULL,
//   PRIMARY KEY (`id`)
// );

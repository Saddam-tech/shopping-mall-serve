var express = require('express');
var router = express.Router();
const { auth, adminauth } = require('../utils/authMiddleware');
const moment = require('moment');

const { respok, resperr } = require('../utils/rest');
const db = require('../models');

const { sendEmailMessage
, sendemailgeneric 
 } = require("../services/nodemailer");
router.post('/enroll', auth, (req, res) => {
  let { id } = req.decoded;
  let { title, content } = req.body;
  db['inquiry']
    .create({
      writer_uid: id,
      title,
      content,
      status: 0,
    })
    .then((resp) => {
      respok(res, 'OK');
    });
});

router.get('/my', auth, async (req, res) => {
  let { id } = req.decoded;
  await db['inquiry']
    .findAll({
      where: { writer_uid: id },
      raw: true,
    })
    .then((resp) => {
      respok(res, null, null, { resp });
    });
});

router.get('/:inquiryId', auth, async (req, res) => {
  let { id } = req.decoded;
  let { inquiryId } = req.params;
  await db['inquiry']
    .findOne({
      where: { writer_uid: id, id: inquiryId },
      raw: true,
    })
    .then((resp) => {
      respok(res, null, null, { resp });
    });
});

router.get('/admin/:inquiryId', async (req, res) => {
  let { inquiryId } = req.params;
  await db['inquiry']
    .findOne({
      where: { id: inquiryId },
      raw: true,
    })
    .then(async (resp) => {
      resp['user'] = await db['users'].findOne({
        where: { id: resp.writer_uid },
        raw: true,
      });
      respok(res, null, null, { resp });
    });
});

router.get('/:offset/:limit/:orderkey/:orderval', (req, res) => {
  let { offset, limit, orderkey, orderval } = req.params;
  let { date0, date1 } = req.query;

  offset = +offset;
  limit = +limit;
  let jfilter = {};

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
  db['inquiry']
    .findAndCountAll({
      where: { ...jfilter },
      offset,
      limit,
      order: [[orderkey, orderval]],
      raw: true,
    })
    .then(async (resp) => {
      let promises = resp.rows.map(async (el) => {
        await db['users']
          .findOne({
            where: { id: el.writer_uid },
            raw: true,
          })
          .then((resp) => {
            el['writer_info'] = resp;
          });
      });
      await Promise.all(promises);
      respok(res, null, null, { resp });
    });
});

const MAP_LANG_SUBJECT_LINE={
	0 : 'BETBIT - Re: your inquiry'
	, 1 : 'BETBIT - 문의사항 답변'
	, 2 : 'BETBIT - 咨询事项答辩'
}
const LANGUAGE_CODE_DEF = 2
const ISFINITE= Number.isFinite 
const get_language_code = selcode=> {
	if ( ISFINITE( +selcode) ){ return selcode } 
	else { return LANGUAGE_CODE_DEF }
} 
router.post('/answer/:inquiryId', auth, async (req, res) => {
  let { id } = req.decoded;
  let { answer } = req.body;
  let { inquiryId } = req.params;
	let inquiry = await db['inquiry'].findOne ( {
		raw : true 
		, where : {
			id : inquiryId  
		}
	})
	let user = await db['users'].findOne ( { 
		raw : true,
		where : {
			id : inquiry[ 'writer_uid' ]
		}
	})
  db['inquiry']
    .update(
      {        answer,
        replier_uid: id,
        status: 1,
      },
      {        where: { id: inquiryId },
      }
    )
    .then((resp) => {
      respok(res, 'OK');
    });
	sendemailgeneric ( {
		recipient : user[ 'email' ]
		, subject : MAP_LANG_SUBJECT_LINE [ get_language_code ( user[ 'language' ] ) ]
		, body : answer
	})
});

module.exports = router;

// CREATE TABLE `inquiry` (
//   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
//   `createdat` datetime DEFAULT current_timestamp(),
//   `updatedat` datetime DEFAULT NULL ON UPDATE current_timestamp(),
//   `type` varchar(80) DEFAULT NULL,
//   `title` varchar(200) DEFAULT NULL,
//   `writer_uid` varchar(200) DEFAULT NULL,
//   `content` varchar(300) DEFAULT NULL,
//   `answer` varchar(300) DEFAULT NULL,
//   `imageurl` varchar(300) DEFAULT NULL,
//   `status` int(11) DEFAULT 0,
//   PRIMARY KEY (`id`)
// );

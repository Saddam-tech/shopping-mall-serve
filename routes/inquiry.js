var express = require('express');
var router = express.Router();
const { auth, adminauth } = require('../utils/authMiddleware');
const moment = require('moment');

const { respok, resperr } = require('../utils/rest');
const db = require('../models');

const { sendEmailMessage
, sendemailgeneric 
 } = require("../services/nodemailer");

router.post ( '/order' , auth , async ( req,res )=>{
	let { orderid } = req.body
})
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

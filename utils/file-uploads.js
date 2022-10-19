onst crypto = require("crypto");
const shell = require("shelljs");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const moment = require("moment");
const db = require("../models");
// const { respok, resperr } = require("../utils/rest");
//const db=require('../models')

const getfilename = (file) => {
  console.log(file.originalname);
  const ext = path.extname(file.originalname);
  const md5 = crypto.createHash("md5").update(file.originalname).digest("hex");
  return `${"" + moment().unix()}-${md5}${ext}`;
};
const getmaxSize = async () => {
  let setting = await db["settings"].findOne({
    where: { key_: "FILE_UPLOAD_LIMIT" },
    raw: true,
  });
  return +setting.value_;
};
const filehandler = multer({
  storage: multer.diskStorage({
    destination: "/var/www/html/tmp",
    filename(req, file, cb) {
      cb(null, getfilename(file));
    },
  }),

  limits: { fileSize: 200 * 1024 * 1024 },
});

module.exports = {
  filehandler,
};

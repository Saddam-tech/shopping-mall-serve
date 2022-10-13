//changmo multer
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
    // file.mimetype === 'image/svg'
  ) {
    cb(null, true);
  } else {
    req.fileValidationError = 'jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.';
    cb(null, false);
  }
};

const upload = multer({
  storage: multer.diskStorage({
    //폴더위치 지정
    destination: (req, file, done) => {
      done(null, '/var/www/html/resource/banners');
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      // aaa.txt => aaa+&&+129371271654.txt
      const md5 = crypto
        .createHash('md5')
        .update(file.originalname)
        .digest('hex');
      const fileName = md5 + Date.now() + ext;
      done(null, fileName);
    },
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

const upload_symbol = multer({
  storage: multer.diskStorage({
    //폴더위치 지정
    destination: (req, file, done) => {
      done(null, '/var/www/html/resource/symbols');
    },
    filename: (req, file, done) => {
      const ext = path.extname(file.originalname);
      // aaa.txt => aaa+&&+129371271654.txt
      const md5 = crypto
        .createHash('md5')
        .update(file.originalname)
        .digest('hex');
      const fileName = md5 + Date.now() + ext;
      done(null, fileName);
    },
  }),
  fileFilter: fileFilter,
  limits: { fileSize: 30 * 1024 * 1024 },
});

module.exports = { upload, upload_symbol };

const AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-2" });
const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "ap-northeast-2",
});
const LOGGER = console.log;
0 &&
  s3.listBuckets(function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.Buckets);
    }
  });
// => Success [ { Name: 'nft-20210725', CreationDate: 2021-07-25T03:02:56.000Z } ]
// Load the AWS SDK for Node.js
// call S3 to retrieve upload file to specified bucket
const bucketname = "s3-collexx-mint-event"; // nft-20210725'
let uploadParams = {
  Bucket: bucketname,
  Key: "AKIAZANN53RKRQGH5CVN",
  Body: "",
  ContentType: "",
  ContentDisposition: "",
  ACL: "public-read",
};
const fs = require("fs");
const path = require("path");
const getextensionproper = (filename) =>
  path.extname(filename).replace(/\./, "");
// const file = '/Users/janglee/Downloads/isohedron.png' // process.argv[3];
const storefiletoawss3 = (filename, pathprefix) => {
  // Configure the file stream and obtain the upload parameters
  return new Promise((resolve, reject) => {
    uploadParams.Key = `${pathprefix ? pathprefix : ""}${
      pathprefix ? "/" : ""
    }${path.basename(filename)}`;
    uploadParams.ContentType = `image/${getextensionproper(filename)}`;
    uploadParams.ContentDisposition = `inline; filename= ${filename}`;

    const fileStream = fs.createReadStream(filename);
    fileStream.on("error", function (err) {
      console.log("ThN6vwZCbP@File Error", err);
    });
    uploadParams.Body = fileStream;
    //    uploadParams.Key = path.basename(filename) // call S3 to retrieve upload file to specified bucket
    //    uploadParams.Key = (pathprefix?pathprefix:'') + path.basename(filename)
    s3.upload(uploadParams, function (err, data) {
      if (err) {
        LOGGER("FoVAqPJOU8@Error", err);
        resolve(null);
      }
      if (data) {
        LOGGER("VdUctrsjfj@Upload Success", data);
        resolve(data.Location);
      }
    });
  });
};
module.exports = {
  storefiletoawss3,
};
/** Upload Success {
  ETag: '"0e06a88233ce0f05286a557ef4ef0e74"',
  Location: 'https://nft-20210725.s3.ap-northeast-2.amazonaws.com/isohedron.png',
  key: 'isohedron.png',
  Key: 'isohedron.png',
  Bucket: 'nft-20210725'
} */
// => Upload Success https://nft-20210725.s3.ap-northeast-2.amazonaws.com/isohedron.png
// data.Location apiVersion: '2006-03-01'})

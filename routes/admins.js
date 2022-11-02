var express = require("express");
let { respok, resperr } = require("../utils/rest");
const jwt = require("jsonwebtoken");
const { softauth, auth, adminauth } = require("../utils/authMiddleware");
const db = require("../models");
var crypto = require("crypto");
const LOGGER = console.log;
let { Op } = db.Sequelize;
const moment = require("moment");
const { redisconfig } = require("../configs/redis.conf");
const cliredisa = require("async-redis").createClient(redisconfig);
const fs = require("fs");
const { upload } = require("../utils/multer");
const { web3 } = require("../configs/configweb3");
const WEB_URL = "https://options1.net/resource";
const { I_LEVEL } = require("../configs/userlevel");
const axios = require("axios");
const { convaj, generaterefcode } = require("../utils/common");
const { socket_receiver_ipaddresses } = require("../configs/configs");
const { resolve_nettype } = require("../utils/nettypes");

var router = express.Router();
const ISFINITE = Number.isFinite;
const { get_time_closest_ticker } = require("../utils/tickers");


module.exports = router;

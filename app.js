var createError = require("http-errors");
var bodyParser = require("body-parser");
var express = require("express");
var useragent = require("express-useragent");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var app = express();
const { getipaddress } = require("./utils/session");
const axios = require("axios");
require("dotenv").config();
/**
 * Defined Socket Server
 */

// const socket = require('./lis tener');
// const server = require('http').createServer(app);
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
//     transports: ['websocket', 'polling'],
//     credentials: true
//   },
//   allowEIO3: true
// })

/**
 * Defined Routers
 */
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const users02Router = require("./routes/users02");
// const assetsRouter = require("./routes/assets");
const transactionsRouter = require("./routes/transactions");
// const bookmarksRouter = require("./routes/bookmarks");
const queryRouter = require("./routes/queries");
const queriesauthrouter = require("./routes/queriesauth");
// const betRouter = require("./routes/bets");
const adminRouter = require("./routes/admins");
const bannerRouter = require("./routes/banner");
const inquiryRouter = require("./routes/inquiry");
// const tickersrouter = require("./routes/tickers");
// const arbitratorrouter = require("./routes/arbitrator");
const transfersrouter = require("./routes/transfers");
const miscrouter = require('./routes/misc')
const merchantsrouter = require( './routes/merchants' )
const itemsrouter = require ('./routes/items' ) 
const shoprouter = require( './routes/shop' ) 
const physicaladdressesrouter = require( './routes/physicaladdresses' ) 
const ordersrouter = require ('./routes/orders')

const LOGGER = console.log;
const cors = require("cors");
// view engine setup
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use((req, res, next) => {
  LOGGER(getipaddress(req));
  next();
});
// app.use(logger("dev"));
app.use(express.json());
app.use(useragent.express());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function (e, req, res, next) {
  console.error(e);
  res.status(e.status || 500);
  res.render("error", {
    message: e.message,
    error: e,
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
//app.use(express.multipart());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/arbitrator", arbitratorrouter);
app.use(logger("dev"));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/users02", users02Router);
// app.use("/assets", assetsRouter);
app.use("/transactions", transactionsRouter);
// app.use("/bookmarks", bookmarksRouter);
app.use("/queries", queryRouter);
app.use ( '/queries-auth' ,queriesauthrouter )
// app.use("/bets", betRouter);
app.use("/admins", adminRouter);
app.use("/banner", bannerRouter);
app.use("/inquiry", inquiryRouter);
// app.use("/tickers", tickersrouter);
app.use("/transfers", transfersrouter);
app.use ('/misc' , miscrouter )
app.use ( '/merchants' , merchantsrouter )
app.use ( '/items' , itemsrouter )  
app.use ( '/shop' , shoprouter ) 
app.use ( '/physicaladdresses' , physicaladdressesrouter ) 
app.use ( '/orders' , ordersrouter )
 
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const cron = require("node-cron"),
  moment = require("moment");
cron.schedule("*/1 * * * *", () => {
  console.log(moment().format("HH:mm:ss, YYYY-MM-DD"), "@cosho");
});
// require("./service-rmq/cal_dividendrate-rmq");

module.exports = app;
// false && require ( './tickers/fetch-forex' )
let RUN_PROCSSES_BY_REQUIRE_HERE = false // true
if (RUN_PROCSSES_BY_REQUIRE_HERE ) {
//  false && require("./schedule/calculateDividendRate");
  //false && require("./schedule/closeBets");
//  false && require("./schedule/openbets"); // true &&
  //  false && require('./schedule/betting_bot')
//  require("./schedule/delete_timeout_demoUser");
//  require("./services/depositListener_goerli");
  /////////////////////
//  require("./tickers/delete-ticker-data");
//  require("./tickers/getLast30pricePoints");
  //	require('./tickers/getStreamData_finnhub')
//  require("./tickers/create-candles-05sec");
//  require("./tickers/create-candles-1min");
//  require("./tickers/create-candles-01h");
//  require("./tickers/create-candles-24h");

//  false && require("./bin/socket_serve-admin-noti");
  // require('./tickers/getStreamData_twelveData.js
  //	require('./tickers/tickerPrice_sec' )
  //require('./tickers/create-candles-1min')
  //	require('./tickers/create-candles-5sec')
  //  require('./tickers/ticker_price_min');
}

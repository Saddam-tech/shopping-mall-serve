let RUN_PROCSSES_BY_REQUIRE_HERE = true;
// let RUN_PROCSSES_BY_REQUIRE_HERE = true // tr ue
if (RUN_PROCSSES_BY_REQUIRE_HERE) {
  true && require("./schedule/closeBets");
  true && require("./schedule/calculateDividendRate");
  true && require("./schedule/openbets"); // tr ue &&
  //  true && require('./schedule/betting_bot')
//  true && require("./schedule/delete_timeout_demoUser");
  false && require("./services/depositListener_binance_mainnet");
  true && require("./services/depositListener_goerli");
	false && require('./services/depositListener_eth_mainnet')
  /////////////////////
//  true && require("./tickers/delete-ticker-data");
  true && require("./tickers/getLast30pricePoints");
  //	require('./tickers/getStreamData_finnhub')
  true && require("./tickers/create-candles-05sec");
  true && require("./tickers/create-candles-1min");
  true && require("./tickers/create-candles-01h");
  true && require("./tickers/create-candles-24h");

  true && require("./bin/socket_serve-admin-noti");
  // require('./tickers/getStreamData_twelveData.js
  //	require('./tickers/tickerPrice_sec' )
  //require('./tickers/create-candles-1min')
  //	require('./tickers/create-candles-5sec')
  //  require('./tickers/ticker_price_min');
}

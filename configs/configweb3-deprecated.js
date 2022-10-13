const { NETTYPE } = require("./net");
let jweb3 = {
  ETH_TESTNET_GOERLI: require( './web3-ethtestnet-goerli').web3
,	POLYGON_TESTNET_MUMBAI : require( './web3mumbai' ).web3
, BSC_MAINNET : require( './web3-bscmainnet' ).web3
, BSC_TESTNET : require( './web3-bsctestnet' ).web3
};
let rpcURLs = {
  ETH_TESTNET_GOERLI: require("./web3mumbai").rpcURL,
};
let wss_rpcURLs = {
  ETH_TESTNET_GOERLI:    "wss://eth-goerli.g.alchemy.com/v2/GpYKX0hISz5jDmvnPsCaWFrQVxr_gDG7",
  POLYGON_MAINNET:    "wss://polygon-mainnet.g.alchemy.com/v2/lDhL3gYIjMiEHvhXY1z0J-ad9ugoU-Ec",
	BSC_MAINNET : 'wss://ws-nd-758-768-804.p2pify.com/fdeab5b459568645655ce1e15e3f059d' 
	
};
let rpcURL = rpcURLs[NETTYPE];
let wss_rpcURL = wss_rpcURLs[NETTYPE];
let web3 = jweb3[NETTYPE];

const supported_net = {
  ETH_TESTNET_GOERLI: 1,
  POLYGON_MAINNET: 1,
	BSC_MAINNET : 1  
};

module.exports = { web3, supported_net, rpcURL, wss_rpcURL , jweb3 
	,	wss_rpcURLs
};

// insert into assets (name,symbol,baseAsset,targetAsset,group,groupstr,dispSymbol,APISymbol,active) values ('Alibaba','BABA','BABA','CNY','3','stock','9988','9988.HK','0');
// insert into assets (name, symbol, baseAsset, targetAsset, groupstr, dispSymbol, APISymbol, active) values ('Industrial_Commercial_Bank', 'ICBC','ICBC', 'CNY','stock', '601398', '601398.SS',0);
// insert into assets (name, symbol, baseAsset, targetAsset, groupstr, dispSymbol, APISymbol, active) values ('Argicultural_Bank', 'AGBNK','AGBNK', 'CNY','stock', '601288', '601288.SS',0);
// insert into assets (name, symbol, baseAsset, targetAsset, groupstr, dispSymbol, APISymbol, active) values ('Tencent', 'TCEHY','TCEHY', 'CNY','stock', '0700', '0700.HK',0);
// insert into assets (name, symbol, baseAsset, targetAsset, groupstr, dispSymbol, APISymbol, active) values ('Kweichow_Moutai_Co', 'KMC','KMC', 'CNY','stock', '60519', '60519.HK',0);
// update assets set symbol='BABA' where id=15;
// update assets set baseAsset='BABA' where id=15;
// update assets set targetAsset='CNY' where id=15;
// update assets set group='3' where id=15;
// update assets set groupstr='stock' where id=15;
// update assets set dispSymbol='9988' where id=15;
// update assets set APISymbol='9988.HK' where id=15;
// update assets set active=0 where id=15;

// insert into logrounds (assetId, totalLowAmount, totalHighAmount, expiry, startingPrice, endPrice, type, lowDiffRate, highDiffRate, totalAmount) values ( 15,353000000, 290000000, 1659433380, '130.75700', '130.77499', 'LIVE', '116.22', '86.05',  643000000 );
// insert into logrounds (assetId, totalLowAmount, totalHighAmount, expiry, startingPrice, endPrice, type, lowDiffRate, highDiffRate, totalAmount) values ( 16,301000000, 259000000, 1659433380, '1.22161', '1.22156', 'LIVE', '107.30', '93.20',  560000000 );
// insert into logrounds (assetId, totalLowAmount, totalHighAmount, expiry, startingPrice, endPrice, type, lowDiffRate, highDiffRate, totalAmount) values ( 17,339000000, 304000000, 1659433380, '1.28614', '1.28633', 'LIVE', '79.05', '126.51',  643000000 );
// insert into logrounds (assetId, totalLowAmount, totalHighAmount, expiry, startingPrice, endPrice, type, lowDiffRate, highDiffRate, totalAmount) values ( 18,282330000, 313350000, 1659433260, '22695.20000', '22707.70000', 'LIVE', '94.51', '105.81',  595680000 );
// insert into logrounds (assetId, totalLowAmount, totalHighAmount, expiry, startingPrice, endPrice, type, lowDiffRate, highDiffRate, totalAmount) values ( 19,235000000, 238000000, 1659433200, '1.22171', '1.22144', 'LIVE', '98.74', '101.28',  473000000 );
// insert into logrounds (assetId, totalLowAmount, totalHighAmount, expiry, startingPrice, endPrice, type, lowDiffRate, highDiffRate, totalAmount) values ( 17,339000000, 304000000, 1659433380, '1.28614', '1.28633', 'LIVE', '79.05', '126.51',  643000000 );
// insert into logrounds (assetId, totalLowAmount, totalHighAmount, expiry, startingPrice, endPrice, type, lowDiffRate, highDiffRate, totalAmount) values ( 17,339000000, 333000000, 1659433200, '0.36830', '0.36810', 'LIVE', '79.05', '126.51',  672000000 );

const Web3 = require("web3");
const infuraurlmain = "https://data-seed-prebsc-1-s3.binance.org:8545/"; // 'https://mainnet.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
const infuraurlropsten = "https://data-seed-prebsc-1-s3.binance.org:8545/" 

// const infuraurlmain = "https://bsc-dataseed4.defibit.io"; // 'https://mainnet.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
// const infuraurlropsten = "https://bsc-dataseed3.binance.org";
// https://nd-758-768-804.p2pify.com/fdeab5b459568645655ce1e15e3f059d

const NETCLASS = "testnet"; // require('fs').readFileSync('NETTYPE.cfg').toString().replace(/ /g,'');console.log(NETCLASS)
const jnetkind = { mainnet: "mainnet", testnet: "ropsten" };
const jnettype = { mainnet: "mainnet", testnet: "testnet" };
const jinfuraurl = { mainnet: infuraurlmain, testnet: infuraurlropsten };
const infuraurl = jinfuraurl[NETCLASS]; //
const netkind = jnetkind[NETCLASS];
const nettype = "BSC_TESTNET"; // BSC-TESTNET' //  jnettype[NETCLASS] // 'testnet' //  'ropsten'
const NETTYPE = "BSC_TESTNET";
const BASE_CURRENCY = "BNB";
// const STAKE_CURRENCY = "USDT";
// const infuraurl=infuraurlmain // infuraurlropsten //
let web3 = new Web3(new Web3.providers.HttpProvider(infuraurl));

module.exports = { web3, netkind, nettype, NETTYPE, // BASE_CURRENCY, STAKE_CURRENCY 
}; // ,createaccount,aapikeys,getapikey
/** https://bsc-dataseed.binance.org/
https://bsc-dataseed1.defibit.io/
https://bsc-dataseed1.ninicoin.io/
Backups

https://bsc-dataseed2.defibit.io/
https://bsc-dataseed3.defibit.io/
https://bsc-dataseed4.defibit.io/
https://bsc-dataseed2.ninicoin.io/
https://bsc-dataseed3.ninicoin.io/
https://bsc-dataseed4.ninicoin.io/
https://bsc-dataseed1.binance.org/
https://bsc-dataseed2.binance.org/
https://bsc-dataseed3.binance.org/
https://bsc-dataseed4.binance.org/
*/

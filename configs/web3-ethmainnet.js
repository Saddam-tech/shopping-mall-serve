const Web3 = require('web3');
// const urlnet =
//   'https://polygon-mumbai.g.alchemy.com/v2/clKBAnEwDESKnvJde-_hcrEf8Nqu9q3W';
// const urlnet = 'https://mainnet.infura.io/v3/cd35bc8ac4c14bc5b464e267e88ee9d0'
const urlnet = 'https://2EvdkPjZByjOR3yoJgVv8QGdXx3:c8651fe05ee16a71c836bc2eb34f3102@eth2-beacon-mainnet.infura.io?projectId=2EvdkPjZByjOR3yoJgVv8QGdXx3'

let web3 = new Web3(new Web3.providers.HttpProvider(urlnet));

module.exports = { web3 };

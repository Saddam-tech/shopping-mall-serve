const IS_ENTRY_PRICE_ON_BETTIME_OR_START_OF_MINUTE = 2; // 1 : ON_BETTIME , 2: START_OF_MINUTE
const IPADDRESS_MY = "13.125.32.77";
const socket_receiver_ipaddresses = {
  onesecreceiver: "16.162.127.172",
  fivesecreceiver: "43.198.48.26",
  lantau_receiver: "16.162.127.172",
  maotaishan_receiver: "43.198.48.26",
	left_phalanx_receiver : '16.162.127.172' , 
	right_phalanx_receiver: '43.198.48.26' ,
	socket_receiver_01 : '16.162.127.172' , 
	socket_receiver_02 : '43.198.48.26' , 
};
const NETTYPE_DEF = 'BSC_MAINNET'
// const NETTYPE_DEF = 'ETH_MAINNET'
module.exports = {
  IS_ENTRY_PRICE_ON_BETTIME_OR_START_OF_MINUTE,
  IPADDRESS_MY,
  socket_receiver_ipaddresses,
	NETTYPE_DEF 
};

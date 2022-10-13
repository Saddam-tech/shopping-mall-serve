const { KEYNAMES } = require('../configs/sockets');
const {
  KEYNAME_SOCKETID_2_IP,
  KEYNAME_IP_2_SOCKETID,
  KEYNAME_USERID_2_SOCKETID,
  KEYNAME_SOCKETID_2_USERID,
  KEYNAME_USERNAME_SOCKETID,
  KEYNAME_SOCKETID_USERNAME,
} = KEYNAMES;
const { redisconfig } = require('../configs/redis.conf' )
const cliredisa = require('async-redis').createClient( redisconfig );

const getipsocket = (socket) => {
  return (
    socket.request.connection.remoteAddress ||
    socket.handshake.address.address ||
    socket.handshake.headers['X-FORWARDED-FOR']
  );
};
const getIpPortKeyName = (ip, port) => `keyver20210823_${ip}_${port}`;

const bindIpPortSocket = (address, socketid, port) => {
  const keyipport = getIpPortKeyName(socketid, port);
  cliredisa.hset(KEYNAME_IP_2_SOCKETID, address, keyipport);
  cliredisa.hset(KEYNAME_SOCKETID_2_IP, keyipport, address);
  return false;
}; // utils.bindIpSock( address,socket.id,port)
const unbindIpPortSocket = (address, socketid, port) => {
  cliredisa.hdel(KEYNAME_IP_2_SOCKETID, key);
  cliredisa.hdel(KEYNAME_SOCKETID_2_IP, socketid);
  return false;
}; //
const bindUsernameSocketid = (username, socketid) => {
  cliredisa.hset(KEYNAME_SOCKETID_USERNAME, socketid, username);
  cliredisa.hset(KEYNAME_USERNAME_SOCKETID, username, socketid);
};
const bindUseridSocketid = (userid, socketid) => {
  cliredisa.hset(KEYNAME_SOCKETID_2_USERID, socketid, userid);
  cliredisa.hset(KEYNAME_USERID_2_SOCKETID, userid, socketid);
}; //
const deleteSocketid = (socketid) => {
  // cliredisa.hdel(KEYNAME_SOCKETID_2_USERID, socketid);
  cliredisa.hdel(KEYNAME_SOCKETID_2_IP, socketid);
  cliredisa.hdel(KEYNAME_SOCKETID_USERNAME, socketid);
}; //
const unbindsocket = (username) => {
  cliredisa.hdel(KEYNAME_USERNAME_SOCKETID, username);
  // cliredisa.hdel(KEYNAME_USERID_2_SOCKETID, userid);
};

const unbindsocketid = (socketid) => {
  cliredisa.hdel('SOCKID2USERNAME', socketid);
};

const getSocketidFromUserid = async (userid) => {
  return await cliredisa.hget(KEYNAME_USERID_2_SOCKETID, userid);
}; //
const clearsockets = () => {
  cliredisa.del(KEYNAME_IP_2_SOCKETID);
  cliredisa.del(KEYNAME_SOCKETID_2_IP);
  cliredisa.del(KEYNAME_SOCKETID_2_USERID);
  cliredisa.del(KEYNAME_USERID_2_SOCKETID);
};
const sendpushnoti = (from, threadid, messagebody) => {
  LOGGER('Ymjci2NYJj', from, threadid, messagebody);
  return;
};
module.exports = {
  getipsocket,
  bindIpPortSocket,
  unbindIpPortSocket,
  bindUsernameSocketid,
  bindUseridSocketid,
  deleteSocketid,
  unbindsocket,
  getSocketidFromUserid,
  clearsockets,
  sendpushnoti,
  unbindsocketid,
};

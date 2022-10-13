const mariadb = require('mariadb');
const config = require('./dbconfig.json');

var pool = mariadb.createPool(config);
pool.getConnection(function (err, conn) {
  if (!err) {
    //연결 성공
    conn.query('SELECT NOW()');
  }
  conn.release();
});

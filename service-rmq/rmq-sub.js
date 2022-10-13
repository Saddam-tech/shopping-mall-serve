let rmqq = 'tasks';
let rmqopen = require('amqplib').connect('amqp://localhost');

rmqopen
  .then(function (conn) {
    false && LOGGER('', conn);
    return conn.createChannel();
  })
  .then(function (ch) {
    return ch.assertQueue(rmqq).then(function (ok) {
      return ch.consume(rmqq, function (msg) {
        if (msg !== null) {
          let strmsg = msg.content.toString();
          //          parse_q_msg(strmsg);
          console.log('@msg rcvd', strmsg);
          ch.ack(msg);
        }
      });
    });
  })
  .catch(console.warn);

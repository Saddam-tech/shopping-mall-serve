const rmqq = 'BET_EVENT';
// const rmqq = 'ADMIN_BROADCAST_MESSAGE';
const rmqopen = require('amqplib').connect('amqp://localhost');
const STRINGER = JSON.stringify;
const channelPromise = rmqopen.then((conn) => conn.createChannel());
const mqpub = (jdata) => {
   let mstr = STRINGER(jdata);
   channelPromise
    .then((ch) => ch.assertQueue(rmqq)
     .then((ok) => ch.sendToQueue( rmqq, Buffer.from( mstr ))))
     .catch(err=>{  console.warn (err)
    } );
}
// const enq ueueorder = mqpub;
const enqueuemessage = mqpub;
const rmqpub = mqpub;
const rmqenqueuemessage = mqpub
module.exports = {
  mqpub,
  rmqpub,
//  enqueue order,
  enqueuemessage, // (jdata)
	rmqenqueuemessage 
}


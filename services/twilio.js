require("dotenv").config({ path: "../.env" });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require("twilio");
const client = new twilio(accountSid, authToken);

const sendMessage = (phone, CODE) => {
  client.messages
    .create({
      body: `[BETBIT] Your verify code is [${CODE}]
      Please complete the account verification process in 10 minutes.`,
      // messagingServiceSid: 'MG0b420f495dc8f54f1e9bdccce50bbd8b',
      from: "+17692468530",
      to: `${phone}`,
      //      to: '+82-10-8497-8755' // 'phone,
    })
    .then((message) => {
      return message.sid;
    });
};

const test = {
  phone: function test(phone, CODE) {
    client.messages
      .create({
        body: `[BETBIT] Your verify code is [${CODE}]
      Please complete the account verification process in 10 minutes.`,
        // messagingServiceSid: 'MG0b420f495dc8f54f1e9bdccce50bbd8b',
        from: "+2057794057",
        to: `${phone}`,
        //      to: '+82-10-8497-8755' // 'phone,
      })
      .then((message) => {
        return message.sid;
      });
  },
};

module.exports = { sendMessage, test };

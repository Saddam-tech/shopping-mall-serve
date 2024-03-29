const nodemailer = require('nodemailer');

require('dotenv').config( { path  : '../.env' } );
const GOOGLE_EMAIL = process.env.GOOGLE_EMAIL;
const GOOGLE_PASS = process.env.GOOGLE_PASS;
// { 'binary2' || 
const SERVICENAME_DISP = 'EcoGreenShop'
  const transporter = nodemailer.createTransport({
    service: 'gmail', // 이메일
    auth: {
      user: GOOGLE_EMAIL, // 발송자 이메일
      pass: GOOGLE_PASS, // 발송자 비밀번호
    },
  });

const sendemailgeneric=async ({ recipient,
	subject ,
	body
 } ) => {
	const mailOptions = {
    from: 'no-reply@ecogreenshop.com',
		to : recipient ,
		subject ,
		html : `<div>${body}</div>`
	}
  await transporter.sendMail(mailOptions);
}
const send_verification_mail = async ({email, code}) => {
  const mailOptions = {
    from: 'no-reply@ecogreenshop.com',
    to: email,
    subject: `[${SERVICENAME_DISP}] CONFIRM_MAIL`,
    html: `<h1>[${SERVICENAME_DISP}] CONFIRM_MAIL</h1>
    <h3>Your ${SERVICENAME_DISP} verification code is: ${code}.</h3>
    <h3>Please complete the account verification process in 10 minutes.</h3>
    `,
    // text: ``,
  };
  await transporter.sendMail(mailOptions);
	return true
};

module.exports = { send_verification_mail 
	, sendemailgeneric
};

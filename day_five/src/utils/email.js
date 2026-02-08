
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {

  const simulate = () => {
    console.log(' EMAIL SIMULATION');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message: ${options.message}`);
    
  };

  if (!process.env.EMAIL_HOST) {
    simulate();
    return;
  }


  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  try {
    await transporter.sendMail({
      from: 'Day Five App <admin@example.com>',
      to: options.email,
      subject: options.subject,
      text: options.message
    });
  } catch (_) {
    simulate();
  }
};

module.exports = sendEmail;

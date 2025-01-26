const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: config.smtpEmail,
    pass: config.smtpPass,
  },
});

module.exports = { transporter };

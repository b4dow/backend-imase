const config = require('../config/config');
const boom = require('@hapi/boom');
const { transporter } = require('../libs/nodemailer');

class ContactService {
  async send({ name, email, message }) {
    try {
      await transporter.sendMail({
        from: config.smtpEmail, // sender address
        to: email, // list of receivers
        subject: 'Hello ✔', // Subject line
        text: `${message}`, // plain text body
        html: `<p>Hello ${name}</p>`, // html body
      });

      return {
        message: 'Mensaje Enviado',
      };
    } catch (error) {
      console.log(error)
      throw boom.notFound('Error sending email');
    }
  }
}

module.exports = ContactService;

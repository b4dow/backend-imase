const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
 host: 'smtp.ethereal.email', // Replace with your   server
 port: 587, // Replace with the port your SMTP server uses
 secure: false, // true for 465, false for other ports
 auth: {
  user: 'pierce.brown28@ethereal.email', // Replace with your email
  pass: 'tKzPvw92pHVUWTXqfN', // Replace with your email password
 },
});

// Function to send an email
const sendMail = async (name, email, message) => {
 try {
    let info = await transporter.sendMail({
     from: `"${name} 👻" <${email}>`, // Replace with your sender info
     to: `hackc7360@gmail.com, ${email} `,
     subject: 'Cotización ✔',
     text: message,
     html: '<b>Hello world?</b>', // Uncomment to send HTML email
    });

//   const info = await transporter.sendMail({
//    from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//    to: 'bar@example.com, baz@example.com', // list of receivers
//    subject: 'Hello ✔', // Subject line
//    text: 'Hello world?', // plain text body
//    html: '<b>Hello world?</b>', // html body
//   });

  console.log('Message sent: %s', info.messageId);
 } catch (error) {
  console.error('Error sending email:', error);
 }
};

module.exports = sendMail;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false, //allow use of port 587 must be true if port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

function sendEmail(payload, sender, to) {
  const mailOptions = {
    from: sender === undefined ? "harrybannister@hotmail.com" : sender,
    to: to[0].email,
    subject: payload.subject,
    text: `${payload.content}`,
    html: payload.content,
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      console.log(error, info);
    });
  } catch (error) {
    console.error("Error sending email", error);
  }
}

module.exports = { sendEmail };

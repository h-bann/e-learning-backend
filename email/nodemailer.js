const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: `mail.we-learn.uk`,
  port: 465,
  secure: true, //allow use of port 587 must be true if  port 465
  auth: {
    user: `help@we-learn.uk`,
    pass: `aUL?VIJaMJ@N`,
  },
});

function sendEmail(payload, sender, to) {
  const mailOptions = {
    from: sender === undefined ? "help@we-learn.uk" : sender,
    to: to[0].email,
    subject: payload.subject,
    html: payload.content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error, info);
  });
}

module.exports = { sendEmail };

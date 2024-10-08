const express = require("express");
const router = express.Router();
const { sendEmail } = require("../email/nodemailer");
const { contactForm } = require("../email/templates");
const sanitizeHTML = require("sanitize-html"); // prevent cross-site scripting attack by cleaning html

router.post("/", async (request, response) => {
  const { name, email, message } = request.body;

  if (!email) {
    response.send({ code: 0, message: "Please enter a valid email" });
    return;
  }
  if (!name) {
    response.send({ code: 0, message: "Please enter a name" });
    return;
  }
  if (!message) {
    response.send({ code: 0, message: "Please enter a message" });
    return;
  }

  const cleanedMessage = sanitizeHTML(message, { allowedTags: ["div", "p"] });

  sendEmail(contactForm(cleanedMessage), email, [
    { email: "jolie50@ethereal.email" },
  ]);

  response.send({ code: 1, message: "Message sent" });
});

module.exports = router;

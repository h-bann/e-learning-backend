const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { random } = require("../utils");
const mySQL = require("../mysql/driver");
const { addUser, insertToken } = require("../mysql/queries");
const { sendEmail } = require("../email/nodemailer");
const { welcomeEmail } = require("../email/templates");

router.post("/addUser", async (request, response) => {
  let { email, username, password } = request.body;

  // *  check that there is an email, username or password
  if (!email) {
    response.send({ code: 0, message: "Email missing" });
    return;
  }
  if (!username) {
    response.send({ code: 0, message: "Username missing" });
    return;
  }
  if (!password) {
    response.send({ code: 0, message: "Password missing" });
    return;
  }

  password = sha256(password + "eLearningApp");

  const token = random() + random();

  try {
    const results = await mySQL(addUser(), [email, username, password]);
    await mySQL(insertToken(), [results.insertId, token]);

    sendEmail(welcomeEmail(email), undefined, [{ email, name: "Test" }]);

    response.send({
      code: 1,
      message: "Account created",
      token: token,
    });
  } catch (error) {
    console.log(error);
    response.send({ code: 0, message: "There was an error, sorry." });
  }
});

module.exports = router;

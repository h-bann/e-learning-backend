const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { random } = require("../utils");
const mySQL = require("../mysql/driver");

router.post("/", async (request, response) => {
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
    const result = await mySQL(`INSERT INTO users
                  (email, username, password)
                    VALUES
                      ("${email}", "${username}", "${password}");`);

    await mySQL(`INSERT INTO sessions
                  (user_id, token)
                    VALUES
                      (${result.insertId}, "${token}");`);

    response.send({
      code: 1,
      message: "Account created",
      token: token,
    });
  } catch (error) {
    console.log(error);
    response.send({ code: 0, message: "Duplicate account" });
  }
});

module.exports = router;

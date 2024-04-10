const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { random } = require("../utils");
const mySQL = require("../mysql/driver");
const { checkLoginDetails, insertToken } = require("../mysql/queries");

router.post("/login", async (request, response) => {
  let { username, password } = request.body;

  if (!username) {
    response.send({ code: 0, message: "Username missing" });
    return;
  }
  if (!password) {
    response.send({ code: 0, message: "Password missing" });
    return;
  }

  password = sha256(password + "eLearningApp");

  // search database for matching username and password
  const results = await mySQL(checkLoginDetails(username, password));
  console.log(results);

  // if found: create token, insert created token into sessions table and associate it with user_id
  if (results.length > 0) {
    const token = random() + random();
    await mySQL(insertToken(results[0].user_id, token));

    response.send({
      code: 1,
      message: "Login successful",
      token: token,
    });
    return;
  }

  response.send({ code: 0, message: "Wrong username or password" });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { random } = require("../utils");
const mySQL = require("../mysql/driver");

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
  const results = await mySQL(`SELECT * FROM users
            WHERE username LIKE "${username}" AND password LIKE "${password}";`);

  // if found: create token, insert created token into sessions table and associate it with user_id
  if (results.length > 0) {
    const token = random() + random();
    await mySQL(`INSERT INTO sessions
                  (user_id, token)
                    VALUES
                      (${results[0].user_id}, "${token}");`);

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

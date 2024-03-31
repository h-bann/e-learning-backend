const express = require("express");
const router = express.Router();
const sha256 = require("sha256");

router.post("/login", (request, response) => {
  let { username, password } = request.body;
  let { users } = request;

  if (!username) {
    response.send({ code: 0, message: "Username missing" });
    return;
  }
  if (!password) {
    response.send({ code: 0, message: "Password missing" });
    return;
  }

  password = sha256(password + "eLearningApp");

  const user = users.find((item) => {
    return item.username === username && item.password === password;
  });

  if (!user) {
    response.send({ code: 0, message: "Username or password incorrect" });
    return;
  }

  response.send({ code: 1, message: "Login successful" });
});

module.exports = router;

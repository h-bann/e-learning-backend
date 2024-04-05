const express = require("express");
const router = express.Router();
const sha256 = require("sha256");
const { random } = require("../utils");

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

  const token = random() + random();
  user.token ? user.token.push(token) : (user.token = [token]);

  response.send({
    code: 1,
    id: user.id,
    message: "Login successful",
    token: token,
  });
});

module.exports = router;

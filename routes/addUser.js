const express = require("express");
const router = express.Router();
const sha256 = require("sha256");

router.post("/", (request, response) => {
  let { email, username, password } = request.body;
  let { users, lastAccountId } = request;

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

  //   * if user enters email OR username that matches then send error
  //   ! CHANGE OPERATOR BACK TO || AFTER TESTING
  const user = users.find((item) => {
    return item.email === email || item.username === username;
  });

  if (user) {
    response.send({
      code: 0,
      message: "An account with this email or username already exists",
    });
    return;
  }

  lastAccountId.value = lastAccountId.value + 1;
  users.push({ email, username, password, id: lastAccountId.value });
  response.send({ code: 1, id: lastAccountId.value });
});

module.exports = router;

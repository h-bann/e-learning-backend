const express = require("express");
const mySQL = require("../mysql/driver");
const router = express.Router();
const { getUser } = require("../mysql/queries");

router.get("/", (request, response) => {
  const { users } = request;

  if (users.length === 0) {
    response.send("No users");
    return;
  }
  response.send(users);
});

router.get("/getUser", async (request, response) => {
  const { token } = request.headers;
  const results = await mySQL(getUser(token));

  if (results.length > 0) {
    response.send({
      code: 1,
      user: {
        email: results[0].email,
        username: results[0].username,
        password: results[0].password,
      },
    });
  }
});

module.exports = router;

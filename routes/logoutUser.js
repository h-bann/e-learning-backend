const express = require("express");
const mySQL = require("../mysql/driver");
const { deleteToken } = require("../mysql/queries");
const router = express.Router();

router.delete("/logout", async (request, response) => {
  const { token } = request.headers;
  if (!token) {
    response.send({ code: 0, message: "Invalid token" });
    return;
  }

  await mySQL(deleteToken(), [request.headers.token]);
  response.send({ code: 1, message: "Logout successful" });
});

module.exports = router;

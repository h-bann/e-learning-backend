const express = require("express");
const mySQL = require("../mysql/driver");
const { deleteToken } = require("../mysql/queries");
const router = express.Router();

router.delete("/logout", async (request, response) => {
  await mySQL(deleteToken(request.headers.token));
  response.send({ code: 1, message: "Logout successful" });
});

module.exports = router;

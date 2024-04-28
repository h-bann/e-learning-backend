const express = require("express");
const mySQL = require("../mysql/driver");
const { deleteUser } = require("../mysql/queries");
const router = express.Router();

router.delete("/delete", async (request, response) => {
  await mySQL(deleteUser(), [request.headers.token]);
  response.send({ code: 1, message: "Account deleted" });
});

module.exports = router;

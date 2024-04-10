const express = require("express");
const sha256 = require("sha256");
const mySQL = require("../mysql/driver");
const { updateUserDetails } = require("../mysql/queries");
const router = express.Router();

router.patch("/update", async (request, response) => {
  const { email, username, password } = request.body;
  const { token } = request.headers;
  // const { verifiedUser } = request;

  if (!(email || username || password)) {
    response.send({ code: 0, message: "Missing data" });
  }

  if (email) {
    console.log(updateUserDetails("email", email, token));
    await mySQL(updateUserDetails("email", email, token));
  }
  if (username) {
    await mySQL(updateUserDetails("username", username, token));
  }
  if (password) {
    await mySQL(
      updateUserDetails("password", sha256(password + "eLearningApp"), token)
    );
  }

  response.send({ code: 1, message: "Details successfully changed!" });
});

module.exports = router;

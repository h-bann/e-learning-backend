const express = require("express");
const sha256 = require("sha256");
const router = express.Router();

router.patch("/:id", (request, response) => {
  const { email, username, password } = request.body;
  const { id } = request.params;
  const { users } = request;

  if (!(email || username || password)) {
    response.send({ code: 0, message: "Missing data" });
  }

  const idAsNumber = Number(id);

  //   check that user ID exists and is a number
  if (!id || isNaN(idAsNumber)) {
    response.send("Not a valid ID number");
    return;
  }

  //   check that user ID being checked matches one in database
  const indexOfUser = users.findIndex((item) => {
    return item.id === idAsNumber;
  });

  //   if not in database, send error message
  if (indexOfUser === -1) {
    response.send("Account not found");
    return;
  }

  if (email) {
    users[indexOfUser].email = email;
  }
  if (username) {
    users[indexOfUser].username = username;
  }
  if (password) {
    users[indexOfUser].password = sha256(password + "eLearningApp");
  }

  response.send({ code: 1, message: "Details successfully changed!" });
});

module.exports = router;

const express = require("express");
const { verifyToken } = require("../middleware");
const router = express.Router();

router.get("/", (request, response) => {
  const { users } = request;

  if (users.length === 0) {
    response.send("No users");
    return;
  }
  response.send(users);
});

router.get("/", verifyToken, (request, response) => {
  response.send({ code: 1, user: request.verifiedUser });
});

module.exports = router;

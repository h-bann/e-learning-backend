const express = require("express");
const { verifyToken } = require("../middleware");
const router = express.Router();

router.delete("/", verifyToken, (request, response) => {
  let { users } = request;
  users.splice(request.verifiedUser, 1);
  response.send({ code: 1, message: "Account deleted" });
});

module.exports = router;

const express = require("express");
const { verifyToken } = require("../middleware");
const router = express.Router();

router.delete("/logout", verifyToken, (request, response) => {
  request.verifiedUser.token.splice(
    request.verifiedUser.token.indexOf(request.headers.token),
    1
  );

  response.send({ code: 1, message: "Logout successful" });
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/verify-email", async (request, response) => {
  console.log(request);
  const { token } = request.query;
  console.log(token);

  if (token) {
    response.send({ code: 1, message: "Verification complete" });
  }
});

module.exports = router;

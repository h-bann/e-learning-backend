const express = require("express");
const router = express.Router();

router.delete("/:id", (request, response) => {
  let { id } = request.params;
  let { users } = request;

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

  //   otherwise, delete user from users array
  users.splice(indexOfUser, 1);
  response.send({ code: 1, message: "Account deleted" });
});

module.exports = router;

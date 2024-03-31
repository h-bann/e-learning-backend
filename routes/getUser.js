const express = require("express");
const router = express.Router();

router.get("/", (request, response) => {
  const { users } = request;

  if (users.length === 0) {
    response.send("No users");
    return;
  }
  response.send(users);
  console.log(users);
});

router.get("/:id", (request, response) => {
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

  //   return user at that particular index
  response.send({ code: 1, user: users[indexOfUser] });
});

module.exports = router;

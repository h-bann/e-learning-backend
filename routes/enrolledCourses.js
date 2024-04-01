const express = require("express");
const router = express.Router();

router.patch("/enrolled/:id", (request, response) => {
  const { id } = request.params;
  const courseId = request.body.id;
  const { users } = request;

  //   console.log(courseId);

  //   console.log(users);

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

  // if there's no enrolled courses data, then create empty array
  if (!users[indexOfUser].enrolledCourses) {
    users[indexOfUser].enrolledCourses = [];
  }

  //   destructure enrolledCourses from selected user
  let { enrolledCourses } = users[indexOfUser];

  //   if course is already enrolled, show error
  const course = enrolledCourses.find((item) => {
    return item.id === courseId;
  });

  if (course) {
    response.send({ code: 0, message: "Already enrolled on course" });
    return;
  }

  //   add course to enrolled courses
  users[indexOfUser].enrolledCourses.push(request.body);
  response.send({ code: 1, message: "Enrolled on course" });
});

module.exports = router;

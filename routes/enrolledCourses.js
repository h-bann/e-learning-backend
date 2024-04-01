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

router.delete("/enrolled/:id/:courseId", (request, response) => {
  const { id, courseId } = request.params;
  const { users } = request;

  console.log(id, courseId);
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

  //   destructure enrolledCourses from selected user
  const { enrolledCourses } = users[indexOfUser];

  //   if course is already enrolled, show error
  const courseIndex = enrolledCourses.findIndex((item) => {
    return item.id === Number(courseId);
  });

  if (courseIndex === -1) {
    response.send({ code: 0, message: "Course not found in enrolled courses" });
    return;
  }

  users[indexOfUser].enrolledCourses.splice(courseIndex, 1);
  response.send({ code: 1, message: "User has unenrolled from course" });
});

module.exports = router;

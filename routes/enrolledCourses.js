const express = require("express");
const { verifyToken } = require("../middleware");
const router = express.Router();

router.patch("/enrolled", verifyToken, (request, response) => {
  const courseId = request.body.id;
  const { verifiedUser } = request;

  // if no enrolledCourses, create enrolled courses array and add body
  if (!verifiedUser.enrolledCourses) {
    verifiedUser.enrolledCourses = [request.body];
    response.send({ code: 1, message: "Enrolled on course" });
    return;
  }

  // if enrolledCourses, check if user already enrolled
  if (verifiedUser.enrolledCourses) {
    const courseDuplicate = verifiedUser.enrolledCourses.find((item) => {
      console.log(item.id);
      console.log(courseId);
      return item.id === courseId;
    });
    // show error if already enrolled
    if (courseDuplicate) {
      response.send({ code: 0, message: "Already enrolled on course" });
      return;
    }
    // enrol user onto course if not already enrolled
    verifiedUser.enrolledCourses.push(request.body);
    response.send({ code: 1, message: "Enrolled on course" });
  }
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

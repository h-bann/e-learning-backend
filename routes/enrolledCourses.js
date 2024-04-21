const express = require("express");
const { verifyToken } = require("../middleware");
const { userEnrolledCourses, getUser } = require("../mysql/queries");
const mySQL = require("../mysql/driver");

const router = express.Router();

router.patch("/enrolled", async (request, response) => {
  const { token } = request.headers;
  const user = await mySQL(getUser(token));

  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }

  await mySQL(userEnrolledCourses(user[0].user_id, request.body.course_title));
  response.send({ code: 1, message: "Enrolled on course" });
  return;

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

router.delete("/deleteEnrolled/:courseId", verifyToken, (request, response) => {
  const { courseId } = request.params;
  const { verifiedUser } = request;

  const courseNumber = Number(courseId);

  const courseIndex = verifiedUser.enrolledCourses.findIndex((item) => {
    return item.id === courseNumber;
  });

  if (courseIndex === -1) {
    response.send("Course not found");
    return;
  }
  if (courseIndex >= 0) {
    verifiedUser.enrolledCourses.splice(courseIndex, 1);
    response.send({ code: 1, message: "User has unenrolled from course" });
    return;
  }
});

module.exports = router;

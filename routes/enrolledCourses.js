const express = require("express");
const { verifyToken } = require("../middleware");
const {
  addEnrolledCourses,
  getUser,
  getEnrolledCourses,
} = require("../mysql/queries");
const mySQL = require("../mysql/driver");

const router = express.Router();

router.patch("/enrolled", async (request, response) => {
  const { token } = request.headers;
  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }

  const enrolledCourses = await mySQL(getEnrolledCourses());
  const { course_title, course_id } = request.body;

  if (enrolledCourses) {
    const duplicate = enrolledCourses.some((item) => {
      return item.course_title.includes(course_title);
    });
    if (duplicate) {
      return;
    }
  }

  await mySQL(addEnrolledCourses(), [user[0].user_id, course_title, course_id]);
  response.send({ code: 1, message: "Enrolled on course" });
});

router.get("/getEnrolledCourses", async (request, response) => {
  const { token } = request.headers;
  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }
  const enrolledCourses = await mySQL(getEnrolledCourses());
  response.send({ code: 1, enrolledCourses: enrolledCourses });
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

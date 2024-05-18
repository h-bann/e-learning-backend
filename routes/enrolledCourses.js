const express = require("express");
const { verifyToken } = require("../middleware");
const {
  addEnrolledCourses,
  getUser,
  getEnrolledCourses,
  deleteEnrolledCourse,
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

  const enrolledCourses = await mySQL(getEnrolledCourses(), [token]);
  const { course_title, course_id, image } = request.body;
  if (enrolledCourses) {
    const duplicate = enrolledCourses.some((item) => {
      return item.course_title.includes(course_title);
    });
    if (duplicate) {
      return;
    }
  }

  await mySQL(addEnrolledCourses(), [
    user[0].user_id,
    course_title,
    course_id,
    image,
  ]);
  response.send({ code: 1, message: "Enrolled on course" });
});

router.get("/getEnrolledCourses", async (request, response) => {
  const { token } = request.headers;
  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }
  const enrolledCourses = await mySQL(getEnrolledCourses(), [token]);
  response.send({ code: 1, enrolledCourses: enrolledCourses });
});

router.delete("/deleteEnrolled/:courseId", async (request, response) => {
  const { token } = request.headers;
  const { courseId } = request.params;

  await mySQL(deleteEnrolledCourse(), [token, courseId]);
  response.send({ code: 1, message: "Successfully left course" });
});

module.exports = router;

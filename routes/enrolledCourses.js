const express = require("express");
const { verifyToken } = require("../middleware");
const {
  addEnrolledCourses,
  getUser,
  getEnrolledCourses,
  deleteEnrolledCourse,
  courseProgress,
  courseComplete,
  moduleProgress,
  courseCompletion,
  userProgress,
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
      response.send({ code: 1, message: "Already enrolled" });
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

router.patch("/courseProgress", async (request, response) => {
  const { token } = request.headers;
  const { moduleId, courseId } = request.body;

  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }
  await mySQL(courseProgress(), [
    Number(moduleId),
    user[0].user_id,
    Number(courseId),
  ]);
  response.send({ code: 1, message: "Course progress recorded" });
});

router.patch("/courseComplete", async (request, response) => {
  const { token } = request.headers;
  const { courseId } = request.body;

  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
  }

  await mySQL(courseComplete(), ["true", user[0].user_id, Number(courseId)]);
});

router.get("/userProgress", async (request, response) => {
  const { token, id } = request.headers;

  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }
  const result = await mySQL(userProgress(), [token, Number(id)]);

  const duplicate = result[0].module_ids.map((item) => {
    console.log(item);
  });

  // console.log(result);

  response.send({ code: 1, message: result });
});

router.patch("/moduleProgress", async (request, response) => {
  const { token } = request.headers;
  const { moduleId, courseId } = request.body;

  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }

  try {
    await mySQL(moduleProgress(), [
      user[0].user_id,
      courseId,
      moduleId,
      "complete",
    ]);
    response.send({ code: 1, message: "Course progress recorded" });
  } catch (error) {
    if ((error.code = "ER_DUP_ENTRY")) {
      response.send({ code: 0, message: "Module already completed" });
      return;
    }
    response.send({ code: 0, message: "Error, sorry" });
  }
});

router.patch("/courseCompletion", async (request, response) => {
  const { token } = request.headers;
  const { courseId } = request.body;

  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }

  try {
    await mySQL(courseCompletion(), [
      "complete",
      user[0].user_id,
      Number(courseId),
    ]);
    response.send({ code: 1, message: "Course finished" });
  } catch (error) {
    if (error) {
      response.send({ code: 0, message: "Error completing course" });
    }
  }
});

router.delete("/deleteEnrolled", async (request, response) => {
  const { token } = request.headers;
  const courseId = request.headers.id;

  try {
    await mySQL(deleteEnrolledCourse(), [
      token,
      Number(courseId),
      Number(courseId),
    ]);
    response.send({ code: 1, message: "Successfully left course" });
  } catch (error) {
    if (error) {
      response.send({ code: 0, message: "Error deleting course" });
    }
  }
});

module.exports = router;

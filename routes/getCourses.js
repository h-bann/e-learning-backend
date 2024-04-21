const express = require("express");
const router = express.Router();
// const courses =require("../courseContent.json");
const { verifyToken } = require("../middleware");
const mySQL = require("../mysql/driver");
const {
  getCourses,
  getContent,
  getModules,
  getCourse,
  getUser,
} = require("../mysql/queries");

router.get("/", async (request, response) => {
  // const { id } = request.params;
  // const idAsNumber = Number(id);

  const courses = await mySQL(getCourses());
  // console.log(courses);

  // const content = await mySQL(getContent());
  // courses.map((item) => {
  //   console.log(content);
  // });

  // const content = courses.map((item) => {
  //   return {
  //     course_title: item.course_title,
  //     type: item.type,
  //     content: item.content,
  //   };
  // });

  response.send({ code: 1, courses: courses });
});

router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const { token } = request.headers;

  const user = await mySQL(getUser(token));
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }

  const course = await mySQL(getCourse(id));
  const modules = await mySQL(getModules(id));

  course[0].modules = modules;

  for (let i = 0; i < course[0].modules.length; i++) {
    const content = await mySQL(getContent(course[0].modules[i].id));

    course[0].modules[i].content = content;
  }
  response.send({ code: 1, course: course[0] });
});

module.exports = router;

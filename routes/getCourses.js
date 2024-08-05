const express = require("express");
const router = express.Router();
const mySQL = require("../mysql/driver");
const {
  getCourses,
  getContent,
  getModules,
  getCourse,
  getUserCourses,
  getUser,
} = require("../mysql/queries");

router.get("/getCourses", async (request, response) => {
  const { token } = request.headers;

  const user = await mySQL(getUser(), [token]);

  // if user not logged in, only access basic course info
  if (user < 1) {
    const courses = await mySQL(getCourses());
    response.send({ code: 1, courses: courses });
    return;
  }
  // if user logged in, access entirety of course
  if (user) {
    // const courses = await mySQL(getUserCourses(), [user[0].user_id]);
    const courses = await mySQL(getCourses());
    const modules = await mySQL(getModules());
    const content = await mySQL(getContent());

    // const joinedCourses = {};

    // courses.forEach((course) => {
    //   // joinedCourses[course.course_id] = course;
    //   joinedCourses[course.id] = course;
    //   console.log(course);
    //   course.modules = [];
    // });
    // const joinedModules = {};

    // modules.forEach((module) => {
    //   if (joinedCourses[module.course_id]) {
    //     joinedCourses[module.course_id].modules.push(module);
    //     joinedModules[module.id] = module;
    //     module.content = [];
    //   }
    // });

    // content.forEach((content) => {
    //   if (joinedModules[content.module_id]) {
    //     joinedModules[content.module_id].content.push(content);
    //   }
    // });

    response.send({ code: 1, courses: courses });
  }
});

router.get("/getCourse/:id", async (request, response) => {
  const { id } = request.params;
  const { token } = request.headers;

  const user = await mySQL(getUser(), [token]);
  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }

  const course = await mySQL(getCourses(), [id]);
  const modules = await mySQL(getModules(), [id]);

  course[0].modules = modules;

  for (let i = 0; i < course[0].modules.length; i++) {
    const content = await mySQL(getContent(), [course[0].modules[i].id]);

    course[0].modules[i].content = content;
  }
  response.send({ code: 1, course: course[0] });
});

module.exports = router;

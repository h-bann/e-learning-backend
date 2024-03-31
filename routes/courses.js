const express = require("express");
const router = express.Router();
const courses = require("../courseContent.json");

router.get("/", (request, response) => {
  const { id, title } = request.query;
  const idAsNumber = Number(id);

  let copy = [...courses];

  if (idAsNumber) {
    copy = copy.filter((course) => {
      return idAsNumber === course.id;
    });
  }

  if (title) {
    copy = copy.filter((course) => {
      return course.title.toLowerCase().includes(title.toLowerCase());
    });
  }

  response.send(copy);
});

module.exports = router;
function addUser() {
  return `INSERT INTO users
        (email, username, password)
            VALUES
                (?, ?, ?);`;
}

function getUser() {
  return `SELECT * FROM users
            JOIN sessions on users.user_id = sessions.user_id
            WHERE token LIKE ?;`;
}

function insertToken() {
  return `INSERT INTO sessions
            (user_id, token)
                VALUES
                    (?, ?);`;
}

function deleteToken() {
  return `DELETE FROM sessions
                WHERE token LIKE ?;`;
}

function checkLoginDetails() {
  return `SELECT * FROM users
            WHERE username LIKE ? AND password LIKE ?;`;
}

function updateUserDetails(key, value, token) {
  return `UPDATE users
            JOIN sessions ON users.user_id = sessions.user_id
                SET ${key} = "${value}"
                    WHERE sessions.token LIKE "${token}";`;
}

function deleteUser() {
  return `DELETE users, sessions FROM users
            JOIN sessions ON users.user_id = sessions.user_id
                WHERE token LIKE ?;`;
}

function getCourse() {
  return `SELECT course_title AS courseTitle FROM courses
            WHERE id = ?;`;
}

function getCourses() {
  return `SELECT * FROM courses;`;
}

function getModules() {
  return `SELECT * FROM modules
            WHERE course_id = ?;`;
}

function getContent(module_id) {
  return `SELECT * FROM content 
            WHERE module_id = ${module_id};`;
}

function addEnrolledCourses(user_id, course_title, course_id) {
  return `INSERT INTO enrolled_courses
            (user_id, course_title, course_id)
              VALUES
                (${user_id}, "${course_title}", "${course_id}");`;
}

function getEnrolledCourses() {
  return `SELECT courses.id, courses.course_title, courses.image, courses.more_info, courses.instructions FROM courses
            JOIN enrolled_courses ON courses.id = enrolled_courses.course_id
              ;`;
}

module.exports = {
  addUser,
  getUser,
  insertToken,
  checkLoginDetails,
  // checkToken,
  updateUserDetails,
  deleteUser,
  deleteToken,
  getCourses,
  getCourse,
  getModules,
  getContent,
  addEnrolledCourses,
  getEnrolledCourses,
};

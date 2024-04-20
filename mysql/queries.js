function addUser(email, username, password) {
  return `INSERT INTO users
        (email, username, password)
            VALUES
                ("${email}", "${username}", "${password}");`;
}

function getUser(token) {
  return `SELECT * FROM users
            JOIN sessions on users.user_id = sessions.user_id
            WHERE token LIKE "${token}";`;
}

function insertToken(user_id, token) {
  return `INSERT INTO sessions
            (user_id, token)
                VALUES
                    (${user_id}, "${token}");`;
}

function deleteToken(token) {
  return `DELETE FROM sessions
                WHERE token LIKE "${token}";`;
}

function checkLoginDetails(username, password) {
  return `SELECT * FROM users
            WHERE username LIKE "${username}" AND password LIKE "${password}";`;
}

// function checkToken(token) {
//   return `SELECT * FROM sessions
//                 WHERE token LIKE "${token}";`;
// }

function updateUserDetails(key, value, token) {
  return `UPDATE users
            JOIN sessions ON users.user_id = sessions.user_id
                SET ${key} = "${value}"
                    WHERE sessions.token LIKE "${token}";`;
}

function deleteUser(token) {
  return `DELETE users, sessions FROM users
            JOIN sessions ON users.user_id = sessions.user_id
                WHERE token LIKE "${token}";`;
}

function getCourse(course_id) {
  return `SELECT course_title AS courseTitle FROM courses
            WHERE id = ${course_id};`;
}

function getCourses() {
  return `SELECT * FROM courses;`;
}

function getModules(course_id) {
  return `SELECT * FROM modules
            WHERE course_id = ${course_id};`;
}

function getContent(module_id) {
  return `SELECT * FROM content 
            WHERE module_id = ${module_id};`;
}

function userEnrolledCourses(user_id, course_title) {
  return `INSERT INTO enrolled_courses
            (user_id, course_title)
              VALUES
                (${user_id}, "${course_title}");`;
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
  userEnrolledCourses,
};

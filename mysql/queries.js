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

function checkExistingUserDetails() {
  return `SELECT * FROM users
            WHERE username LIKE ? OR email LIKE ?;`;
}

function updateUserDetails(key) {
  return `UPDATE users
            JOIN sessions ON users.user_id = sessions.user_id
                SET ${key} = ?
                    WHERE sessions.token LIKE ?;`;
}

function deleteUser() {
  return `DELETE users.*, sessions.*, enrolled_courses.* FROM users
            JOIN sessions on users.user_id = sessions.user_id
            JOIN enrolled_courses on users.user_id = enrolled_courses.user_id
              WHERE token LIKE ?;`;
}

function getCourse() {
  return `SELECT course_title AS courseTitle, id AS courseId FROM courses
            WHERE id = ?;`;
}

function getCourses() {
  return `SELECT * FROM courses;`;
}

function getModules() {
  return `SELECT * FROM modules
            WHERE course_id = ?;`;
}

function getContent() {
  return `SELECT * FROM content 
            WHERE module_id = ?;`;
}

function addEnrolledCourses() {
  return `INSERT INTO enrolled_courses
            (user_id, course_title, course_id, image)
              VALUES
                (?, ?, ?, ?);`;
}

function getEnrolledCourses() {
  return `SELECT enrolled_courses.* FROM users
            JOIN sessions on users.user_id = sessions.user_id
            JOIN enrolled_courses on users.user_id = enrolled_courses.user_id
              WHERE token LIKE ?;`;
}

function deleteEnrolledCourse() {
  return `DELETE enrolled_courses.* FROM users
            JOIN sessions on users.user_id = sessions.user_id
            JOIN enrolled_courses on users.user_id = enrolled_courses.user_id
              WHERE token LIKE ? AND enrolled_courses.course_id LIKE ?;`;
}

function courseProgress() {
  return `UPDATE enrolled_courses
            SET course_progress = ?
              WHERE user_id = ? AND course_id = ?;`;
}

function courseComplete() {
  return `UPDATE enrolled_courses
            SET course_complete = ?
               WHERE user_id = ? AND course_id = ?;`;
}

function insertCourses() {
  return `INSERT INTO courses
            (course_title, image, more_info, instructions)
                VALUES
                    (?,?,?,?);`;
}

function insertModules() {
  return `INSERT INTO modules
            (course_id, module_title)
                VALUES
                    (?,?);`;
}

function insertSubModules() {
  return `INSERT INTO sub_modules
            (module_id, sub_module_title)
                VALUES
                    (?,?);`;
}

function insertContent() {
  return `INSERT INTO content
            (sub_module_id, type, content)
                VALUES
                    (?,?,?);`;
}

module.exports = {
  addUser,
  getUser,
  insertToken,
  checkLoginDetails,
  checkExistingUserDetails,
  updateUserDetails,
  deleteUser,
  deleteToken,
  getCourses,
  getCourse,
  getModules,
  getContent,
  addEnrolledCourses,
  getEnrolledCourses,
  deleteEnrolledCourse,
  courseProgress,
  courseComplete,
  insertCourses,
  insertModules,
  insertSubModules,
  insertContent,
};

//

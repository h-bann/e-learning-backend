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
  return `SELECT course_title AS courseTitle, id AS courseId, image, more_info,  FROM courses
            WHERE id = ?;`;
}

// function getCourses() {
//   return `SELECT * FROM courses
//             WHERE id = ?;`;
// }

function getUserCourses() {
  return `SELECT users.user_id, enrolled_courses.course_id, courses.course_title, enrolled_courses.course_status, courses.image, courses.more_info, courses.instructions FROM users
          JOIN enrolled_courses on users.user_id = enrolled_courses.user_id
          JOIN courses on enrolled_courses.course_id = courses.id
            WHERE users.user_id LIKE ?;`;
}

function getCourses() {
  return `SELECT * FROM courses
            ;`;
}

// function getModules() {
//   return `SELECT * FROM modules
//             WHERE course_id = ?;`;
// }

function getModules() {
  return `SELECT * FROM modules;`;
}

// function getContent() {
//   return `SELECT * FROM content
//             WHERE module_id = ?;`;
// }

function getContent() {
  return `SELECT * FROM content;`;
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

// function getEnrolledCourses() {
//   return `SELECT enrolled_courses.*, user_course_progress.module_id, user_course_progress.module_status FROM users
//             JOIN sessions on users.user_id = sessions.user_id
//             JOIN enrolled_courses on users.user_id = enrolled_courses.user_id
//             JOIN user_course_progress on users.user_id = user_course_progress.user_id
//               WHERE token LIKE ?;`;
// }

// function getEnrolledCourses() {
//   return `SELECT
//     enrolled_courses.user_id, enrolled_courses.course_status, enrolled_courses.course_title, enrolled_courses.image,
//     enrolled_courses.course_id,
//     GROUP_CONCAT(user_course_progress.module_id, ':', user_course_progress.module_status SEPARATOR ', ') AS module_statuses
// FROM users
// JOIN sessions ON users.user_id = sessions.user_id
// JOIN enrolled_courses ON users.user_id = enrolled_courses.user_id
// JOIN user_course_progress ON users.user_id = user_course_progress.user_id
// WHERE sessions.token LIKE ?
// GROUP BY enrolled_courses.user_id, enrolled_courses.course_id;;`;
// }

function deleteEnrolledCourse() {
  return `DELETE enrolled_courses FROM users
            JOIN sessions on users.user_id = sessions.user_id
            JOIN enrolled_courses on users.user_id = enrolled_courses.user_id
              WHERE sessions.token LIKE ? AND enrolled_courses.course_id LIKE ?;`;
}

function deleteUserProgress() {
  return `DELETE user_course_progress FROM users
            JOIN sessions on users.user_id = sessions.user_id
            JOIN user_course_progress on users.user_id = user_course_progress.user_id
              WHERE sessions.token LIKE ? AND user_course_progress.course_id LIKE ?;`;
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

// ! NEW VERSIONS
// function userProgress() {
//   return `SELECT * FROM user_course_progress
// 	        	WHERE user_id LIKE ? AND course_id LIKE ?;`;
// }

// function userProgress() {
//   return `SELECT
//     enrolled_courses.user_id,
//     enrolled_courses.course_id, enrolled_courses.course_title, enrolled_courses.image,
//     GROUP_CONCAT(user_course_progress.module_id ORDER BY user_course_progress.module_id SEPARATOR ', ') AS module_ids,
//     IF(COUNT(*) = SUM(CASE WHEN user_course_progress.module_status = 'complete' THEN 1 ELSE 0 END), 'complete', 'incomplete') AS course_status
// FROM users
// JOIN sessions ON users.user_id = sessions.user_id
// JOIN enrolled_courses ON users.user_id = enrolled_courses.user_id
// JOIN user_course_progress ON users.user_id = user_course_progress.user_id
// WHERE sessions.token LIKE ? AND enrolled_courses.course_id LIKE ?
// GROUP BY enrolled_courses.user_id, enrolled_courses.course_id;`;
// }

function userProgress() {
  return `SELECT enrolled_courses.course_id, GROUP_CONCAT(user_course_progress.module_id ORDER BY user_course_progress.module_id SEPARATOR ', ' ) AS module_ids 
            FROM users	
              JOIN sessions ON users.user_id = sessions.user_id
                JOIN enrolled_courses ON users.user_id = enrolled_courses.user_id
                  JOIN user_course_progress ON enrolled_courses.course_id = user_course_progress.course_id
                    WHERE sessions.token LIKE ? AND enrolled_courses.course_id LIKE ?;`;
}

function moduleProgress() {
  return `INSERT INTO user_course_progress
            (user_id, course_id, module_id, module_status)
              VALUES
                (?, ?, ?, ?);`;
}

function courseCompletion() {
  return `UPDATE enrolled_courses
            SET course_status = ?
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
  getUserCourses,
  getCourse,
  getModules,
  getContent,
  addEnrolledCourses,
  getEnrolledCourses,
  deleteEnrolledCourse,
  deleteUserProgress,
  courseProgress,
  courseComplete,

  userProgress,
  moduleProgress,
  courseCompletion,
  insertCourses,
  insertModules,
  insertSubModules,
  insertContent,
};

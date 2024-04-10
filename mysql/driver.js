const mysql = require("mysql");
// const data = require("../courseContent.json");
// const { connect } = require("../routes/enrolledCourses");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "elearning-app",
});

connection.connect();

function mySQL(query) {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(results);
    });
  });
}

module.exports = mySQL;

// connection.query("SELECT * from courses;", function (error, results, fields) {
//   console.log(results, error); // connected!
// });

// * adds data to primary table of courses
// data.forEach((item) => {
//   const query = `INSERT INTO courses
//            (course_title, image, more_info, instructions)
//                    VALUES
//                       ("${item.title}", "${item.image}", "${item.moreInformation}", "${item.instructions}")
//                                    `;
//   connection.query(query, (error, results) => {
//     item.modules.forEach((item) => {
//       const query = `INSERT INTO modules
//                             (name, course_id)
//                                     VALUES
//                                         ("${item.moduleTitle}", ${results.insertId})`;
//       connection.query(query, (error, results) => {
//         item.moduleContent.forEach((outerItem) => {
//           if (Array.isArray(outerItem.content)) {
//             outerItem.content.forEach((item) => {
//               const contentQueryList = `INSERT INTO content
//                                          (module_id, type, content)
//                                              VALUES
//                                                 (${results.insertId}, "${outerItem.type}", "${item}")`;
//               connection.query(contentQueryList, (error, results) => {
//                 console.log(error, results);
//               });
//             });
//           } else {
//             const contentQueryOther = `INSERT INTO content
//                                          (module_id, type, content)
//                                              VALUES
//                                                 (${results.insertId}, "${outerItem.type}", "${outerItem.content}")`;
//             connection.query(contentQueryOther, (error, results) => {
//               console.log(error, results);
//             });
//           }
//         });
//         // item.moduleContent.forEach((item) => {
//         //   const contentQueryList = `INSERT INTO content
//         // (module_id, type, content)
//         //             VALUES
//         //                 (${results.insertId}), "${item.content.type}", "${item.moduleContent.content}`;
//         //   const contentQueryOther = `INSERT INTO content
//         // (module_id, type, content)
//         //             VALUES
//         //                 (${results.insertId}), "${item.content.type}", "${item.moduleContent.content}`;
//         //   if (Array.isArray(item.content)) {
//         //     console.log(item.type);
//         //     item.content.forEach((item) => {
//         //       console.log(item);
//         //     });
//         //   } else {
//         //     console.log(item.content);
//         //   }
//         //   connection.query(contentQuery, (error, results) => {
//         //     console.log(error, results);
//         //   });
//         // });
//       });
//     });
//     console.log(results, error ? error : "");
//   });
// });

// data.forEach((item) => {
//   item.modules.forEach((item) => {
//     item.content.forEach((item) => {
//       //   console.log(item.type, item.content);
//       if (Array.isArray(item.content)) {
//         console.log(item.type);
//         item.content.forEach((item) => {
//           console.log(item);
//         });
//       } else {
//         console.log(item.content);
//       }
//     });
// item.content.forEach((item) => {
//   console.log(item.type, item.content);
// });

// if (Array.isArray(item.content)) {
//   item.content.forEach((item) => {
//     console.log(item.type, item.content);
//   });
// }
// if (!Array.isArray(item.content)) {
//   console.log("not an array");
// }
//   });
// });

// connection.query(
//   `INSERT INTO users
//                     (username, email, password)
//                         VALUES
//                             ("harry", "harry@b.c", "abcde")

// `,
//   (results, error) => {
//     console.log(results, error);
//   }
// );

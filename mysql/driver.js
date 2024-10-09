const mysql = require("mysql");
const {
  insertCourses,
  insertModules,
  insertSubModules,
  insertContent,
} = require("../mysql/queries");
// const data = require("../courseContent.json");

// ! When using local database
// const connection = mysql.createConnection({
//   host: process.env.DB_LOCALHOST,
//   user: process.env.DB_LOCALUSER,
//   password: process.env.DB_LOCALPASSWORD,
//   database: process.env.DB_LOCALDATABASE,
//   multipleStatements: false,
// });

// ! When using Host Presto database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect((error) => {
  if (error) {
    console.error("Error connecting to database:", error);
  }
});

function mySQL(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

module.exports = mySQL;

// ! Inserts data into database
// const insertData = () => {
//   return data.forEach(async (itemOne) => {
//     const resultsOne = await mySQL(insertCourses(), [
//       itemOne.title,
//       itemOne.image,
//       itemOne.moreInformation,
//       itemOne.instructions,
//     ]);
//     itemOne.modules.forEach(async (itemTwo) => {
//       const resultsTwo = await mySQL(insertModules(), [
//         resultsOne.insertId,
//         itemTwo.moduleTitle,
//       ]);
//       itemTwo.subModules.forEach(async (itemThree) => {
//         const resultsThree = await mySQL(insertSubModules(), [
//           resultsTwo.insertId,
//           itemThree.subModuleTitle,
//         ]);
//         itemThree.content.forEach(async (itemFour) => {
//           return mySQL(insertContent(), [
//             resultsThree.insertId,
//             itemFour.type,
//             itemFour.content,
//           ]);
//         });
//       });
//     });
//   });
// };
// insertData();

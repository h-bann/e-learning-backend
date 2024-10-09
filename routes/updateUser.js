const express = require("express");
const sha256 = require("sha256");
const mySQL = require("../mysql/driver");
const {
  updateUserDetails,
  getUser,
  checkExistingUserDetails,
} = require("../mysql/queries");
const router = express.Router();

router.patch("/update", async (request, response) => {
  let { email, username, currentPassword, password } = request.body;
  const { token } = request.headers;

  try {
    // if no token - error
    if (!token) {
      response.send({ code: 0, message: "Missing token" });
      return;
    }

    // return user where token matches
    const user = await mySQL(getUser(), [token]);

    // if no user returned - error
    if (user < 1) {
      response.send({ code: 0, message: "No matching account" });
      return;
    }

    const existingDetails = await mySQL(checkExistingUserDetails(), [
      username,
      email,
    ]);

    // if details entered are same as database - error
    if (existingDetails.length && email === existingDetails[0].email) {
      response.send({
        code: 0,
        message: "This email is already taken, please try again",
      });
      return;
    }

    // if details entered are same as database - error
    if (existingDetails.length && username === existingDetails[0].username) {
      response.send({
        code: 0,
        message: "This username is already taken, please try again",
      });
      return;
    }
    // if email or username entered, change database record
    if (email) {
      await mySQL(updateUserDetails("email"), [email, token]);
      response.send({ code: 1, message: "Email change successful" });
      return;
    }

    if (username) {
      await mySQL(updateUserDetails("username"), [username, token]);
      response.send({ code: 1, message: "Username change successful" });
      return;
    }
    // if password entered, sha password
    if (password) {
      currentPassword = sha256(currentPassword + "eLearningApp");
      password = sha256(password + "eLearningApp");
      if (currentPassword !== user[0].password) {
        response.send({
          code: 2,
          message: "Current password is incorrect",
        });
        return;
      }
      // if password same as database - error
      if (password === user[0].password) {
        response.send({
          code: 0,
          message: "This is the same as your current password",
        });

        return;
      }
      // else, change database record
      await mySQL(updateUserDetails("password"), [password, token]);
      response.send({ code: 1, message: "Password change successful" });
      return;
    }

    // if no email, username or password - error
    if (!(email || username || password)) {
      response.send({ code: 0, message: "Missing data" });
      return;
    }
  } catch (error) {
    response.send({ code: 0, message: "Error updating details" });
  }
});

module.exports = router;

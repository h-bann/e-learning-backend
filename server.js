require("dotenv").config({ path: ".env.prod" });
// require("dotenv").config({ path: ".env.dev" });
const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 900000, // 15 mins
  limit: 100000, // number of requests
});
app.use(rateLimiter);

app.use(cors());
app.use(helmet());
app.use(express.static("public"));

app.use(express.json());

app.use("/users", require("./routes/addUser"));
app.use("/users", require("./routes/deleteUser"));
app.use("/users", require("./routes/getUser"));
app.use("/users", require("./routes/updateUser"));
app.use("/users", require("./routes/loginUser"));
app.use("/users", require("./routes/logoutUser"));
app.use("/courses", require("./routes/getCourses"));
app.use("/courses", require("./routes/enrolledCourses"));
app.use("/contact", require("./routes/contact"));

app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(500).send("Something broke!"); // Respond with a generic error message
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

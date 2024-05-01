const express = require("express");
const helmet = require("helmet");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(helmet());
app.use(express.static("public"));

app.use(express.json());

app.use("/courses", require("./routes/getCourses"));
app.use("/courses", require("./routes/enrolledCourses"));
app.use("/users", require("./routes/addUser"));
app.use("/users", require("./routes/deleteUser"));
app.use("/users", require("./routes/getUser"));
app.use("/users", require("./routes/updateUser"));
app.use("/users", require("./routes/loginUser"));
app.use("/users", require("./routes/logoutUser"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

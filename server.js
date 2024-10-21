require("dotenv").config();
// require("dotenv").config({ path: ".env.prod" });
// require("dotenv").config({ path: ".env.dev" });

const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const corsOptions = {
  origin: ["https://welearning.uk", "http://localhost:5173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

const rateLimiter = rateLimit({
  windowMs: 900000, // 15 mins
  limit: 100000, // number of requests
});
app.use(rateLimiter);

app.use(helmet());
app.use(express.static("public_html"));
app.use(express.json());

app.use("/users", require("./routes/addUser"));
app.use("/verification", require("./routes/emailVerification"));
app.use("/users", require("./routes/deleteUser"));
app.use("/users", require("./routes/getUser"));
app.use("/users", require("./routes/updateUser"));
app.use("/users", require("./routes/loginUser"));
app.use("/users", require("./routes/logoutUser"));
app.use("/courses", require("./routes/getCourses"));
app.use("/courses", require("./routes/enrolledCourses"));
app.use("/contact", require("./routes/contact"));
app.use("/payment", require("./routes/payment"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config();
// require("dotenv").config({ path: ".env.prod" });
// require("dotenv").config({ path: ".env.dev" });
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

const rateLimiter = rateLimit({
  windowMs: 900000, // 15 mins
  limit: 100000, // number of requests
});
app.use((req, res, next) => {
  console.log(req.headers);
  console.log("Origin:", req.headers.origin);
  next();
});

const corsOptions = {
  origin: ["http://localhost:5173", "https://welearning.uk"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));

app.use(rateLimiter);

app.use(helmet());
app.use(express.static("public_html"));

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

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public_html", "index.html"));
});

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.static("public"));

const users = [];
// start user IDs at 10000
let lastAccountId = { value: 10000 };

app.use(express.json());

app.use(function (request, response, next) {
  request.users = users;
  request.lastAccountId = lastAccountId;
  next();
});

app.use("/courses", require("./routes/courses"));
app.use("/users", require("./routes/add"));
app.use("/users", require("./routes/delete"));
app.use("/users", require("./routes/get"));
app.use("/users", require("./routes/udpate"));

const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

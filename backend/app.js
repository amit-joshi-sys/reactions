const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const cookieParser = require("cookie-parser");
const fs = require("fs");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

//bring in all the routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//middleware
app.use(express.json());
app.use(cors());
app.use(expressValidator());
app.use(cookieParser());

//post routes
app.use("/api", postRoutes);

//auth routes
app.use("/api", authRoutes);

//user routes
app.use("/api", userRoutes);

//home route
app.get("/api", (req, res) => {
  fs.readFile("docs/docs.json", (err, data) => {
    if (err)
      return res.status(400).json({
        error: err,
      });
    let information = JSON.parse(data);
    res.json(information);
  });
});

//such middlewares to be used after the routes so they will work
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "User not signed in" });
  }
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`server is running on port ${port}`));

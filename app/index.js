// karena menggunakan .env variable
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("../config/routes/index");
const path = require("path")
const cookieParser = require('cookie-parser');

// inisialisasi setelah import statement
const app = express();

// error handler
const errorHandler = require("../middlewares/errorHandler");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

// Settings view engine
app.set("views", __dirname + "/../views");
app.set("view engine", "ejs");
app.use(cookieParser());

// Public
app.use(express.static(path.join(__dirname, "/../public")));
// app.use('/css', express.static(__dirname + '/../public/css'));
// app.use('/img', express.static(__dirname + '/../public/img'));
app.use(express.static(path.join(__dirname, "controllers")));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("dev"));
// basic express configuration

// Middleware to Parse JSON
app.use(cors());
app.use(express.json());
app.use(router);

// middleware for page not found
app.use((req, res, next) => {
  next(
    new ApiError(
      httpStatus.NOT_FOUND,
      `Cannot Find EndPoint ${req.originalUrl} On This App ....`
    )
  );
});
// use middleware errorHandler
app.use(errorHandler);

module.exports = app;

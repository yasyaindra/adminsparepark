var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const methodOverride = require("method-override");
var cors = require("cors");

var dashboardRouter = require("./app/dashboard/router.js");
var gudangRouter = require("./app/gudang/router.js");
var itemRouter = require("./app/item/router.js");
var historyRouter = require("./app/history/router.js");
var rakRouter = require("./app/rak/router.js");
var vendorRouter = require("./app/vendor/router.js");

var app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(methodOverride("_method"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/adminlte",
  express.static(path.join(__dirname, "/node_modules/admin-lte/"))
);

app.use("/", dashboardRouter);
app.use("/gudang", gudangRouter);
app.use("/item", itemRouter);
app.use("/history", historyRouter);
app.use("/rak", rakRouter);
app.use("/vendor", vendorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

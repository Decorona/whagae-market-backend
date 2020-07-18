var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// Swagger JS Docs
const swaggerJSDoc = require("swagger-jsdoc");

// Router
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var marketsRouter = require("./routes/market");
var goodsRouter = require("./routes/goods");
var goodsBundleRouter = require("./routes/goods-bundle");
var cartRouter = require("./routes/cart");
var orderRouter = require("./routes/order");
var reviewsRouter = require("./routes/reviews");

const db = require("./models");
db.sequelize.sync({
  force: false,
});
var app = express();

// Swagger With Express
const options = require("./swagger-jsdoc-options");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = swaggerJSDoc(options);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Swagger UI Mount
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/market", marketsRouter);
app.use("/goods", goodsRouter);
app.use("/goods-bundle", goodsBundleRouter);
app.use("/cart", cartRouter);
app.use("/order", orderRouter);
app.use("/reviews", reviewsRouter);

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

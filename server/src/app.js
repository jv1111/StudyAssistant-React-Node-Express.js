const express = require("express");
const cors = require("cors");
const passport = require("passport");

const session = require("./config/session");
const configurePassport = require("./config/passport");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const quizRoutes = require("./routes/quiz.routes");
const userRoutes = require("./routes/user.routes");

const app = express();

app.set("trust proxy", 1);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.static("public"));

app.use(session);

configurePassport(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/quiz", quizRoutes);
app.use("/user", userRoutes);

app.use(errorHandler);

module.exports = app;

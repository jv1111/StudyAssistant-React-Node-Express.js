const express = require("express");
const cors = require("cors");
const passport = require("passport");

const session = require("./config/session");
const configurePassport = require("./config/passport");
const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const quizRoutes = require("./routes/quiz.routes");
const quizSessionRoutes = require("./routes/quizSession.routes");
const userRoutes = require("./routes/user.routes");
const emailVerificationRoutes = require("./routes/emailVerification.routes");
const passwordResetRoutes = require("./routes/passwordReset.routes");
const quizDraftRoutes = require("./routes/quizDraft.routes");

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
app.use("/quiz/draft", quizDraftRoutes);
app.use("/quiz-session", quizSessionRoutes);

app.use("/user", userRoutes);
app.use("/email-verification", emailVerificationRoutes);
app.use("/password-reset", passwordResetRoutes);

app.use(errorHandler);

module.exports = app;

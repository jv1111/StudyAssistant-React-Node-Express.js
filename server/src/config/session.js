const session = require("express-session");
const env = require("./env");

module.exports = session({
  secret: env.sessionSecret,
  resave: false,
  saveUninitialized: false,
});

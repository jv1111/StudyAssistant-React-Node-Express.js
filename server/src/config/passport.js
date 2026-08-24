const LocalStrategy = require("passport-local");

const authService = require("../services/auth.service");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "usernameOrEmail",
      },
      async (usernameOrEmail, password, done) => {
        try {
          const user = await authService.verifyCredentials(
            usernameOrEmail,
            password,
          );

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await authService.getUserById(id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

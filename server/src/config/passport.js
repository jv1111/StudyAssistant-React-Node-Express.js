const LocalStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");

const AuthService = require("../services/AuthService");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "usernameOrEmail",
      },
      async (usernameOrEmail, password, done) => {
        try {
          const user = await AuthService.verifyCredentials(
            usernameOrEmail,
            password,
          );

          if (user.error) {
            return done(new Error(user.error), false);
          }

          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      },
    ),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await AuthService.findOrCreate(profile._json);

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
      const user = await AuthService.getUserById(id);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  });
};

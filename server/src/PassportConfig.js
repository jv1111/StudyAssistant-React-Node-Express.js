const localStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20");
const authService = require("./services/auth.service");

module.exports = (passport) => {
  // ----------STRATEGIES----------
  passport.use(
    new localStrategy(
      {
        usernameField: "usernameOrEmail", //change username to usernameOrEmail, username and password are the default fields
      },
      async (usernameOrEmail, password, done) => {
        console.log("local strategy");
        const user = await authService.verifyCredentials(
          usernameOrEmail,
          password,
        );
        if (user.error) return done(new Error(user.error), false);
        done(null, user); // to indicate successful authentication and return the user data
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
          console.log("google strategy");
          const user = await authService.findOrCreate(profile._json);
          console.log("here at google strategy");
          console.log(user);
          done(null, user);
        } catch (error) {
          done(new Error(error), false);
        }
      },
    ),
  );
  // ----------END_OF_STRATEGIES----------

  passport.serializeUser(async (user, done) => {
    console.log("serializing");
    done(null, user.id); // Save the user ID to the session
  });
  passport.deserializeUser(async (id, done) => {
    console.log("deserializing");
    const user = await authService.getUserById(id); //Retrieve the user from the database using the ID stored in the session
    if (!user) done(null, { error: "error" });
    done(null, user); // Passes the user object to the 'done' function which will then store the user in the 'req.user' property.
  });
};

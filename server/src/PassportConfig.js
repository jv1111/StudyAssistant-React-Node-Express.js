const localStrategy = require('passport-local');
const AuthService = require('./services/AuthService');

module.exports = (passport) => {
    // ----------STRATEGIES----------
    passport.use(new localStrategy(
        {
            usernameField: "usernameOrEmail",//change username to usernameOrEmail, username and password are the default fields
        },
        async (usernameOrEmail, password, done) => {
            console.log('local strategy');
            const user = await AuthService.verifyCredentials(usernameOrEmail, password);
            if (user.error) return done(new Error(user.error), false);
            done(null, user);// to indicate successful authentication and return the user data
        })
    );
    // ----------END_OF_STRATEGIES----------

    passport.serializeUser(async (user, done) => {
        console.log('serializing');
        done(null, user.id);  // Save the user ID to the session
    });
    passport.deserializeUser(async (id, done) => {
        console.log('deserializing');
        const user = await AuthService.getUserById(id);//Retrieve the user from the database using the ID stored in the session
        if (!user) return done(new Error('User not found'));
        done(null, user);// Passes the user object to the 'done' function which will then store the user in the 'req.user' property.
    });
}
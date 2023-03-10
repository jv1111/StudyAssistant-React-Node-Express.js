const express = require("express");
require("dotenv").config();//load env
require("./DatabaseConnection");//connect database
const passport = require("passport");
require("./PassportConfig")(passport);//load passport config and strategies
const cors = require("cors");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true// Set credentials to true to enable passing cookies to the client. This is necessary for our server to save session cookies on the client's browser
}));
app.use(express.json());//To be able to read json data from the request (e.g req.body = {user:user})
app.use(require("./AppSession"));//use session
app.use(passport.initialize());
app.use(passport.session());//enables Passport.js to deserialize the user object from the session data. 

// ----------ROUTES----------
app.use("/auth", require("./routes/AuthRoute.js"));

//start the server
app.listen(process.env.PORT, () => {
    console.log(`Running on port ${process.env.PORT}`);
});
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: process.env.MONGO_URI,
    collection: 'sessions'// Name of the MongoDB collection to store sessions in
});

module.exports = session({
    secret: process.env.SECRET,
    resave: false,// Do not save session data if nothing has changed
    saveUninitialized: true,// Save uninitialized sessions (i.e. with no data)
    store: store, //set storage
    cookie: {
        domain: ".web-jv.online",
        secure: true,
        sameSite: "none",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //expires in oneday
    }
});
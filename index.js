const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = 80;
const expressLayouts = require("express-ejs-layouts");
const db = require('./config/mongoose');
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    name: 'MPP',
    // TODO change the secret before deployment mode
    secret: 'Blahsomething',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function (err) {
            console.log(err || "Mongodb connection mongostore ok done");
        }
    )

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'))

app.listen(port, function () {
    console.log("The server is running on port: ", port);
})


// GOOGLE-CLIENT-ID => 606161351135-t12faeuaq4s2as7a28rjlajftmrmtjp5.apps.googleusercontent.com
// GOOGLE-CLIENT-SECRET => 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
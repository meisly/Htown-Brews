require("dotenv").config();
let test = require("./config/config");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");

const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

//Session Storage

const RedisStore = require('connect-redis')(session);

if (process.env.REDIS_URL) {
  let redis = require('redis').createClient(process.env.REDIS_URL);
} else {
  redis = require("redis").createClient();
}
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: "keyboard cat",
    cookie: { secure: true, maxAge: 60000 },
    store:
      process.env.NODE_ENV === "production"
        ? new RedisStore({ client: redis, url: process.env.REDIS_URL })
        : new RedisStore({ client: redis }),
    saveUninitialized: true,
    resave: false
  })
);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

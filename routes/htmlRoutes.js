var db = require("../models");
const controller = require("./controller/controllerFunctions");
module.exports = function (app) {
  // Load index page
  // Access the session as req.session
  app.get("/", function (req, res, next) {
    if (req.session.userId) {
      res.render("index", {
        msg: "Welcome to H-town Brews!",
        user: req.session.userName
      });
    } else {
      res.render("index", {
        msg: "Welcome to H-town Brews!",
        user: "guest"
      });
    }
  });

  // Signup Page
  app.get("/signup", function(req, res) {
    res.render("signup");
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};

var db = require("../models");

module.exports = function(app) {
  // Load index page
  // Access the session as req.session
  app.get("/", function(req, res, next) {
    if (req.session.userId) {
      db.beers.findAll({}).then(function(dbExamples) {
        res.render("index", {
          msg: "Welcome to H-town Brews!",
          user: req.session.userName
        });
      });
    } else {
      db.beers.findAll({}).then(function(dbExamples) {
        res.render("index", {
          msg: "Welcome to H-town Brews!",
          user: "guest"
        });
      });
    }
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

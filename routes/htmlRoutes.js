var db = require("../models");
const controller = require("./controller/controllerFunctions");
module.exports = function (app) {
  // Load index page
  // Access the session as req.session
  let controlFunctions = new controller(db);

  app.get("/", function (req, res) {
    if (req.session.userId) {
      res.render("index", {
        msg: "Welcome to H-town Brews!",
        user: req.session.userName
      });
    } else {
      res.render("index", {
        msg: "Welcome to H-town Brews!",
        user: null
      });
    }
  });

  // Signup Page
  app.get("/signup", function (req, res) {
    if (req.session.userId) {
      res.render("signup", {
        user: req.session.userName
      });
    } else {
      res.render("signup", {
        user: null
      });
    }
  });
  //beer page repurposed example function to query an individual beer from db then load its info and reviews
  app.get("/beer/:id", (req, res) => {
    controlFunctions.beerById(req.params.id, result => {
      if (req.session.userId) {
        res.render("beerReviews", {
          beer: result,
          user: req.session.userName
        });
      } else {
        res.render("beerReviews", {
          beer: result,
          user: null
        });
      }
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    if (req.session.userId) {
      res.render("404", {
        user: req.session.userName
      });
    } else {
      res.render("404", {
        user: req.session.userName
      });
    }
  });
};

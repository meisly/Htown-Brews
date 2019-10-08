var db = require("../models");
const controller = require("./controller/controllerFunctions");
module.exports = function(app) {
  // Load index page
  // Access the session as req.session
  let controlFunctions = new controller(db);

  app.get("/", function(req, res) {
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
  //beer page repurposed example function to query an individual beer from db then load its info and reviews
  app.get("/beer/:id", (req, res) => {
    controlFunctions.beerById(req.params.id, result => {
      res.render("beerReviews", { beer: result[0] });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

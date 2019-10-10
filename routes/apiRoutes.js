const db = require("../models");

const controller = require("./controller/controllerFunctions");

module.exports = function(app) {
  // Get all examples
  let controlFunctions = new controller(db);

  //Gets data for autocomplete
  app.get("/api", function(req, res) {
    db.beers
      .findAll({
        attributes: ["beer_name", "beer_type", "brewrey"]
      })
      .then(result => {
        let data = {};
        result.forEach(elem => {
          data[`${elem.dataValues.beer_name}`] = null;
          data[`${elem.dataValues.beer_type}`] = null;
          data[`${elem.dataValues.brewrey}`] = null;
        });
        res.json(data);
      });
  });

  // post new revies
  app.post("/api/review", (req, res) => {
    /*takes user from sessions and and rating, paragraph, and beer id from front-end elements
    will need a review obj and the beer itself so it can re-render then page I'm thinking passing
    2 objects as an array 0 being the review info and 1 being the beer info doing this lets us
    return the user to an updated page of the beer they just reviewed*/
    let reviewObj = {
      rating: req.body.reviewrRating,
      paragraph: req.body.reviewParagraph,
      userId: req.body.id,
      beerId: req.body.beerid
    };
    controlFunctions.addReview(reviewObj, result => {
      if (result.affectedRows === 0) {
        res.render("beerReviews", { beer: req.body.reviewAndBeer[1] });
      } else {
        res.render("404");
      }
    });
  });
  //grab all reviews by the id of a specific beer
  app.get("/api/review/:id", (req, res) => {
    controlFunctions.beerReviews(req.params.id, result => {
      res.json(result);
    });
  });
  app.get("/api/user/:id", (req, res) => {
    console.log("api routes should return author info")
    controlFunctions.findReviewAuthor(req.params.id, result => {
      res.json(result);
    });
  });

  app.post("/login", (req, res) => {
    controlFunctions.login(req, userData => {
      if (userData) {
        req.session.userId = userData.userID;
        req.session.userName = userData.userName;
        res.render("index", {
          msg: "Welcome to H-town Brews!",
          user: req.session.userName
        });
      }
    });
  });

  app.post("/api/newUser", (req, res) => {
    controlFunctions.newUserQuery(req, res, result => {
      res.json(result);
    });
  });
};

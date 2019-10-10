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

  app.get("/api/beer/:id", (req, res) => {
    let beerId = req.params.id;
    controlFunctions.beerById(beerId, result => {
      res.json(result);
    });
  });
  app.delete("/api/beer/:id", (req, res) => {
    controlFunctions.deleteBeer(req.params.id, result => {
      res.send(200);
    });
  });
  app.post("/api/beer", (req, res) => {
    let beerObj = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      brewrey: req.body.brewrey
    };
    controlFunctions.addBeer(beerObj, result => {
      if (result) {
        window.location.reload();
      } else {
        res.json("404");
      }
    });
  });
  // post new revies
  app.post("/api/review", (req, res) => {
    /*takes user from sessions and and rating, paragraph, and beer id from front-end elements
    will need a review obj and the beer itself so it can re-render then page I'm thinking passing
    2 objects as an array 0 being the review info and 1 being the beer info doing this lets us
    return the user to an updated page of the beer they just reviewed*/
    let reviewObj = {
      rating: req.body.reviewRating,
      paragraph: req.body.reviewParagraph,
      userId: req.body.id,
      beerId: req.body.beerid
    };
    controlFunctions.addReview(reviewObj, result => {
      let user = {
        userName: req.session.userName,
        userId: req.session.userId
      };
      if (result.affectedRows !== 0) {
        controlFunctions.beerById(reviewObj.beerId, beerResult => {
          res.render("beerReviews", {
            user: user,
            beer: beerResult
          });
        })
      } else {
        res.render("404");
      }
    });
  });
  app.put("/api/beer/:id", (req, res) => {
    controlFunctions.calcRating(req.params.id, result => {
      if (result) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
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
    console.log("api routes should return author info");
    controlFunctions.findReviewAuthor(req.params.id, result => {
      res.json(result);
    });
  });

  app.post("/login", (req, res) => {
    controlFunctions.login(req, userData => {
      if (userData) {
        req.session.userId = userData.userID;
        req.session.userName = userData.userName;
        req.session.userRole = userData.userRole;
        console.log(req.session.userRole);
        req.session.save();
        let user = {
          userName: req.session.userName,
          userId: req.session.userId
        };
        if (req.session.userRole === "admin") {
          res.render("admin", {
            msg: "Welcome Admin!",
            user: user
          });
        } else {
          res.render("index", {
            msg: "Welcome to H-town Brews!",
            user: user
          });
        }
      }
    });
  });

  app.post("/api/newUser", (req, res) => {
    controlFunctions.newUserQuery(req, res, result => {
      res.json(result);
    });
  });
};

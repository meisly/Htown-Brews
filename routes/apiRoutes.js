const db = require("../models");
const controller = require("../controller/controllerFunctions");

const controller = require("./controller/controllerFunctions");

module.exports = function (app) {
  // Get all examples
  let controlFunctions = new controller(db);

<<<<<<< HEAD
  app.get("/api", function (req, res) {
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
  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
<<<<<<< HEAD
  app.post("api/newUser", (req,res)=>{
    let newUser = {
      username: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      role: 'guest'
    };
    controlFunctions.hashIt(newUser);
  });
=======
>>>>>>> f37cf56b9b6af55234e0d9b7b6644990676a4853
};
=======
  app.post("/login", (req, res) => {
    
    controlFunctions.login(req, res);
  },
  app.post("api/newUser", (req, res) => {
    
    controlFunctions.newUserQuery(req,res);
  },
};


>>>>>>> 1f24223bd7ac627444c5f240264f6883fa4dab7a

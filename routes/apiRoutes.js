const db = require("../models");

const controller = require("./controller/controllerFunctions");

module.exports = function (app) {
  // Get all examples
  let controlFunctions = new controller(db);

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
};

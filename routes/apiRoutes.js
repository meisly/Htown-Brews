const db = require("../models");
const controller = require("../controller/controllerFunctions");

module.exports = function(app) {
  // Get all examples
  let controlFunctions = new controller(db);

  app.post("/login", (req, res) => {
    
    controlFunctions.login(req, res);
  },
  app.post("api/newUser", (req, res) => {
    
    controlFunctions.newUserQuery(req,res);
  },
};



const menuRoutes = require("./content");

const constructorMethod = app => {
    app.use("/", menuRoutes);

    app.use("*", (req, res) => {
      res.sendStatus(404);
    });
  };
  
  module.exports = constructorMethod;

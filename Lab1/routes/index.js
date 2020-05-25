const taskRoutes = require("./tasks");

const constructorMethod = app => {
  app.use("/api/tasks", taskRoutes);

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;

const { Router } = require("express");

const routes = Router();

const DevController = require("./controller/DevController");
const SeacrController = require("./controller/SearchController");

routes.post("/devs", DevController.store);
routes.get("/devs", DevController.index);

routes.get("/search", SeacrController.index);

module.exports = routes;

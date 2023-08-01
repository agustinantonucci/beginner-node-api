const {Router} = require("express");
const getAllStates = require("../controllers/states.controller");

const statesRoutes = Router();

statesRoutes.get("/", getAllStates);

module.exports = statesRoutes;

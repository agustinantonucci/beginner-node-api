const {Router} = require("express");
const getAllCities = require("../controllers/cities.controller");

const citiesRoutes = Router();

citiesRoutes.get("/", getAllCities);

module.exports = citiesRoutes;
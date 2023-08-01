const {Router} = require("express");
const getClientById = require("../controllers/clients.controller");

const clientsRoutes = Router();

clientsRoutes.get("/:id", getClientById);

module.exports = clientsRoutes;

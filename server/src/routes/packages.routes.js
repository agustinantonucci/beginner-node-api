const {Router} = require("express");
const {getPackages, createNewPackage, deletePackageById} = require("../controllers/packages.controller");

const packagesRoutes = Router();

packagesRoutes.get("/", getPackages);

packagesRoutes.post("/", createNewPackage);

packagesRoutes.delete("/:id", deletePackageById );


module.exports = packagesRoutes;
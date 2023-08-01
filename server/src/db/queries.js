const packagesQueries = {
  getAllPackages: "SELECT * FROM vistaPaquete",
  insertPackage:
    "INSERT INTO paquete (idCiudadOrigen, idCiudadDestino, idCliente, fechaCarga, peso, tarifaBase, tarifaFinal, descripcion, idEstado) VALUES (@idCiudadOrigen, @idCiudadDestino, @idCliente, @fechaCarga, @peso, @tarifaBase, @tarifaFinal, @descripcion, @idEstado)",
  deletePackageById: "DELETE FROM paquete WHERE idPaquete = @id",
};

const clientQueries = {
  getClientById: "SELECT * FROM cliente WHERE idCliente = @id",
};

const citiesQueries = {
  getAllCities: "SELECT * FROM ciudad",
};

const stateQueries = {
  getAllStates: "SELECT * FROM estado",
};

module.exports = {
  packagesQueries,
  clientQueries,
  citiesQueries,
  stateQueries,
};

const { getConnection, sql } = require("../db/connection");
const {packagesQueries} = require("../db/queries");

const getPackages = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool.request().query(packagesQueries.getAllPackages);
    console.log(result);
    if (!result.recordset) {
      res.json([]);
    } else {
      res.json(result.recordset);
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const createNewPackage = async (req, res) => {
  const { idCiudadOrigen, descripcion, idCiudadDestino, tarifaBase, tarifaFinal, peso, idCliente, fechaCarga, idEstado } = req.body.data;

  console.log("req: ", req.body.data);

  try {
    const pool = await getConnection();

    const response = await pool
      .request()
      .input("idCiudadOrigen", sql.Int, idCiudadOrigen)
      .input("descripcion", sql.VarChar, descripcion)
      .input("idCiudadDestino", sql.Int, idCiudadDestino)
      .input("tarifaBase", sql.Int, tarifaBase)
      .input("tarifaFinal", sql.Int, tarifaFinal)
      .input("peso", sql.Int, peso)
      .input("idCliente", sql.Int, idCliente)
      .input("fechaCarga", sql.DateTime, fechaCarga)
      .input("idEstado", sql.Int, idEstado)
      .query(packagesQueries.insertPackage);

    console.log(response);

    res.json({ idCiudadOrigen, descripcion, idCiudadDestino, tarifaBase, tarifaFinal, peso, idCliente, fechaCarga, idEstado });
  } catch (error) {

    console.log(error);
    res.status(500);
    res.send(error.message);
  }
};

const deletePackageById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(id);

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(packagesQueries.deletePackageById);

    console.log(result);
    res.json({ message: "OK" });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = {
  getPackages,
  createNewPackage,
  deletePackageById,
};

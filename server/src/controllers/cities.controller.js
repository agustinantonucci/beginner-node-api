const { getConnection, sql } = require("../db/connection");
const { citiesQueries } = require("../db/queries");

const getAllCities = async (req, res) => {
  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query(citiesQueries.getAllCities);

    console.log(result);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = getAllCities;
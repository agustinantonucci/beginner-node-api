const { getConnection, sql } = require("../db/connection");
const { stateQueries } = require("../db/queries");

const getAllStates = async (req, res) => {
  try {

    const pool = await getConnection();

    const result = await pool
      .request()
      .query(stateQueries.getAllStates);

    console.log(result);
    res.send(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = getAllStates;

const { getConnection, sql } = require("../db/connection");
const { clientQueries } = require("../db/queries");

const getClientById = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(clientQueries.getClientById);

    console.log(result);
    if (!result.recordset) {
      res.sendStatus(204)
    } else {
      res.json(result.recordset[0]);
    }
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

module.exports = getClientById;

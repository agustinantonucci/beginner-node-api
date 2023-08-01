const sql = require("mssql");
const {dbConfig} = require("../config");

const dbSettings = {
    ...dbConfig,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

const getConnection = async () => {
    try{
        const pool = await sql.connect(dbSettings);
    
        return pool;
    } catch(error) {
        console.log(error);
    }
}


module.exports = {getConnection, sql};
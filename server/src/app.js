const express = require("express"),
  bodyParser = require("body-parser");
const config = require("./config");
const cors = require("cors");

const paquetesRoutes = require("./routes/packages.routes");
const citiesRoutes = require("./routes/cities.routes");
const clientsRoutes = require("./routes/clients.routes");
const statesRoutes = require("./routes/states.routes");

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:5500/",
  allowedHeaders: "Content-Type",
};

app.options("/*", (req, res) => {
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.sendStatus(200);
});

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/packages", paquetesRoutes);
app.use("/cities", citiesRoutes);
app.use("/clients", clientsRoutes);
app.use("/states", statesRoutes);


module.exports = app;

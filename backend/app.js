const express = require("express");
const bodyParser = require("body-parser");
const cruxRoutes = require("./routes/cruxRoutes");

const app = express();
app.use(bodyParser.json());

// Routes
app.use("/api", cruxRoutes);

module.exports = app;

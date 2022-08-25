const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

require("./db-connection"); //For cloud-db connection
require("http").globalAgent.maxSockets = 9990;
const fs = require("fs");
const app = express();
app.use(bodyParser.json()); //receive json
app.use(cors());
app.use(fileUpload());

// load all routes from routes directory
const routeBaseDirectory = "./Routes/";

let files = fs.readdirSync(routeBaseDirectory);
files.forEach((file) => {
  app.use("/api", require(routeBaseDirectory + file));
});

module.exports = app;

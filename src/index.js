const express = require("express");
require("dotenv").config();
const { Logger, morganMiddleware } = require("@lo-agency/logger");
const app = express();
const apiPrefix = "/api/v1";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morganMiddleware);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  next();
});

app.all("*", (req, res) => {
  Logger.http(`route: url '${req.url}' not found`);
  res.status(404).send("route not found");
});

app.listen(port, () => Logger.info(`listening on port ${port}`));

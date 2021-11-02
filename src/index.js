const express = require("express");
require("dotenv").config();
const { Logger, morganMiddleware } = require("@lo-agency/logger");
const corsHeaders = require("./middleware/cors");
const app = express();
const apiPrefix = "/api/v1";
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(morganMiddleware);
app.use(corsHeaders);

app.use(apiPrefix, require('./routes/auth'));
app.use(`${apiPrefix}/users`, require('./routes/user'));
app.use(`${apiPrefix}/roadmaps/:id/phases`, require('./routes/phase'));
app.use(`${apiPrefix}/roadmaps`, require('./routes/roadmap'));
app.use(`${apiPrefix}/categories`, require('./routes/category'));


app.all("*", (req, res) => {
  Logger.http(`route: url '${req.url}' not found`);
  res.status(404).send("route not found");
});

app.listen(port, () => Logger.info(`listening on port ${port}`));
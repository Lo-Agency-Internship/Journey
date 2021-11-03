"use strict";
require("dotenv").config();
const express = require("express");
const topicRouter = express.Router({ mergeParams: true });

const {
  getAllTopics,
  getTopic,
  insertTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topic");

const isAuth = require("../middleware/is-auth");

topicRouter.get("/", isAuth, getAllTopics);

topicRouter.get("/:tId", isAuth, getTopic);

topicRouter.post("/", isAuth, insertTopic);

topicRouter.put("/:tId", isAuth, updateTopic);

topicRouter.delete("/:tId", isAuth, deleteTopic);

module.exports = topicRouter;

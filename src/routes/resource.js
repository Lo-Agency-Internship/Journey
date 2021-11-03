"use strict";
require("dotenv").config();
const express = require("express");
const resourceRouter = express.Router({mergeParams: true});
const {
  getAllResources,
  getResource,
  insertResource,
  updateResource,
  deleteResource,
} = require("../controllers/resource");

const isAuth = require("../middleware/is-auth");

resourceRouter.get("/", isAuth, getAllResources);

resourceRouter.get("/:rId", isAuth, getResource);

resourceRouter.post("/", isAuth, insertResource);

resourceRouter.put("/:rId", isAuth, updateResource);

resourceRouter.delete("/:rId", isAuth, deleteResource);

module.exports = resourceRouter;

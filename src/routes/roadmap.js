"use strict";
require("dotenv").config();
const express = require("express");
const isAuth = require("../middleware/is-auth");
const roadmapRouter = express.Router();
const {
  getAllRoadmaps,
  getRoadmap,
  insertRoadmap,
  updateRoadmap,
  deleteRoadmap,
} = require("../controllers/roadmap");


roadmapRouter.get("/", isAuth, getAllRoadmaps);

roadmapRouter.get("/:id", isAuth, getRoadmap);

roadmapRouter.post("/", isAuth, insertRoadmap);

roadmapRouter.put("/:id", isAuth, updateRoadmap);

roadmapRouter.delete("/:id", isAuth, deleteRoadmap);

module.exports = roadmapRouter;

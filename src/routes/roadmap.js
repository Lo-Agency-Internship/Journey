"use strict";
require("dotenv").config();
const express = require("express");
const roadmapRouter = express.Router();
const {
  getAllRoadmaps,
  getRoadmap,
  insertRoadmap,
  updateRoadmap,
  deleteRoadmap,
} = require("../controllers/roadmap");


roadmapRouter.get("/", getAllRoadmaps);

roadmapRouter.get("/:id", getRoadmap);

roadmapRouter.post("/", insertRoadmap);

roadmapRouter.put("/:id", updateRoadmap);

roadmapRouter.delete("/:id", deleteRoadmap);

module.exports = roadmapRouter;

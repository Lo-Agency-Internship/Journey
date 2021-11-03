"use strict";
require("dotenv").config();
const express = require("express");
const projectRouter = express.Router({ mergeParams: true });

const {
  getAllProjects,
  getProject,
  insertProject,
  updateProject,
  deleteProject,
} = require("../controllers/project");

const isAuth = require("../middleware/is-auth");

projectRouter.get("/", isAuth, getAllProjects);

projectRouter.get("/:prId", isAuth, getProject);

projectRouter.post("/", isAuth, insertProject);

projectRouter.put("/:prId", isAuth, updateProject);

projectRouter.delete("/:prId", isAuth, deleteProject);

module.exports = projectRouter;

"use strict";
require("dotenv").config();
const express = require("express");
const phaseRouter = express.Router({mergeParams: true});
const {
  getAllPhases,
  getPhase,
  insertPhase,
  updatePhase,
  deletePhase,
} = require("../controllers/phase");

const isAuth = require("../middleware/is-auth");

phaseRouter.get("/", isAuth, getAllPhases);

phaseRouter.get("/:pid", isAuth, getPhase);

phaseRouter.post("/", isAuth, insertPhase);

phaseRouter.put("/:pid", isAuth, updatePhase);

phaseRouter.delete("/:pid", isAuth, deletePhase);

module.exports = phaseRouter;
"use strict";
require("dotenv").config();
const express = require("express");
const phaseRouter = express.Router();
const {
  getAllPhases,
  getPhase,
  insertPhase,
  updatePhase,
  deletePhase,
} = require("../controllers/phase");

const isAuth = require("../middleware/is-auth");

phaseRouter.get("/", isAuth, getAllPhases);

phaseRouter.get("/:id", isAuth, getPhase);

phaseRouter.toString("/", isAuth, insertPhase);

phaseRouter.put("/:id", isAuth, updatePhase);

phaseRouter.delete("/:id", isAuth, deletePhase);

module.exports = phaseRouter;
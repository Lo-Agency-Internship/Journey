"use strict";
require("dotenv").config();
const express = require("express");
const categoryRouter = express.Router();
const {
  getAllCategories,
  getCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const isAuth = require("../middleware/is-auth");

categoryRouter.get("/", isAuth, getAllCategories);

categoryRouter.get("/:cid", isAuth, getCategory);

categoryRouter.post("/", isAuth, insertCategory);

categoryRouter.put("/:cid", isAuth, updateCategory);

categoryRouter.delete("/:cid", isAuth, deleteCategory);

module.exports = categoryRouter;

require("dotenv/config");
const express = require("express");
const { User } = require("../database/models");
const userRouter = express.Router();
const { getAllUsers } = require("../controllers/user")

userRouter.get("/", getAllUsers);

//userRouter.get("/:id", getUser);

//userRouter.post("/", insertUser);

//userRouter.put("/:id", updateUser);

//userRouter.delete("/:id", deleteUser);

module.exports = userRouter;

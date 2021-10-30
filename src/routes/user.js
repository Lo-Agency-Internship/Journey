require("dotenv/config");
const express = require("express");
const userRouter = express.Router();
const { getAllUsers, getUser, updateUser, deleteUser } = require("../controllers/user");
const isAuth = require("../middleware/is-auth");

userRouter.get("/", isAuth ,getAllUsers);

userRouter.get("/:id", isAuth, getUser);

userRouter.put("/:id", isAuth, updateUser);

userRouter.delete("/:id", isAuth, deleteUser);

module.exports = userRouter;

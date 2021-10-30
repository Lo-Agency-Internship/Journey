const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const { User } = require("../database/models");
const helper = require("../utils/helper");
const { Logger } = require("@lo-agency/logger");

exports.register = async (req, res, nex) => {
  let { firstName, lastName, email, password } = req.body;
  const errors = helper.hasValue({ email, password });
  if (errors.length !== 0) return res.status(400).json({ error: errors });
  try {
    password = await bcrypt.hash(password, 12);
    let user = await User.findOne({
      where: { email },
    });
    if (user) return res.status(400).json({ error: "user already exists!" });

    user = await User.create({ firstName, lastName, email, password });
    res.status(201).json(user);
  } catch (error) {
    Logger.error(error.message);
    if (error.name === "SequelizeValidationError")
      return res.status(400).json({
        errors: error.errors.map((error) => {
          return error.message;
        }),
      });
    res.status(500).send({ error: "oops something went wrong!" });
  }
};

exports.login = async (req, res, nex) => {
  let { email, password } = req.body;
  let isPasswordValid;
  const errors = helper.hasValue({ email, password });
  if (errors.length !== 0) return res.status(400).json({ error: errors });
  try {
    const user = await User.findOne({
      where: { email },
    });

    if (user) isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid || !user.approved)
      return res.status(401).json({
        error: "Invalid credentials!",
      });

    const accessToken = jwt.sign(
      { user: user.uuid },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ token: accessToken });
  } catch (error) {
    Logger.error(error.message);
    if (error.name === "SequelizeValidationError")
      return res.status(400).json({
        errors: error.errors.map((error) => {
          return error.message;
        }),
      });
    res.status(500).send({ error: "oops something went wrong!" });
  }
};

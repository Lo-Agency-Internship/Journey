"use strict";
const { User } = require("../database/models");
const { Logger } = require("@lo-agency/logger");

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (err) {
            Logger.error(err.message);
            return res.status(500).json(err.message);
        }
    },

    getUser: async (req, res) => {
        const uuid = req.params.id;
        try {
          const user = await User.findOne({
            where: { uuid },
          });
          return res.status(200).json(user);
        } catch (err) {
          Logger.error(err.message);
          return res.status(500).json(err.message);
        }
    },
    // ToDo: hash password if that exists in body
    updateUser: async(req, res) => {
      const uuid = req.params.id;
    try {
      const user = await User.findOne({ where: { uuid } });
      if (user === null) {
        Logger.warn(`user not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `user not found by id: ${uuid}` });
      }

      await User.update(req.body, {
        where: {
          uuid: user.uuid,
        },
      });

      const updatedUser = await User.findOne({ where: { uuid } });
      return res
        .status(200)
        .json({ msg: "user is changed", updatedUser });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
    },

    deleteUser: async (req, res) => {
        const uuid = req.params.id;
        try {
          const user = await User.findOne({
            where: { uuid },
          });
      
          await user.destroy();
          return res.status(200).json({ message: "User deleted!" });
        } catch (err) {
          Logger.error(err.message);
          return res.status(500).json(err.message);
        }
    }
}

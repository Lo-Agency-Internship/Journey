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

    updateUser: async (req, res) => {
        const uuid = req.params.id;
        const { firstName, lastName, email, password } = req.body;
        try {
          const user = await User.findOne({
            where: { uuid },
          });
      
          user.firstName = firstName;
          user.lastName = lastName;
          user.email = email;
          user.password = password;
      
          await user.save();
      
          return res.status(200).json(user);
        } catch (err) {
          Logger.error(err.message);
          return res.status(500).json(err.message);
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

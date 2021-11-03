"use strict";
require("dotenv").config();
const { Logger } = require("@lo-agency/logger");
const { Resource } = require("../database/models");

module.exports = {
  getAllResources: async (req, res) => {
    try {
      const resources = await Resource.findAll();
      return res.status(200).json(resources);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  getResource: async (req, res) => {
    const uuid = req.params.rId;
    try {
      const resource = await Resource.findOne({ where: { uuid } });

      if (resource === null) {
        Logger.warn(`Resource not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Resource not found by id: ${uuid}` });
      }
      return res.status(200).json(resource);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  insertResource: async (req, res) => {
    const { link } = req.body;
    try {
      const newResource = await Resource.create({ link });
      return res.status(201).json(newResource);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  updateResource: async (req, res) => {
    const uuid = req.params.rId;
    try {
      const resource = await Resource.findOne({ where: { uuid } });
      if (resource === null) {
        Logger.warn(`Resource not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Resource not found by id: ${uuid}` });
      }

      await resource.update(req.body, {
        where: {
          uuid: resource.uuid,
        },
      });

      return res.status(200).json({ msg: "Resource is changed", resource });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  deleteResource: async (req, res) => {
    const uuid = req.params.rId;
    try {
      const resource = await Resource.findOne({ where: { uuid } });
      if (resource === null) {
        Logger.warn(`Resource not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Resource not found by id: ${uuid}` });
      }

      await resource.destroy();

      return res.status(200).json({ msg: "Resource is deleted" });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },
};

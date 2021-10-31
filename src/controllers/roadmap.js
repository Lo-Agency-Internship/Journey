"use strict";
require("dotenv").config();
const { Logger } = require("@lo-agency/logger");
const { Roadmap } = require("../database/models");

module.exports = {
  getAllRoadmaps: async (req, res) => {
    try {
      const roadmaps = await Roadmap.findAll();
      return res.status(200).json(roadmaps);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  getRoadmap: async (req, res) => {
    const uuid = req.params.id;

    try {
      const roadmap = Roadmap.findOne({
        where: { uuid },
      });
      if (roadmap === null) {
        Logger.warn(`roadmap not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `roadmap not found by id: ${uuid}` });
      }
      return res.status(200).json(roadmap);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  insertRoadmap: async (req, res) => {
    const { name } = req.body;
    try {
      const roadmap = await Roadmap.findOne({ where: { name } });
      if (roadmap)
        return res
          .status(400)
          .json({ error: `roadmap with name '${name}' already exists!` });

      const newRoadmap = await Roadmap.create({ name });
      return res.status(201).json(newRoadmap);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  updateRoadmap: async (req, res) => {
    const uuid = req.params.id;
    try {
      const roadmap = await Roadmap.findOne({ where: { uuid } });
      if (roadmap === null) {
        Logger.warn(`roadmap not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `roadmap not found by id: ${uuid}` });
      }

      await Roadmap.update(req.body, {
        where: {
          uuid: roadmap.uuid,
        },
      });

      const updatedRoadmap = await Roadmap.findOne({ where: { uuid } });
      return res
        .status(200)
        .json({ msg: "roadmap is changed", updatedRoadmap });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  deleteRoadmap: async (req, res) => {
    const uuid = req.params.id;
    try {
      const roadmap = await Roadmap.findOne({ where: { uuid } });
      if (roadmap === null) {
        Logger.warn(`roadmap not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `roadmap not found by id: ${uuid}` });
      }

      await roadmap.destroy();

      return res.status(200).json({ msg: "roadmap is deleted" });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },
};

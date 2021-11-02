"use strict";
require("dotenv").config();
const { Logger } = require("@lo-agency/logger");
const { Phase } = require("../database/models");

module.exports = {
  getAllPhases: async (req, res) => {
    try {
      const phases = await Phase.findAll();
      return res.status(200).json(phases);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  getPhase: async (req, res) => {
    const uuid = req.params.pid;
    try {
      const phase = await Phase.findOne({ where: { uuid } });
      
      if (phase === null) {
        Logger.warn(`phase not found by id: ${uuid}`);
        return res.status(404).json({ msg: `phase not found by id: ${uuid}` });
      }
      return res.status(200).json(phase);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  insertPhase: async (req, res) => {
    const { name, start_date, end_date, evaluation_date, learning_days } =
      req.body;
    try {
      const newPhase = await Phase.create({
        name,
        roadmap_id: req.params.id,
        start_date,
        end_date,
        evaluation_date,
        learning_days: learning_days,
      });
      return res.status(201).json(newPhase);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  updatePhase: async (req, res) => {
    const uuid = req.params.pid;
    try {
      const phase = await Phase.findOne({ where: { uuid } });
      if (phase === null) {
        Logger.warn(`phase not found by id: ${uuid}`);
        return res.status(404).json({ msg: `phase not found by id: ${uuid}` });
      }

      await phase.update(req.body, {
        where: {
          uuid: phase.uuid,
        },
      });

      return res.status(200).json({ msg: "phase is changed", phase });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  deletePhase: async (req, res) => {
    const uuid = req.params.pid;
    try {
      const phase = await Phase.findOne({ where: { uuid } });
      if (phase === null) {
        Logger.warn(`phase not found by id: ${uuid}`);
        return res.status(404).json({ msg: `phase not found by id: ${uuid}` });
      }

      await phase.destroy();

      return res.status(200).json({ msg: "phase is deleted" });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },
};
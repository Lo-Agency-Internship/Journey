"use strict";
require("dotenv").config();
const { Logger } = require("@lo-agency/logger");
const { Topic } = require("../database/models");

module.exports = {
  getAllTopics: async (req, res) => {
    try {
      const topics = await Topic.findAll();
      return res.status(200).json(topics);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  getTopic: async (req, res) => {
    const uuid = req.params.tId;
    try {
      const topic = await Topic.findOne({ where: { uuid } });

      if (topic === null) {
        Logger.warn(`Topic not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Topic not found by id: ${uuid}` });
      }
      return res.status(200).json(topic);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  insertTopic: async (req, res) => {
    const { title, type, category_id } = req.body;
    try {
      const newTopic = await Topic.create({
        title,
        phase_id: req.params.pid,
        category_id,
        type,
      });
      return res.status(201).json(newTopic);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  updateTopic: async (req, res) => {
    const uuid = req.params.tId;
    try {
      const topic = await Topic.findOne({ where: { uuid } });
      if (topic === null) {
        Logger.warn(`Topic not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Topic not found by id: ${uuid}` });
      }

      await topic.update(req.body, {
        where: {
          uuid: Topic.uuid,
        },
      });

      return res.status(200).json({ msg: "Topic is changed", topic });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  deleteTopic: async (req, res) => {
    const uuid = req.params.tId;
    try {
      const topic = await Topic.findOne({ where: { uuid } });
      if (topic === null) {
        Logger.warn(`Topic not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Topic not found by id: ${uuid}` });
      }

      await topic.destroy();

      return res.status(200).json({ msg: "Topic is deleted" });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },
};

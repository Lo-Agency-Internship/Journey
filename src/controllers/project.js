"use strict";
require("dotenv").config();
const { Logger } = require("@lo-agency/logger");
const { Project } = require("../database/models");

module.exports = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.findAll();
      return res.status(200).json(projects);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  getProject: async (req, res) => {
    const uuid = req.params.pid; // edit this
    try {
      const project = await Project.findOne({ where: { uuid } });

      if (project === null) {
        Logger.warn(`Project not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Project not found by id: ${uuid}` });
      }
      return res.status(200).json(project);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  insertProject: async (req, res) => {
    const { name, start_date, end_date, type } = req.body;
    console.log(req.params);
    try {
      const newProject = await Project.create({
        phase_id: req.params.pid,
        name,
        start_date,
        end_date,
        type,
      });
      return res.status(201).json(newProject);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },
};

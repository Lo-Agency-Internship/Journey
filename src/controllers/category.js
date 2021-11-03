"use strict";
require("dotenv").config();
const { Logger } = require("@lo-agency/logger");
const { Category } = require("../database/models");

module.exports = {
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.status(200).json(categories);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  getCategory: async (req, res) => {
    const uuid = req.params.cid;
    try {
      const category = await Category.findOne({ where: { uuid } });

      if (category === null) {
        Logger.warn(`Category not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Category not found by id: ${uuid}` });
      }
      return res.status(200).json(category);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  insertCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const newCategory = await Category.create({ name });
      return res.status(201).json(newCategory);
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  updateCategory: async (req, res) => {
    const uuid = req.params.cid;
    try {
      const category = await Category.findOne({ where: { uuid } });
      if (category === null) {
        Logger.warn(`Category not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Category not found by id: ${uuid}` });
      }

      await category.update(req.body, {
        where: {
          uuid: category.uuid,
        },
      });

      return res.status(200).json({ msg: "Category is changed", category });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },

  deleteCategory: async (req, res) => {
    const uuid = req.params.cid;
    try {
      const category = await Category.findOne({ where: { uuid } });
      if (category === null) {
        Logger.warn(`Category not found by id: ${uuid}`);
        return res
          .status(404)
          .json({ msg: `Category not found by id: ${uuid}` });
      }

      await category.destroy();

      return res.status(200).json({ msg: "Category is deleted" });
    } catch (error) {
      Logger.error(error.message);
      return res.status(500).json(error.message);
    }
  },
};

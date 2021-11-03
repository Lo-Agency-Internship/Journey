"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Phase, Topic }) {
      this.belongsTo(Phase, {
        foreignKey: {
          name: "phase_id",
          allowNull: false,
        },
        as: "phase",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.belongsToMany(Topic, {
        through: "ProjectTopic",
        foreignKey: "project_id",
        otherKey: "topic_id",
        as: "topics",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined, phase_id: undefined };
    }
  }
  Project.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      phase_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "name must not be null" },
          notEmpty: { msg: "name must not be emoty" },
          len: {
            args: [3, 30],
            msg: "name length must be between 3 and 30",
          },
        },
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "start date must not be null" },
          notEmpty: { msg: "start date must not be empty" },
          isDate: { msg: "start date must be only a date string" },
        },
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "end date must not be null" },
          notEmpty: { msg: "end date must not be empty" },
          isDate: { msg: "end date must be only a date string" },
        },
      },
      type: {
        type: DataTypes.ENUM("team", "personal", "real"),
        defaultValue: "team",
        allowNull: false,
        validate: {
          notNull: { msg: "type must not be null" },
          notEmpty: { msg: "type must not be empty" },
          isIn: {
            args: [["team", "personal", "real"]],
            msg: "type must be team, personal or real",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

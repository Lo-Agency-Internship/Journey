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
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("team", "personal", "real"),
        defaultValue: "team",
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};

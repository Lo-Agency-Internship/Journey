"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Roadmap, Topic, Project }) {
      this.belongsTo(Roadmap, {
        foreignKey: {
          name: "roadmap_id",
          allowNull: false,
        },
        as: "roadmap",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Topic, {
        foreignKey: {
          name: "phase_id",
          allowNull: false,
        },
        as: "topics",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(Project, {
        foreignKey: {
          name: "phase_id",
          allowNull: false,
        },
        as: "projects",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Phase.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roadmap_id: {
        type: DataTypes.INTEGER,
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
      evaluation_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      learning_days: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Phase",
    }
  );
  return Phase;
};

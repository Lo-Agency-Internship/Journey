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
    toJSON() {
      return { ...this.get(), id: undefined };
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
        validate: {
          notNull: { msg: "name must not be null"},
          notEmpty: { msg: "name must not be emoty"},
          len: {
            args: [1, 20],
            msg: "name length must be between 1 and 20"
          }
        }
      },
      roadmap_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "start date must not be null" },
          notEmpty: { msg: "start date must not be empty" },
          isDate: { msg: "start date must be only a date string"}
        }
      },
      end_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "end date must not be null" },
          notEmpty: { msg: "end date must not be empty" },
          isDate: { msg: "end date must be only a date string"}
        }
      },
      evaluation_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "evaluation date must not be null" },
          notEmpty: { msg: "evaluation date must not be empty" },
          isDate: { msg: "evaluation date must be only a date string"}
        }
      },
      learning_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "learning days must not be null" },
          notEmpty: { msg: "learning days must not be empty" },
          isInt: { msg: "learning days must be an integer"}
        }
      },
    },
    {
      sequelize,
      modelName: "Phase",
    }
  );
  return Phase;
};
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Roadmap }) {
      this.belongsTo(Roadmap, {
        foreignKey: "roadmap_id",
        as: "roadmap",
      });
    }
  }
  Phase.init(
    {
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
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Phase",
    }
  );
  return Phase;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roadmap extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Phase }) {
      this.hasMany(Phase, { foreignKey: "roadmap_id", as: "phases" });
    }
  }
  Roadmap.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Roadmap",
    }
  );
  return Roadmap;
};

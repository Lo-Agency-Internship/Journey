'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Roadmap);
    }
  };
  Phase.init({
    name: DataTypes.STRING,
    roadmap_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    evaluation_date: DataTypes.DATE,
    learning_days: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Phase',
  });
  return Phase;
};
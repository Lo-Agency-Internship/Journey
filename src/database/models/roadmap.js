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
      this.hasMany(Phase, {
        foreignKey: {
          name: "roadmap_id",
          allowNull:false

        },
        as: "phases",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  Roadmap.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: { msg: "name must only contains alphabetical characters" },
          notNull: { msg: "name must not be null" },
          notEmpty: { msg: "name must not be empty"},
          len: {
            args: [3, 30],
            msg: "name length must be between 3 and 30"
          }
        }
      },
    },
    {
      sequelize,
      modelName: "Roadmap",
    }
  );
  return Roadmap;
};

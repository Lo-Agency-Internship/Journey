"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Resource extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Topic }) {
      this.belongsTo(Topic, {
        foreignKey: {
          name: "topic_id",
          allowNull: false,
        },
        as: "topic",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
    toJSON() {
      return { ...this.get(), id: undefined, topic_id: undefined };
    }
  }
  Resource.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "link must not be null" },
          notEmpty: { msg: "link must not be empty" },
          isUrl: { msg: "link must be a valid url" }
        },
      },
      topic_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Resource",
    }
  );
  return Resource;
};

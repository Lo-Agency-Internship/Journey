"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Category, Phase, Project, Resource }) {
      this.belongsTo(Category, {
        foreignKey: {
          name: "category_id",
          allowNull: false,
        },
        as: "category",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(Phase, {
        foreignKey: "phase_id",
        as: "phase",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsToMany(Project, {
        through: "ProjectTopic",
        foreignKey: "topic_id",
        otherKey: "project_id",
        as: "projects",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      this.hasMany(Resource, {
        foreignKey: "topic_id",
        as: "resources",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        phase_id: undefined,
        category_id: undefined,
      };
    }
  }
  Topic.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phase_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("optional", "mandatory", "phase specific"),
        allowNull: false,
        defaultValue: "phase specific",
      },
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};

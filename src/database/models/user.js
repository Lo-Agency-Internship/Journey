"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "firstName must only contains alphabetical characters",
          },
          notNull: { msg: "firstName must not be null" },
          notEmpty: { msg: "firstName must not be empty" },
          len: {
            args: [3, 30],
            msg: "firstName length must be between 3 and 30",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            msg: "lastName must only contains alphabetical characters",
          },
          notNull: { msg: "lastName must not be null" },
          notEmpty: { msg: "lastName must not be empty" },
          len: {
            args: [3, 50],
            msg: "lastName length must be between 3 and 50",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "email must not be null" },
          notEmpty: { msg: "email must not be empty" },
          isEmail: { msg: "email must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "password must not be null" },
          notEmpty: { msg: "password must not be empty" },
          len: {
            args: [6, 30],
            msg: "password length must be between 6 and 30",
          },
        },
      },
      approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

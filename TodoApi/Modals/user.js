const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const User = sequelize.define(
  "User",
  {
    
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isAlpha: true,
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isMobileNumber(value) {
          // Validate mobile number format
          if (!/^\d{10}$/.test(value)) {
            throw new Error("Mobile number must be 10 digits long");
          }
        },
      },
      
      // allowNull defaults to true
    },
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: false,

      // the type  should be enum
      // allowNull defaults to true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,

      // allowNull defaults to true
    },
    hobbies: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,

      // get() {
      //   const hobbiesString = this.getDataValue('hobbies');
      //   return hobbiesString ? hobbiesString.split(',') : [];
      // },
      // set(value) {
      //   this.setDataValue('hobbies', value.join(','));
      // }

      // allowNull defaults to true
      // arrays of string.
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isEmail: true,
      },
      // allowNull defaults to true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,

      // allowNull defaults to true
    },

    // allowNull defaults to true
  },
  {
    // Other model options go here
    tableName: "usertable",
  }
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports = User;

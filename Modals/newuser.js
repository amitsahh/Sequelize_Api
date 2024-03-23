const { DataTypes } = require("sequelize");
const sequelize = require("./database");

const newUser = sequelize.define(
  "newUser",
  {
    // Model attributes are defined here
    Name: {
      type: DataTypes.STRING,
      allowNull: false,

      validate: {
        isAlpha: true,
      },
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Time: {
        type: DataTypes.STRING,
        allowNull: false,
  
        
        
      },
      Status: {
        type: DataTypes.STRING,
        
        allowNull: false,
        
      },


    // allowNull defaults to true
  },
  {
    // Other model options go here
    tableName: "newtable",
  }
);

// `sequelize.define` also returns the model
console.log(newUser === sequelize.models.newUser); // true

module.exports = newUser;
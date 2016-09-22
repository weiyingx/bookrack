'use strict';
module.exports = function(sequelize, DataTypes) {
  var favourite = sequelize.define('favourite', {
    bookid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favourite;
};
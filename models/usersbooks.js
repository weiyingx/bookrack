'use strict';
module.exports = function(sequelize, DataTypes) {
  var usersBooks = sequelize.define('usersBooks', {
    userId: DataTypes.INTEGER,
    booksId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usersBooks;
};
'use strict';
module.exports = function(sequelize, DataTypes) {
  var books = sequelize.define('books', {
    title: DataTypes.TEXT,
    author: DataTypes.STRING,
    description: DataTypes.TEXT,
    genre: DataTypes.STRING,
    link: DataTypes.TEXT,
    image: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return books;
};

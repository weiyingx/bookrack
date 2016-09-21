'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
        'books',
        'image',
        {
          type: Sequelize.TEXT,
          allowNull: true
        }
      ),
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('books', 'image'),
    ];
  }
};

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Tags', {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Tags');
  }
};

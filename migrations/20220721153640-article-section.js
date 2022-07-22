'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('ArticleSections', {
      articleId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        references: {
          model: {
            tableName: 'Article',
            key: 'id'
          },
        },
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      },
      text: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ArticleSections');
  }
};

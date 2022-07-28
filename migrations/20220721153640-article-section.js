'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('ArticleSections', {
      id: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
      },
      articleId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Articles',
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

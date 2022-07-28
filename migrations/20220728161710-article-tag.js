'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('ArticlesTags', {
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
      tagId: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Tags',
            key: 'id'
          },
        },
      },
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('ArticlesTags');
  }
};

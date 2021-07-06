'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ClientesCnpjs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cnpj:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('ClientesCnpjs')
  }
}

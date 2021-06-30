'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cnpj:{
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      endereco:{
        type: Sequelize.STRING,
        allowNull: true
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Clientes')
  }
}

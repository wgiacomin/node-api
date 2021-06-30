'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Associados', {
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
      senha:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      endereco:{
        type: Sequelize.STRING,
        allowNull: true
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Associados')
  }
}

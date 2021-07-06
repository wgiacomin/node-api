'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('LoginMotoboys', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cpf:{
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull:false,
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('LoginMotoboy')
  }
}
'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Motoboys', {
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
      cpf:{
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull:false,
      },
      telefone:{
        type: Sequelize.STRING,
        allowNull: false
      },
      associado:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Associados', key:'id'},
        onDelete: 'CASCADE'
      }
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Motoboys')
  }
}

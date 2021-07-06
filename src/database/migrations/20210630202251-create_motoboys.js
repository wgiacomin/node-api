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
        references: {model: 'LoginMotoboys', key:'cpf'},
        allowNull: false,
        onDelete: 'CASCADE'
      },
      login:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'LoginMotoboys', key:'id'},
        onDelete: 'CASCADE'
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

'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entregas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cliente: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Clientes', key:'id'},
        onDelete: 'CASCADE',
      },
      motoboy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Motoboys', key:'id'},
        onDelete: 'CASCADE',
      },
      associado: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'Associados', key:'id'},
        onDelete: 'CASCADE',
      },
      valor:{
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Entregas')
  }
}

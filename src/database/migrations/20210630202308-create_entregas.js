'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Entregas', {
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      cliente: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {model: 'Clientes', key:'id'},
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      motoboy: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {model: 'Motoboys', key:'id'},
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT',
      },
      valor:{
        type: Sequelize.DECIMAL(8, 2),
        allowNull: false,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Entregas')
  }
}

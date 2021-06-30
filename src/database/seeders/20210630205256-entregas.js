'use strict'

module.exports = {
  up: async (queryInterface) => {

    const clientes = await queryInterface.sequelize.query(
      'SELECT id FROM Clientes'
    )

    const motoboys = await queryInterface.sequelize.query(
      'SELECT id FROM Motoboys'
    )

    const clientesRows = clientes[0]
    const motoboysRows = motoboys[0]

    return queryInterface.bulkInsert(
      'Entregas', [
        {
          cliente: clientesRows[0].id,
          motoboy: motoboysRows[0].id,
          valor: 20.50,
          descricao: 'Finalizado'
        },
        {
          cliente: clientesRows[1].id,
          motoboy: motoboysRows[1].id,
          valor: 59.00,
          descricao: 'Finalizado'
        },
        {
          cliente: clientesRows[2].id,
          motoboy: motoboysRows[2].id,
          valor: 31.27,
          descricao: 'Finalizado'
        }
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Entregas', null, {})
  }
}

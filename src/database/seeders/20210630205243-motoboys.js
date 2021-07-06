'use strict'

module.exports = {
  up: async (queryInterface) => {

    const associados = await queryInterface.sequelize.query(
      'SELECT id FROM Associados'
    )
    const associadosRows = associados[0]

    const motoboys = await queryInterface.sequelize.query(
      'SELECT id, cpf FROM LoginMotoboys'
    )
    const motoboysRows = motoboys[0]

    return queryInterface.bulkInsert(
      'Motoboys', [
        {
          nome: 'Deneen Skinner',
          cpf: motoboysRows[0].cpf,
          login: motoboysRows[0].id,
          telefone: '52 78739-1714',
          associado: associadosRows[0].id
        },
        {
          nome: 'Evalyn Conway',
          cpf: motoboysRows[1].cpf,
          login: motoboysRows[1].id,
          telefone: '52 51387-7308',
          associado: associadosRows[1].id
        },
        {
          nome: 'Darnell Robinson',
          cpf: motoboysRows[2].cpf,
          login: motoboysRows[2].id,
          telefone: '52 52581-8871',
          associado: associadosRows[2].id
        },
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Motoboys', null, {})
  }
}

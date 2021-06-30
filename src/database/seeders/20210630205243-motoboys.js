'use strict'
const string2hash = require('../../utils/string2hash')

module.exports = {
  up: async (queryInterface) => {

    const associados = await queryInterface.sequelize.query(
      'SELECT id FROM Associados'
    )
    const associadosRows = associados[0]

    return queryInterface.bulkInsert(
      'Motoboys', [
        {
          nome: 'Deneen Skinner',
          cpf: '687.160.111-20',
          senha: string2hash('senha123+'),
          telefone: '52 78739-1714',
          associado: associadosRows[0].id
        },
        {
          nome: 'Evalyn Conway',
          cpf: '360.751.669-39',
          senha: string2hash('senha123+'),
          telefone: '52 51387-7308',
          associado: associadosRows[1].id
        },
        {
          nome: 'Darnell Robinson',
          cpf: '230.939.223-56',
          senha: string2hash('senha123+'),
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

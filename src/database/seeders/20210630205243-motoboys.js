'use strict'
const string2hash = require('../../utils/string2hash')

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      'Motoboys', [
        {
          nome: 'Deneen Skinner',
          cpf: '687.160.111-20',
          senha: string2hash('senha123+'),
          telefone: '52 78739-1714',
        },
        {
          nome: 'Evalyn Conway',
          cpf: '360.751.669-39',
          senha: string2hash('senha123+'),
          telefone: '52 51387-7308',
        },
        {
          nome: 'Darnell Robinson',
          cpf: '230.939.223-56',
          senha: string2hash('senha123+'),
          telefone: '52 52581-8871',
        },
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Motoboys', null, {})
  }
}

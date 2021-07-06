'use strict'
const { string2hash } = require('../../utils/string2hash')

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      'LoginMotoboys', [
        {
          cpf: '687.160.111-20',
          senha: string2hash('senha123+'),
        },
        {
          cpf: '360.751.669-39',
          senha: string2hash('senha123+'),
        },
        {
          cpf: '230.939.223-56',
          senha: string2hash('senha123+'),
        },
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('LoginMotoboys', null, {})
  }
}

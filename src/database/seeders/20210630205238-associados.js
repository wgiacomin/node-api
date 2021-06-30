'use strict'
const string2hash = require('../../utils/string2hash')

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      'Associados', [
        {
          nome: 'Delivery Já',
          cnpj: '83.025.317/0001-00',
          senha: string2hash('senha123+'),
          endereco: '620 Cormier Alley Suite 421 - Lorain, VA / 97512'
        },
        {
          nome: 'Entrega Expressa',
          cnpj: '52.275.563/0001-96',
          senha: string2hash('senha123+'),
          endereco: '3038 Zora Ford Suite 191 - Great Falls, TX / 66393'
        },
        {
          nome: 'Moto-taxi Rápido',
          cnpj: '83.108.273/0001-81',
          senha: string2hash('senha123+'),
          endereco: '836 Matt Shore Suite 741 - Little Rock, IN / 58270'
        },
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Associados', null, {})
  }
}

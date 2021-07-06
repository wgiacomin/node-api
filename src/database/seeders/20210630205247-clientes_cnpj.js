'use strict'

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      'ClientesCnpjs', [
        {
          cnpj: '34.600.167/0001-05',
        },
        {
          cnpj: '10.834.715/0001-01',
        },
        {
          cnpj: '67.063.214/0001-88',
        },
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('ClientesCnpjs', null, {})
  }
}

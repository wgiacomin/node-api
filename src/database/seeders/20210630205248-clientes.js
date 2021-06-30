'use strict'

module.exports = {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert(
      'Clientes', [
        {
          nome: 'Don Don Yakisoba',
          cnpj: '34.600.167/0001-05',
          endereco: '300 Muller Plain Apt. 248 - North Miami, NJ / 22289'
        },
        {
          nome: 'Cho Street Food',
          cnpj: '10.834.715/0001-01',
          endereco: '48246 Brakus Forks Apt. 577 - Charleston, VA / 34232'
        },
        {
          nome: 'Matteo Burgers',
          cnpj: '67.063.214/0001-88',
          endereco: '47641 Natalia Fields Apt. 853 - Gresham, MT / 64494'
        },
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Clientes', null, {})
  }
}

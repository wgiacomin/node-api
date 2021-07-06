'use strict'

module.exports = {
  up: async (queryInterface) => {

    const associados = await queryInterface.sequelize.query(
      'SELECT id FROM Associados'
    )
    const associadosRows = associados[0]

    const clientes = await queryInterface.sequelize.query(
      'SELECT id, cnpj FROM ClientesCnpjs'
    )

    const clientesRows = clientes[0]

    return queryInterface.bulkInsert(
      'Clientes', [
        {
          nome: 'Don Don Yakisoba',
          cnpj: clientesRows[0].cnpj,
          endereco: '300 Muller Plain Apt. 248 - North Miami, NJ / 22289',
          associado: associadosRows[0].id,
          cliente: clientesRows[0].id
        },
        {
          nome: 'Cho Street Food',
          cnpj: clientesRows[1].cnpj,
          endereco: '48246 Brakus Forks Apt. 577 - Charleston, VA / 34232',
          associado: associadosRows[1].id,
          cliente: clientesRows[1].id
        },
        {
          nome: 'Matteo Burgers',
          cnpj: clientesRows[2].cnpj,
          endereco: '47641 Natalia Fields Apt. 853 - Gresham, MT / 64494',
          associado: associadosRows[2].id,
          cliente: clientesRows[2].id
        },
      ]
    )
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('Clientes', null, {})
  }
}

const Sequelize = require('sequelize')

class Cliente extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
        id: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
  }
}

module.exports = Cliente
const Sequelize = require('sequelize')

class Associado extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
        id: Sequelize.INTEGER,
        nome: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        senha: Sequelize.STRING,
        endereco: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
  }
}

module.exports = Associado
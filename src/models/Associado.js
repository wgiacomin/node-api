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

  static associate(models){
    this.hasMany(models.Entrega, {foreignKey: 'associado'})
    this.hasMany(models.Motoboy, {foreignKey: 'motoboy'})
  }
}

module.exports = Associado
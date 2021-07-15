const Sequelize = require('sequelize')

class Associado extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
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
    this.hasMany(models.Cliente, {foreignKey: 'id'})
    this.hasMany(models.Entrega, {foreignKey: 'id'})
    this.hasMany(models.Motoboy, {foreignKey: 'id'})
  }
}

module.exports = Associado
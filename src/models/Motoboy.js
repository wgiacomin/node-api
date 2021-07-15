const Sequelize = require('sequelize')

class Motoboy extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING(14),
        telefone: Sequelize.STRING,
        associado: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )
  }

  static associate(models){
    this.belongsTo(models.Associado, { foreignKey: 'id', foreignKeyConstraint: true})
    this.belongsTo(models.LoginMotoboy, { foreignKey: 'id', foreignKeyConstraint: true})
    this.belongsTo(models.LoginMotoboy, { foreignKey: 'cpf'})
    this.hasMany(models.Entrega, {foreignKey: 'id'})
  }
}

module.exports = Motoboy
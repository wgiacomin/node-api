const Sequelize = require('sequelize')

class Motoboy extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        cpf: Sequelize.STRING(14),
        senha: Sequelize.STRING,
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
    this.hasMany(models.Entrega, {foreignKey: 'motoboy'})
  }
}

module.exports = Motoboy
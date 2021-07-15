const Sequelize = require('sequelize')

class Cliente extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
        nome: Sequelize.STRING,
        cnpj: Sequelize.STRING,
        endereco: Sequelize.STRING,
        associado: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    )
  }

  static associate(models){
    this.belongsTo(models.Associado, { foreignKey: 'id', foreignKeyConstraint: true})
    this.hasMany(models.Entrega, {foreignKey: 'id'})
  }
}

module.exports = Cliente
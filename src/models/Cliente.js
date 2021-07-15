const Sequelize = require('sequelize')

class ClienteCnpj extends Sequelize.Model{
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
    this.belongsTo(models.ClienteCnpj, { foreignKey: 'id', foreignKeyConstraint: true})
    this.belongsTo(models.ClienteCnpj, { foreignKey: 'cnpj'})
    this.hasMany(models.Entrega, {foreignKey: 'id'})
  }
}

module.exports = ClienteCnpj
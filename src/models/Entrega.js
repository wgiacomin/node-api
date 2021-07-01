const Sequelize = require('sequelize')

class Entrega extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
        cliente: Sequelize.INTEGER,
        motoboy: Sequelize.INTEGER,
        associado: Sequelize.INTEGER,
        valor: Sequelize.DECIMAL(8, 2),
        descricao: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
  }

  static associate(models){
    this.belongsTo(models.Cliente, { foreignKey: 'id', foreignKeyConstraint: true})
    this.belongsTo(models.Motoboy, { foreignKey: 'id', foreignKeyConstraint: true})
    this.belongsTo(models.Associado, { foreignKey: 'id', foreignKeyConstraint: true})
  }
}

module.exports = Entrega
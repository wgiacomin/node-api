const Sequelize = require('sequelize')

class LoginMotoboy extends Sequelize.Model{
  static init(sequelize){
    super.init(
      {
        cpf: Sequelize.STRING(14),
        senha: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
  }

  static associate(models){
    this.hasMany(models.Motoboy, {foreignKey: 'login'})
    this.hasMany(models.Motoboy, {foreignKey: 'cpf'})
  }
}

module.exports = LoginMotoboy
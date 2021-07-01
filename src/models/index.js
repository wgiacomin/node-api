const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)

const Sequelize = require('sequelize')
const dbConfig = require('../database/config/dbconfig')
const sequelize = new Sequelize(dbConfig)
const models = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))
    sequelize[model.name] = model.init(sequelize)
  })

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.connection = sequelize
models.Sequelize = Sequelize

module.exports = models.connection.models

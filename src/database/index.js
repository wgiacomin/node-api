const Sequelize = require('sequelize')
const dbConfig = require('./config/dbconfig')

const Associado = require('../models/Associado')
const Cliente = require('../models/Cliente')
const Entrega = require('../models/Entrega')
const Motoboy = require('../models/Motoboy')

const connection = new Sequelize(dbConfig)

Associado.init(connection)
Cliente.init(connection)
Entrega.init(connection)
Motoboy.init(connection)

Associado.associate(connection.models)
Cliente.associate(connection.models)
Entrega.associate(connection.models)
Motoboy.associate(connection.models)

module.exports = connection
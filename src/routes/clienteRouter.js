const express = require('express')
const clienteRouter = express.Router()
const clienteController = require('../controllers/clienteController')
const authToken = require('../middlewares/authToken')
const authAssociado = require('../middlewares/authAssociado')


clienteRouter.get('/', (req, res) => {
  res.send('Escolha rota!')
})
clienteRouter.post('/new', authToken, authAssociado, clienteController.newCliente)
clienteRouter.get('/list', authToken, authAssociado, clienteController.listClientes)
clienteRouter.get('/cnpj', authToken, authAssociado, clienteController.searchClienteByCNPJ)
clienteRouter.put('/update/:id', authToken, authAssociado, clienteController.updateCliente)
clienteRouter.delete('/delete/:id', authToken, authAssociado, clienteController.deleteCliente)

module.exports = clienteRouter
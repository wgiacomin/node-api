const express = require('express')
const entregaRouter = express.Router()
const entregaController = require('../controllers/entregaController')
const authToken = require('../middlewares/authToken')
const authAssociado = require('../middlewares/authAssociado')
const authMotoboy = require('../middlewares/authMotoboy')

entregaRouter.get('/', (req, res) => {
  res.status(405).send('Escolha rota!')
})
// Permitidos para associados
entregaRouter.post('/new', authToken, authAssociado, entregaController.newEntrega)
entregaRouter.get('/associadolist/:type', authToken, authAssociado, entregaController.listEntregaByAssociado)
entregaRouter.get('/associadolist', authToken, authAssociado, (req, res) => {
  res.status(406).send('Informe "all", "pending" ou "done"')
})
entregaRouter.delete('/delete/:id', authToken, authAssociado, entregaController.deleteEntrega)

// Permitidos para motoboys
entregaRouter.get('/motoboylist/:type', authToken, authMotoboy, entregaController.listEntregaByMotoboy)
entregaRouter.get('/motoboylist', authToken, authMotoboy, (req, res) => {
  res.status(406).send('Informe "all", "pending" ou "done"')
})
entregaRouter.put('/update/:id', authToken, authMotoboy, entregaController.updateEntrega)
entregaRouter.put('/update', authToken, authMotoboy, (req, res) => {
  res.status(406).send('Informe ID da entrega')
})


module.exports = entregaRouter
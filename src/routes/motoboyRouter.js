const express = require('express')
const motoboyRouter = express.Router()
const motoboyController = require('../controllers/motoboyController')
const authToken = require('../middlewares/authToken')
const authAssociado = require('../middlewares/authAssociado')


motoboyRouter.get('/', (req, res) => {
  res.send('Escolha rota!')
})
motoboyRouter.post('/new', authToken, authAssociado, motoboyController.newMotoboy)
motoboyRouter.get('/list', authToken, authAssociado, motoboyController.listMotoboys)
motoboyRouter.get('/cpf', authToken, authAssociado, motoboyController.searchMotoboyByCPF)
motoboyRouter.put('/update/:id', authToken, authAssociado, motoboyController.updateMotoboy)
motoboyRouter.delete('/delete/:id', authToken, authAssociado, motoboyController.deleteMotoboy)

module.exports = motoboyRouter
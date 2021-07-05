const express = require('express')
const associadoRouter = express.Router()
const associadoController = require('../controllers/associadoController')
const authToken = require('../middlewares/authToken')
const authAssociado = require('../middlewares/authAssociado')

associadoRouter.get('/', (req, res) => {
  res.send('Escolha rota!')
})
associadoRouter.post('/new', associadoController.newAssociado)
associadoRouter.get('/list', associadoController.listAssociados)
associadoRouter.get('/cnpj', associadoController.searchAssociadoByCNPJ)
associadoRouter.put('/update/:id', associadoController.updateAssociado)
associadoRouter.delete('/delete/:id', associadoController.deleteAssociado)
associadoRouter.get('/mydata', authToken, authAssociado, associadoController.getMyData)
associadoRouter.put('/updateme/', authToken, authAssociado, associadoController.updateMe)

module.exports = associadoRouter
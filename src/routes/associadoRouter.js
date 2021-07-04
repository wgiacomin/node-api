const express = require('express')
const associadoRouter = express.Router()
const associadoController = require('../controllers/associadoController')
//const auth = require('../middlewares/auth')

associadoRouter.get('/', (req, res) => {
  res.send('Escolha rota!')
})
associadoRouter.post('/new', associadoController.newAssociado)
associadoRouter.get('/list', associadoController.listAssociados)
associadoRouter.get('/cnpj', associadoController.searchAssociadoByCNPJ)
associadoRouter.put('/update/:id', associadoController.updateAssociado)
associadoRouter.delete('/delete/:id', associadoController.deleteAssociado)

module.exports = associadoRouter
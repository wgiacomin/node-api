const express = require('express')
const router = express.Router()
const {authenticator} = require('../controllers/authentication')
const authToken = require('../middlewares/authToken')
const associadoRouter = require('./associadoRouter')
const clienteRouter = require('./clienteRouter')
const motoboyRouter = require('./motoboyRouter')
//const entregaRouter = require('./entregaRouter')

router.get('/', authToken, (req, res) => {
  res.send('Ok!')
})

router.post('/auth', (req, res) => {
  authenticator(req, res)
}) 

router.use('/associado', associadoRouter)
router.use('/cliente', clienteRouter)
router.use('/motoboy', motoboyRouter)
//router.use('/entrega', entregaRouter)


module.exports = router
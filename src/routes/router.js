const express = require('express')
const router = express.Router()
const {authenticator} = require('../controllers/authentication')
const logout = require('../controllers/logout')
const authToken = require('../middlewares/authToken')
const associadoRouter = require('./associadoRouter')
const clienteRouter = require('./clienteRouter')
const motoboyRouter = require('./motoboyRouter')
const entregaRouter = require('./entregaRouter')

router.get('/', authToken, (req, res) => {
  res.send('Ok!')
})

router.post('/login', (req, res) => {
  authenticator(req, res)
}) 

router.get('/logout', (req, res) => {
  logout(req, res)
}) 

router.use('/associado', associadoRouter)
router.use('/cliente', clienteRouter)
router.use('/motoboy', motoboyRouter)
router.use('/entrega', entregaRouter)

module.exports = router
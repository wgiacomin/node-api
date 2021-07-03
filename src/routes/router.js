const express = require('express')
const router = express.Router()
const { Entrega } = require('../utils/models')
const {authenticator} = require('../controllers/authentication')
const { string2hash, comparePassword } = require('../utils/string2hash')
const authToken = require('../middlewares/authToken')

router.get('/', authToken, (req, res) => {
  Entrega.findAll()
    .then(entregas => {
      res.send(entregas)
    })
})

router.post('/a', (req, res) => {
  authenticator(req, res)
}) 

module.exports = router
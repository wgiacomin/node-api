const express = require('express')
const router = express.Router()
const { Entrega } = require('../utils/models')


router.get('/', (req, res) => {
  Entrega.findAll()
    .then(entregas => {
      res.send(entregas)
    })
})

module.exports = router
const express = require('express')
const app = express()
const router = require('./src/routes/router')
require('./src/database')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)

app.listen(process.env.SYSTEM_PORT, () => {
  console.log('Servidor iniciado na porta ', process.env.SYSTEM_PORT)
})

module.exports = app
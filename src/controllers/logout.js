const { v4: uuidv4 } = require('uuid')
const { MSG } = require('../utils/fieldsAndMsgs')

async function logout(req, res){
  process.env.JWT_SECRET = uuidv4()
  res.status(200).json({'msg': MSG.LOGOUT})
}

module.exports = logout
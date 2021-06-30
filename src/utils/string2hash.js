const bcrypt = require('bcryptjs')

function string2hash(string){
  return bcrypt.hashSync(string, bcrypt.genSaltSync(12))
}

module.exports = string2hash
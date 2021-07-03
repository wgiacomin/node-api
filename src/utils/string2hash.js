const bcrypt = require('bcryptjs')

function string2hash(string){
  return bcrypt.hashSync(string, bcrypt.genSaltSync(12))
}

function comparePassword(password, hash){
  return bcrypt.compareSync(password, hash)
}

module.exports = 
{ string2hash, comparePassword }
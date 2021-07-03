const { FIELDS, MSG } = require('./fields')
const { Associado, Motoboy } = require('../utils/models')
const { string2hash, comparePassword } = require('../utils/string2hash')

async function authenticator(req, res){
  const senha = eval(`req.body.${FIELDS.PASSWORD}`)

  let type
  let login
  if ((login = eval(`req.body.${FIELDS.LOGIN[0]}`))){
    type = 0
  } else if ((login = eval(`req.body.${FIELDS.LOGIN[1]}`))){
    type = 1
  } else {
    return res.status(400).json(MSG.TIPO_ERRADO)
  }

  if(!senha){
    return res.status(400).json(MSG.SENHA_FALTANTE)
  }
  
  try{
    const user = await eval(
      `${FIELDS.USER_DICT[type]}.findOne({ 
        where: { 
          ${FIELDS.LOGIN[type]}: "${login}"
        },
      })`
    )

    if (!user || !comparePassword(senha, user.senha)){
      return res.status(404).json(MSG.FALHA_AUTENTICACAO)
    } else {
      return res.status(200).json(MSG.SUCESSO_AUTENTICACAO)
    }

  } catch (error){
    console.log(error)
    res.status(500).json(error)
  }

}

module.exports = {
  authenticator

}
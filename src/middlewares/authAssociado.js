const { MSG, DICT } = require('../utils/fieldsAndMsgs')

function AuthAssociado(req, res, next){
  if (req.user.type != DICT.ASSOCIADO){
    return res.status(401).json({msg: MSG.SEM_PERMISSAO})
  }
  next()
}

module.exports = AuthAssociado
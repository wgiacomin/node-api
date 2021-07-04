const { MSG, DICT } = require('../utils/fieldsAndMsgs')

function AuthMotoboy(req, res, next){
  if (req.user.type != DICT.MOTOBOY){
    return res.status(401).json({msg: MSG.SEM_PERMISSAO})
  }
  next()
}

module.exports = AuthMotoboy
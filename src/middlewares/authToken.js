const jwt = require('jsonwebtoken')
const { MSG } = require('../utils/fieldsAndMsgs')

function verifyToken(req, res, next){
    const token = req.headers['x-access-token']
    
    if (!token){
        return res.status(401).json({msg: MSG.TOKEN_AUSENTE})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err){
            return res.status(401).json({msg: MSG.TOKEN_INVALIDO})
        }
        req.userId = decoded.userId
        next()
    })
}

module.exports = verifyToken
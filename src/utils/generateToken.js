const jwt = require('jsonwebtoken')

function generateToken(id, type){
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20)
    const token = jwt.sign({ id, type }, process.env.JWT_SECRET, {
        expiresIn: 82800,
    })
    return token
}

module.exports = generateToken
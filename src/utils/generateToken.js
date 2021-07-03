const jwt = require('jsonwebtoken')

function generateToken(id){
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20)
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 82800,
    })
    return token
}

module.exports = jwt
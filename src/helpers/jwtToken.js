const jwt = require('jsonwebtoken')

const generateToken = async(payload)=>{
    return jwt.sign({data: payload}, process.env.JWT_SECRET_KEY, {
        algorithm : 'HS256',
        expiresIn : '1h'
    })
}

const renovateToken = async (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY_RENNOVATION, {
        algorithm: 'HS256',
        expiresIn : '7d'
    })
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET_KEY, {
        algorithms : 'HS256'
    })
}

module.exports = {generateToken, renovateToken, verifyToken}
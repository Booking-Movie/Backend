const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
    return accessToken
}

const decodeToken = (token) => {
    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        return decode
    } catch {
        return null
    }
}


module.exports = {
    generateToken,
    decodeToken
}
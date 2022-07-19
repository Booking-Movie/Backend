const jwt = require('jsonwebtoken')

const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.SECRECT_KEY, { expiresIn: 60 * 60 })
    console.log(process.env.SECRECT_KEY)
    return accessToken
}

const decodeToken = (token) => {
    try {
        const decode = jwt.verify(token, process.env.SECRECT_KEY)
        return decode
    } catch {
        return null
    }
}


module.exports = {
    generateToken,
    decodeToken
}
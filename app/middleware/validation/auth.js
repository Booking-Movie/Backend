const jwt = require('jsonwebtoken')
const { sequelize } = require('../../config/db_connect');
const initModels = require('../../models/init-models');
const models = initModels(sequelize)

const authenticate = (req, res, next) => {
    const token = req.header("token");
    try {
        const secretKey = "phongLVH";
        const decode = jwt.verify(token, secretKey);
        req.user = decode
        next();
    } catch (error) {
        res.status(401).send({
            message: "Bạn chưa đăng nhập"
        })
    }
}


module.exports = {
    authenticate
}
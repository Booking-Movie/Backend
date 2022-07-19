const bcryptjs = require('bcryptjs');
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const jwt = require('jsonwebtoken');
const { decodeToken, generateToken } = require('../helper/jwt_helper');
var models = initModels(sequelize)


const signUp = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { username, password, fullname, address, email, phone, } = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    await models.users.create({
        username,
        password: hashPassword,
        fullname,
        address,
        email,
        phone,
        avatar: urlImage
    });
    res.status(201).send({
        message: "Signup Success"
    })
}

const signIn = async (req, res) => {
    const { username, password } = req.body
    try {
        const userLogin = await models.users.findOne({
            where: {
                username,
            }
        });
        if (userLogin) {
            const isAuth = bcryptjs.compareSync(password, userLogin.password)
            const payload = {
                id: userLogin.id,
                username: userLogin.username,
                role: userLogin.role_name,
            }
            if (isAuth) {
                const accessToken = generateToken(payload)
                // const secretKey = "phongLVH";
                // const accessToken = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 })
                // res.headers('Authorization', 'Bearer ' + accessToken).send(accessToken);
                res.status(200).send({
                    message: "Login Success",
                    payload,
                    accessToken,
                    status_code: 200,
                    success: true
                })
            } else {
                res.status(403).send({
                    message: "Password Incorrect",
                    status_code: 201,
                    success: false
                })
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
};



const checkAuth = (req, res, next) => {
    const accessToken = req.headers.authorization.split(' ')[1]
    const decode = decodeToken(accessToken)
    if (decode != null) {
        req.user = decode
        next()
    } else (
        res.status(401).send({
            message: 'You are not logged in',
            status_code: 401,
            success: false
        })
    )
}

const authorize = arrayRole => (req, res, next) => {
    const { user } = req
    if (arrayRole.includes(user.role)) {
        next()
    } else {
        res.status(403).send({
            message: "You are logged in, but not authorized",
            status_code: 403,
            success: false
        })
    }
}
module.exports = {
    signIn,
    signUp,
    checkAuth,
    authorize
}
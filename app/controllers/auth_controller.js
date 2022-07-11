const bcryptjs = require('bcryptjs');
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const jwt = require('jsonwebtoken');
var models = initModels(sequelize)


const signUp = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { username, password, fullname, address, email, phone, } = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await models.users.create({
        username,
        password: hashPassword,
        fullname,
        address,
        email,
        phone,
        avatar: urlImage
    });
    res.status(201).send(newUser)
}

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body
        const userLogin = await models.users.findOne({
            where: {
                username,
            }
        });
        if (userLogin) {
            const isAuth = bcryptjs.compareSync(password, userLogin.password)
            if (isAuth) {
                const payload = {
                    id: userLogin.id,
                    username: userLogin.username,
                    role: userLogin.role_name,
                }

                const secretKey = "phongLVH";
                const accessToken = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 })
                res.status(200).send({
                    message: "Đăng nhập thành công",
                    payload,
                    accessToken
                })
                // res.headers('Authorization', 'Bearer' + accessToken).send(accessToken)
                // if (userLogin.role_name === "Admin") {
                //     res.status(200).send({
                //         message: "Đăng nhập thành công",
                //         payload,
                //         accessToken
                //     })
                // } else {
                //     res.status(401).send({
                //         message: "Khong du quyen"
                //     })
                // }
            } else {
                res.status(403).send({
                    message: "Mật khẩu không chính xác"
                })
            }
        } else {
            res.status(404).send({
                message: "Email không chính xác"
            });
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


module.exports = {
    signIn,
    signUp,
}
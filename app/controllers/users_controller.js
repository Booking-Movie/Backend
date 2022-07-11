
const bcryptjs = require('bcryptjs');
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const findAllUser = async (rep, res) => {
    try {
        const userList = await models.users.findAll({
            attributes: {
                exclude: ["password"],
            },
        });
        res.status(200).send(userList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const createUser = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { username, password, fullname, address, email, phone, role_name } = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    const newUser = await models.users.create({
        username,
        password: hashPassword,
        fullname,
        address,
        email,
        phone,
        role_name,
        avatar: urlImage
    });
    res.status(201).send(newUser)
}

const editUser = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { id } = req.body
    const { username, password, fullname, address, email, phone, role } = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    try {
        let userUpdate = await models.users.update({
            username: username,
            password: hashPassword,
            fullname: fullname,
            address: address,
            email: email,
            phone: phone,
            role: role,
            avatar: urlImage,
        },
            {
                where: {
                    id
                }
            }
        );
        res.status(200).send(userUpdate)
    } catch (error) {
        res.status(500).send(error)
    }
}

const findDetailUser = async (req, res) => {
    try {
        const { id } = req.params;
        const detailUser = await models.users.findByPk(id);
        res.status(200).json(detailUser);
    } catch (error) {
        res.status(500).send(error);
    }
};


const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const findUser = await models.users.findByPk(id);
        await User.destroy({
            where: {
                id,
            },
        });
        res.status(200).send(findUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

const checkEmail = async (req, res) => {
    const { email } = req.params
    console.log("🚀 ~ file: user.controller.js ~ line 94 ~ checkEmail ~ email", email)
    const emailExists = await models.users.findOne({
        where: {
            email: email
        }
    })
    if (emailExists) {
        res.status(401).send(emailExists)
    }
}

const uploadAvatar = async (req, res) => {
    // Lưu hình vào data base
    try {
        const { formData, file } = req;
        const urlImage = `http://localhost:7000/${file.path}`;
        // Tìm thằng user muốn upload
        const userUploadAvatar = await models.users.findByPk(formData.username);
        // Phải thêm thuộc tính avatar bên model user
        userUploadAvatar.avatar = urlImage;
        await userUploadAvatar.save();
        res.send(userUploadAvatar);
        res.status(200).send(userUploadAvatar);
    } catch (error) {
        res.status(500).send(error)
    }
};

module.exports = {
    createUser,
    uploadAvatar,
    deleteUser,
    findAllUser,
    findDetailUser,
    editUser,
    checkEmail
}
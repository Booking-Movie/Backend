
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
        if (userList) {
            res.status(200).json({
                payload: userList,
                message: "Find All User Success",
                status_code: 200,
                success: true
            });
        } else {
            res.status(404).json({
                message: "Not Found",
                status_code: 404,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};

const createUser = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { username, password, fullname, address, email, phone, role } = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    try {
        const newUser = await models.users.create({
            username,
            password: hashPassword,
            fullname,
            address,
            email,
            phone,
            role_name: role,
            avatar: urlImage
        });
        if (newUser) {
            res.status(201).json({
                newUser,
                message: "Create User Success",
                status_code: 201,
                success: true
            })
        } else {
            res.status(404).json({
                message: "Not Found",
                status_code: 404,
                success: false
            })
        }
    } catch (error) {
        req.status(500).send(error)
    }
}

const updateUser = async (req, res) => {
    const { file } = req;
    // const urlImage = `http://localhost:7000/${file.path}`;
    const { id } = req.body
    const { username, password, fullname, address, email, phone, role } = req.body
    const salt = bcryptjs.genSaltSync(10);
    const hashPassword = bcryptjs.hashSync(password, salt);
    try {
        if (password !== '') {
            await models.users.update({
                password: hashPassword
            }, {
                where: {
                    id
                }
            })
        }
        if (file === undefined) {
            console.log("Don't changes")
        } else {
            const urlImage = `http://localhost:7000/${file.path}`;
            await models.users.update({
                avatar: urlImage,
            }, {
                where: {
                    id
                }
            }
            )
        }
        const userUpdate = await models.users.update({
            username: username,
            fullname: fullname,
            address: address,
            email: email,
            phone: phone,
            role_name: role,
        },
            {
                where: {
                    id
                }
            }
        );
        if (userUpdate) {
            res.status(200).json({
                username: username,
                message: "Update Success",
                status_code: 200,
                success: true
            })
        } else {
            res.status(404).json({
                message: "Not Found",
                status_code: 404,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const findDetailUser = async (req, res) => {
    const { id } = req.params;
    try {
        const detailUser = await models.users.findByPk(id);
        if (detailUser) {
            res.status(200).json({
                payload: detailUser,
                message: "Find Detail User Success",
                status_code: 200,
                success: true
            });
        } else {
            res.status(404).json({
                message: "Not Found",
                status_code: 404,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const User = await models.users.findByPk(id);
        await User.destroy({
            where: {
                id,
            },
        });
        if (User) {
            res.status(200).json({
                username: User.username,
                message: "Delete User Success",
                status_code: 200,
                success: true
            });
        } else {
            res.status(403).json({
                message: "User doesn't exist",
                status_code: 403,
                success: false
            });
        }

    } catch (error) {
        res.status(500).send(error);
    }
}



module.exports = {
    createUser,
    deleteUser,
    findAllUser,
    findDetailUser,
    updateUser
}
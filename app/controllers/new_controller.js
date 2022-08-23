const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const getAllNew = async (req, res) => {
    try {
        const querySql = `#graphql
        select *, n.id as new_id 
        from news as n
        join news_type as nt on n.type_id = nt.id ;
        `;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
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

const createNew = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { new_title, new_introduction, new_body, new_conclusion, type_id, user_id } = req.body
    try {
        const newOne = await models.news.create({
            new_title,
            new_introduction,
            new_body,
            new_conclusion,
            type_id: type_id,
            user_id,
            new_image: urlImage
        });
        if (newOne) {
            res.status(200).json({
                message: "Create New Success",
                status_code: 200,
                success: true
            })
        } else {
            res.status(404).json({
                message: "Not Found!",
                status_code: 404,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateNew = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { new_id, new_title, new_introduction, new_body, new_conclusion, type_id } = req.body
    try {
        await models.news.update({
            new_title: new_title,
            new_introduction: new_introduction,
            new_body: new_body,
            new_conclusion: new_conclusion,
            type_id: type_id,
            new_image: urlImage,
        }, {
            where: {
                id: new_id
            }
        })
        res.status(200).json({
            message: "Update New Success",
            status_code: 200,
            success: true
        })
    } catch (error) {
        res.status(500).send(error)
    }
}
const deleteNew = async (req, res) => {
    const { new_id } = req.params
    try {
        const newInfo = await models.news.destroy({
            where: {
                id: new_id
            }
        })
        if (newInfo) {
            res.status(200).json({
                message: "Delete New Success",
                status_code: 200,
                success: true
            })
        } else {
            res.status(403).send({
                message: "New doesn't exist",
                status_code: 403,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    getAllNew,
    createNew,
    updateNew,
    deleteNew
}
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
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}

const createNew = async (req, res) => {
    try {
        const { file } = req;
        const urlImage = `http://localhost:7000/${file.path}`;
        const { new_title, new_introduction, new_body, new_conclusion, type_id, user_id } = req.body
        await models.news.create({
            new_title,
            new_introduction,
            new_body,
            new_conclusion,
            type_id: type_id,
            user_id,
            new_image: urlImage
        });
        res.status(200).send({
            message: "Create New Success",
            status_code: 200,
            success: true
        })
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
    try {
        const { new_id } = req.params
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
        res.status(200).json({

        })
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
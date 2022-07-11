const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const GetAllNew = async (req, res) => {
    try {
        const querySql = `
      select *, n.id as new_id from 
      news as n
      join news_type as nt on n.type_id = nt.id ;
        `;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}

const CreateNew = async (req, res) => {
    try {
        const { file } = req;
        const urlImage = `http://localhost:7000/${file.path}`;
        const { new_title, new_introduction, new_body, new_conclusion, type_id, user_id } = req.body
        const newsInfo = await models.news.create({
            new_title,
            new_introduction,
            new_body,
            new_conclusion,
            type_id: type_id,
            user_id,
            new_image: urlImage
        });

        res.status(200).send(newsInfo)
    } catch (error) {
        res.status(500).send(error)
    }
}

const UpdateNew = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { new_id, id, new_title, new_introduction, new_body, new_conclusion, type_id } = req.body
    try {
        let updateNew = await models.news.update({
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
        res.status(200).json(updateNew)
    } catch (error) {
        res.status(500).send(error)
    }
}
const DeleteNew = async (req, res) => {
    try {
        const { new_id } = req.params
        await models.news.destroy({
            where: {
                id: new_id
            }
        })
        res.status(200).json({
            message: "Delete Success"
        })
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    GetAllNew,
    CreateNew,
    UpdateNew,
    DeleteNew
}
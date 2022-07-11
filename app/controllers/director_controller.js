
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const FindAllDirector = async (req, res) => {
    try {
        const ListActor = await models.director.findAll()
        res.status(200).json(ListActor)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    FindAllDirector
}
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const isUsername = async (req, res) => {
    const { username } = req.params
    console.log("🚀 ~ file: check_controller.js ~ line 7 ~ isUsername ~ username", username)
    try {
        const querySql = `
        select u.username from users as u where u.username = "${username}"`;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json(results);
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    isUsername
}
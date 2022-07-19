const { sequelize } = require('../config/db_connect');

const isUsername = async (req, res) => {
    const { username } = req.params
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
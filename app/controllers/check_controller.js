const { sequelize } = require('../config/db_connect');

const checkExistUsername = async (req, res) => {
    const { username } = req.params
    try {
        const querySql = `#graphql
        select u.username from users as u where u.username = "${username}"`;
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
const checkExistEmail = async (req, res) => {
    const { email } = req.params
    try {
        const querySql = `
        select u.email from users as u where u.email = "${email}"`;
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


module.exports = {
    checkExistUsername,
    checkExistEmail
}
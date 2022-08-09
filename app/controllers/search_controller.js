const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)

const SearchResult = async (req, res) => {
    const { term } = req.params
    try {
        const querySql = `#graphql
        select * from movie as m where m.name_movie like '%${term}%'
            `;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);

    } catch (error) {
        res.status(500).send(error)
    }
}
const SearchUser = async (req, res) => {
    const { user } = req.params
    try {
        const querySql = `#graphql
        select * from users as u where u.username like '%${user}%'
            `;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}

const FilterDate = async (req, res) => {
    try {
        const { id } = req.params;
        const querySql = `#graphql
        select  JSON_ARRAYAGG(json_object('id', s.id, 'time_start', s.time_start, 'start_date', s.start_date)) as show_time
        from cinema as c
        join  movie as m on c.movie_id = m.id
        join showtime as s on m.id = s.movie_id where c.id = ${id} 
        group by s.id order by s.time_start desc`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    SearchResult,
    FilterDate,
    SearchUser
}
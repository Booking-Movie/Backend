const moment = require('moment/moment');
const { sale } = require('paypal-rest-sdk');
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)

const findAllMovies = async (req, res) => {
    try {
        const movieList = await models.movie.findAll();
        if (movieList) {
            res.status(200).json({
                payload: movieList,
                message: "Find All Movie Success",
                status_code: 200,
                success: true
            });
        } else {
            res.status(404).json({
                message: "Not Found!",
                status_code: 404,
                success: sale
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

const findDetailMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const querySql = `#graphql 
    select m.id as movie_id, m.name_movie,m.comming_data,m.des_movie,m.time_show,m.nation,m.evaluate,m.image_movie,  JSON_ARRAYAGG(json_object('actor_id',a.id, 'name_actor',a.name_actor)) as actor
    from movie as m
    join actor_movie as am on m.id = am.movie_id
    join actor as a on am.actor_id = a.id where m.id = ${id} group by m.id`;
        const [results] = await sequelize.query(querySql)
        if (results) {
            res.status(200).json([results]);
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
}
const finAllTimeOfMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const querySql = `#graphql
        select c.name_cinema,c.id as cinema_id, m.id, JSON_ARRAYAGG(json_object('id',s.id, 'time_start',s.time_start, 'start_date', s.start_date)) as show_time
        from movie as m
        join cinema_movie as cm on m.id = cm.movie_id
        join cinema as c on cm.cinema_id = c.id
        join showtime as s on cm.showtime_id = s.id where m.id=${id}  group by c.id order by s.time_start`;
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
const finAllTimeOfNameCinema = async (req, res) => {
    const { name_cinema } = req.params;
    try {
        const querySql = `#graphql
        select c.name_cinema JSON_ARRAYAGG(json_object('id',s.id, 'time_start',s.time_start)) as show_time
        from movie as m
        join showtime as s on m.id = s.movie_id
        join cinema as c on s.cinema_id = c.id where c.name_cinema like '${name_cinema}%' group by c.id order by s.time_start`;
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

const createMovie = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    try {
        const { name_movie, comming_data, des_movie, trailer, nation, status_movie, evaluate, time_show } = req.body
        const newMovie = await models.movie.create({
            name_movie,
            comming_data,
            des_movie,
            trailer,
            time_show,
            nation,
            status_movie,
            evaluate,
            image_movie: urlImage
        });

        if (newMovie) {
            res.status(201).send({
                name_movie,
                message: "Create Movie Success",
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
        res.status(500).send(error)
    }
}


const updateMovie = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { id } = req.body
    const { name_movie, comming_data, des_movie, trailer, nation, director, status_movie, evaluate, time_show } = req.body
    try {
        const movieUpdate = await models.movie.update({
            name_movie: name_movie,
            comming_data: comming_data,
            des_movie: des_movie,
            trailer: trailer,
            nation: nation,
            time_show: time_show,
            director: director,
            status_movie: status_movie,
            evaluate: evaluate,
            image_movie: urlImage
        },
            {
                where: {
                    id
                }
            }
        );
        if (movieUpdate) {
            res.status(200).send({
                name: name_movie,
                message: 'Upload Movie Success',
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

const deleteMovie = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await models.movie.findByPk(id)
        await models.movie.destroy({
            where: {
                id,
            },
        })
        if (movie) {
            res.status(200).json({
                name: movie.name_movie,
                message: "Delete Success",
                status_code: 200,
                success: true
            })
        } else {
            res.status(403).json({
                message: "Movie doesn't exist",
                status_code: 403,
                success: false
            })

        }
    } catch (error) {
        res.status(500).send(error);
    }
}
const getInfoMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const querySql = `#graphql
        select m.id as movie_id, m.name_movie, s.code_theater, s.start_date, c.name_cinema, c.address, s.time_start from 
        showtime as s
        join cinema as c on s.cinema_id = c.id 
        join cinema_movie cm on c.id = cm.cinema_id
        join movie as m on cm.movie_id = m.id where s.id=${id}  group by c.id order by s.time_start;
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

const findSeemore = async (req, res) => {
    const { id } = req.params
    try {
        const newSeemore = await models.movie.findAll({
            where: {
                status_movie: id
            }
        })
        if (newSeemore) {
            res.status(200).json(newSeemore)
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
    findDetailMovie,
    finAllTimeOfMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    findAllMovies,
    getInfoMovie,
    findSeemore,
    finAllTimeOfNameCinema
}
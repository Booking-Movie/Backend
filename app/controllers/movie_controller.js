const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)

const findAllMovieNowShowing = async (req, res) => {
    try {
        const cinemaList = await models.movie.findAll({
            where: {
                status_movie: "NowShowing"
            }
        });
        res.status(200).json(cinemaList);

    } catch (error) {
        res.status(500).send(error);
    }
}

const finAllMovieCommingSoon = async (req, res) => {
    try {
        const movieList = await models.movie.findAll({
            where: {
                status_movie: "CommingSoon"
            }
        });
        res.status(200).json(movieList);

    } catch (error) {
        res.status(500).send(error);
    }
}

const findAllMovies = async (req, res) => {
    try {
        const movieList = await models.movie.findAll();
        res.status(200).json(movieList);
    } catch (error) {
        res.status(500).send(error);
    }
}

const findDetailMovie = async (req, res) => {
    try {
        const { id } = req.params;
        // const detailMovie = await models.movie.findOne({
        //     where: {
        //         id,
        //     },
        // });
        const querySql = `
        select m.id as movie_id, m.name_movie,m.comming_data,m.des_movie,m.time_show,m.nation,m.evaluate,m.image_movie, JSON_ARRAYAGG(json_object('director_id',d.id, 'name_director',d.name_director)) as director, JSON_ARRAYAGG(json_object('actor_id',a.id, 'name_actor',a.name_actor)) as actor
     from movie as m
    join actor_movie am on m.id = am.movie_id
    join actor as a on am.actor_id = a.id
    join director_movie dm on m.id = dm.movie_id
    join director d  on dm.director_id = d.id where m.id =${id}`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json([results]);
    } catch (error) {
        res.status(500).send(error);
    }
}
const finAllTimeOfMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const querySql = `
        select c.name_cinema,c.id as cinema_id, m.id, JSON_ARRAYAGG(json_object('id',s.id, 'time_start',s.time_start, 'start_date', s.start_date)) as show_time
     from movie as m
    join cinema_movie as cm on m.id = cm.movie_id
    join cinema as c on cm.cinema_id = c.id
    join showtime as s on cm.showtime_id = s.id where m.id=${id}  group by c.id order by s.time_start`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}
const finAllTimeOfNameCinema = async (req, res) => {
    try {
        const { name_cinema } = req.params;
        const querySql = `
        select c.name_cinema JSON_ARRAYAGG(json_object('id',s.id, 'time_start',s.time_start)) as show_time
        from movie as m
        join showtime as s on m.id = s.movie_id
        join cinema as c on s.cinema_id = c.id where c.name_cinema like '${name_cinema}%'
        group by c.id order by s.time_start`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}

const createMovie = async (req, res) => {
    try {
        const { file } = req;
        const urlImage = `http://localhost:7000/${file.path}`;
        const { name_movie, comming_data, des_movie, trailer, nation, status_movie, evaluate, time_show } = req.body
        await models.movie.create({
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
        res.status(201).send({
            name_movie,
            message: "Create Movie Success",
            status_code: 201,
            success: true
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const createMovieCinema = (req, res) => {
    try {
        const { cinema_id, movie_id } = req.body
        const newMovieCinema = models.cinema_movie.create({
            cinema_id,
            movie_id
        })
        if (newMovieCinema !== null) {
            res.status(200).send({
                message: "Create success"
            })
        } else {
            res.status(404).send({
                message: "Create fail"
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
        await models.movie.update({
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
        res.status(200).send({
            name: name_movie,
            message: 'Upload Movie Success',
            status_code: 200,
            success: true
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await models.movie.findByPk(id)
        console.log("🚀 ~ file: movie_controller.js ~ line 182 ~ deleteMovie ~ movie",)

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
            res.status(403).send({
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
        const querySql = `
      select m.name_movie, s.code_theater, s.start_date, c.name_cinema, c.address, s.time_start from 
      showtime as s
      join cinema as c on s.cinema_id = c.id 
      join cinema_movie cm on c.id = cm.cinema_id
      join movie as m on cm.movie_id = m.id where s.id=${id}  group by c.id order by s.time_start;
        `;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}

const findSeemore = async (req, res) => {
    const { id } = req.params
    const newSeemore = await models.movie.findAll({
        where: {
            status_movie: id
        }
    })
    res.status(200).json(newSeemore)
}

module.exports = {
    findAllMovieNowShowing,
    findDetailMovie,
    finAllTimeOfMovie,
    createMovie,
    updateMovie,
    deleteMovie,
    createMovieCinema,
    finAllMovieCommingSoon,
    findAllMovies,
    getInfoMovie,
    findSeemore,
    finAllTimeOfNameCinema
}
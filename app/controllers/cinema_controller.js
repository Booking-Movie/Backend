const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)

const createCinema = async (req, res) => {
    try {
        const { file } = req;
        const urlImage = `http://localhost:7000/${file.path}`;
        const { name_cinema, address } = req.body
        const newCinema = await models.cinema.create({
            name_cinema,
            address,
            image: urlImage
        });

        res.status(201).send(newCinema)
    } catch (error) {
        res.status(500).send(error)
    }
}

const findAllCinema = async (rep, res) => {
    try {
        const cinemaList = await models.cinema.findAll();
        res.status(200).json(cinemaList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const editCinema = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { id } = req.body
    const { name_cinema, address } = req.body
    try {
        let userUpdate = await models.cinema.update({
            name_cinema: name_cinema,
            address: address,
            image: urlImage,
        },
            {
                where: {
                    id
                }
            }
        );
        res.status(200).send(userUpdate)
    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteCinema = async (req, res) => {
    try {
        const { id } = req.params;
        const findCinema = await models.cinema.findByPk(id);
        await models.cinema.destroy({
            where: {
                id,
            },
        });
        res.status(200).send(findCinema);
    } catch (error) {
        res.status(500).send(error);
    }
}

const finAllCinemaMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const querySql = `
        select *
        from movie as m
        join  cinema_movie as c_m on m.id = c_m.movie_id
        join cinema c on c_m.cinema_id = c.id where m.id=${id} 
        group by c.id `;
        const [results] = await sequelize.query(querySql)
        res.status(200).send([results]);
    } catch (error) {
        res.status(500).send(error)
    }
}


const cinema_movie = async (req, res) => {

    const data = req.body;
    try {
        const Junction = await models.cinema_movie.create(data);
        res.send(Junction);
    } catch (err) {
        res.send(err);
    }
}

module.exports = {
    createCinema,
    findAllCinema,
    editCinema,
    deleteCinema,
    finAllCinemaMovie,
    cinema_movie
}
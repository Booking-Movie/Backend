const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)

const createCinema = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { name_cinema, address } = req.body
    try {
        const newCinema = await models.cinema.create({
            name_cinema,
            address,
            image: urlImage
        });
        if (newCinema !== null) {
            res.status(200).send({
                message: "Create Cinema Success",
                status_code: 200,
                success: true
            })
        }
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

const updateCinema = async (req, res) => {
    const { file } = req;
    const urlImage = `http://localhost:7000/${file.path}`;
    const { id } = req.body
    const { name_cinema, address } = req.body
    try {
        await models.cinema.update({
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
        res.status(200).send({
            message: "Edit Cinema Success",
            status_code: 200,
            success: true
        })
    } catch (error) {
        res.status(500).send(error)
    }
}


const deleteCinema = async (req, res) => {
    const { id } = req.params;
    try {
        const cinema = await models.cinema.destroy({
            where: {
                id,
            },
        });
        if (cinema) {
            res.status(200).json({
                message: "Delete Cinema Success",
                status_code: 200,
                success: true
            })
        } else {
            res.status(403).send({
                message: "Cinema doesn't exist",
                status_code: 403,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createCinema,
    findAllCinema,
    updateCinema,
    deleteCinema,
}
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)


// const createSeat = async (req, res) => {
//     const { id, showtime_id } = req.body
//     const seats = []
//     seatCodes.forEach((name_seat) => {
//         const newSeat = models.seat.create({ name_seat, id, showtime_id })
//         seats.push(newSeat)
//     })
//     res.status(201).send(seats)
// }
const seatCodes = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9", "C10", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9", "D10"]
const createShowTime = async (req, res) => {
    const { code_theater, time_start, movie_id, cinema_id, start_date } = req.body
    console.log("🚀 ~ file: showtime_controller.js ~ line 18 ~ createShowTime ~ req.body", req.body)
    try {
        const newShowTime = await models.showtime.create({
            code_theater,
            time_start,
            start_date,
        });
        if (cinema_id) {
            cinema_id.forEach(async (cinema) => {
                await models.cinema_movie.create({
                    cinema_id: cinema.value,
                    movie_id: movie_id,
                    showtime_id: newShowTime.id,
                })
            })
        }
        // const seats = []
        seatCodes.forEach((name_seat) => {
            models.seat.create({
                name_seat, showtime_id: newShowTime.id
            })
            // seats.push(newSeat)
        })
        res.status(200).send({
            time: time_start,
            message: "Create Showtime Success",
            status_code: 200,
            success: true,
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const findAllSeatByShowTimeId = async (req, res) => {
    const { id } = req.params
    try {
        const findSeat = await models.showtime.findAll({
            include: [{
                model: models.seat,
                as: "seats",
                where: {
                    showtime_id: id
                }
            }]
        })
        if (findSeat) {
            res.status(200).json(findSeat)
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
    createShowTime,
    // createSeat,
    findAllSeatByShowTimeId
}
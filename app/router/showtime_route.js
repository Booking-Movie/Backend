const { Router } = require('express');
const { finAllTimeOfMovie } = require('../controllers/movie_controller');
const { createShowTime, findAllSeatByShowTimeId } = require('../controllers/showtime_controller');

const showtimeRouter = Router()

showtimeRouter.post("/", createShowTime)
// showtimeRouter.post("/create-seat", createSeat)
// showtimeRouter.get("/get-all-seat", createSeat)
showtimeRouter.get("/:id", findAllSeatByShowTimeId)

module.exports = {
    showtimeRouter
}
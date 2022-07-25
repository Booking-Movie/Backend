const { Router } = require('express');
const { finAllTimeOfNameCinema } = require('../controllers/movie_controller');
const { createShowTime, findAllSeatByShowTimeId } = require('../controllers/showtime_controller');

const showtimeRouter = Router()

showtimeRouter.post("/create", createShowTime)
showtimeRouter.get("/:id", findAllSeatByShowTimeId)
showtimeRouter.get('/time-of-movie/:id', finAllTimeOfNameCinema);
module.exports = {
    showtimeRouter
}
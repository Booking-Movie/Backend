const { Router } = require('express');
const { createMovieCinema, finAllTimeOfMovie, findAllMovies, finAllTimeOfNameCinema } = require('../controllers/movie_controller');
const movieCinemaRouter = Router()

movieCinemaRouter.post("/", createMovieCinema);
movieCinemaRouter.get('/:id', finAllTimeOfMovie);
// movieCinemaRouter.get('/', findAllMovies)
movieCinemaRouter.get('/cinema-name/:id', finAllTimeOfNameCinema);


module.exports = {
    movieCinemaRouter
}
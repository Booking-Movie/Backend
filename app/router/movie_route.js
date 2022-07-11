const { Router } = require('express');
const { finAllTimeOfMovie, createMovie, updateMovie, deleteMovie, findAllMovieNowShowing, finAllMovieCommingSoon, findDetailMovie, findSeemore, } = require('../controllers/movie_controller');
const { uploadImageSingle } = require('../middleware/uploads');
const movie = require('../models/movie');



const movieRouter = Router()

movieRouter.get('/', findAllMovieNowShowing);
movieRouter.get('/soon', finAllMovieCommingSoon)
movieRouter.post('/', uploadImageSingle('movie'), createMovie)
movieRouter.put('/', uploadImageSingle('movie'), updateMovie)
movieRouter.delete('/:id', deleteMovie)
movieRouter.get('/detail/:id', findDetailMovie)
movieRouter.get('/:id', findSeemore)


module.exports = {
    movieRouter
}
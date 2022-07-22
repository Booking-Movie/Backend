const { Router } = require('express');
const { checkAuth, authorize } = require('../controllers/auth_controller');
const { createMovie, updateMovie, deleteMovie, findAllMovieNowShowing, finAllMovieCommingSoon, findDetailMovie, findSeemore, getInfoMovie, findAllMovies } = require('../controllers/movie_controller');
const { uploadImageSingle } = require('../helper/upload-file_helper');

const movie = require('../models/movie');
const movieRouter = Router()

movieRouter.get('/info-movie/:id', getInfoMovie)
movieRouter.get('/', findAllMovieNowShowing);
movieRouter.get('/find-all-movie', findAllMovies)
movieRouter.get('/soon', finAllMovieCommingSoon)
movieRouter.post('/create-movie', checkAuth, authorize('Admin'), uploadImageSingle('movie'), createMovie)
movieRouter.put('/update-movie', checkAuth, authorize('Admin'), uploadImageSingle('movie'), updateMovie)
movieRouter.delete('/delete-movie/:id', checkAuth, authorize('Admin'), deleteMovie)
movieRouter.get('/detail/:id', findDetailMovie)
movieRouter.get('/:id', findSeemore)


module.exports = {
    movieRouter
}
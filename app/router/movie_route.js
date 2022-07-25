const { Router } = require('express');
const { checkAuth, authorize } = require('../controllers/auth_controller');
const { createMovie, updateMovie, deleteMovie, findDetailMovie, findSeemore, getInfoMovie, findAllMovies } = require('../controllers/movie_controller');
const { uploadImageSingle } = require('../helper/upload-file_helper');

const movieRouter = Router()

movieRouter.get('/info-movie/:id', getInfoMovie)
movieRouter.get('/find-all-movie', findAllMovies)
movieRouter.post('/create-movie', checkAuth, authorize('Admin'), uploadImageSingle('movie'), createMovie)
movieRouter.put('/update-movie', checkAuth, authorize('Admin'), uploadImageSingle('movie'), updateMovie)
movieRouter.delete('/delete-movie/:id', checkAuth, authorize('Admin'), deleteMovie)
movieRouter.get('/movie-detail/:id', findDetailMovie)
movieRouter.get('/:id', findSeemore)


module.exports = {
    movieRouter
}
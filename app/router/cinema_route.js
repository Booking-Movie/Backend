const { Router } = require('express');
const { checkAuth, authorize } = require('../controllers/auth_controller');
const { createCinema, findAllCinema, deleteCinema, updateCinema } = require('../controllers/cinema_controller');
const { finAllTimeOfMovie } = require('../controllers/movie_controller');
const { uploadImageSingle } = require('../helper/upload-file_helper');

const cinemaRouter = Router()

cinemaRouter.post('/create-cinema', checkAuth, authorize('Admin'), uploadImageSingle('cinema'), createCinema);
cinemaRouter.get('/find-all-cinema', findAllCinema);
cinemaRouter.put('/update-cinema', checkAuth, authorize('Admin'), uploadImageSingle('cinema'), updateCinema);
cinemaRouter.delete('/delete-cinema/:id', checkAuth, authorize('Admin'), deleteCinema)
cinemaRouter.get('/filter-cinema/:id', finAllTimeOfMovie);
module.exports = {
    cinemaRouter
}
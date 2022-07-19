const { Router } = require('express');
const { checkAuth, authorize } = require('../controllers/auth_controller');
const { createCinema, findAllCinema, editCinema, deleteCinema } = require('../controllers/cinema_controller');
const { uploadImageSingle } = require('../helper/upload-file_helper');
const cinemaRouter = Router()

cinemaRouter.post('/create-cinema', checkAuth, authorize('Admin'), uploadImageSingle('cinema'), createCinema);
cinemaRouter.get('/find-all-cinema', findAllCinema);
cinemaRouter.put('/update-cinema', checkAuth, authorize('Admin'), uploadImageSingle('cinema'), editCinema);
cinemaRouter.delete('/delete-cinema/:id', checkAuth, authorize('Admin'), deleteCinema)

module.exports = {
    cinemaRouter
}
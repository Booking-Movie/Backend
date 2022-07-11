const { Router } = require('express');
const { createCinema, findAllCinema, editCinema, deleteCinema } = require('../controllers/cinema_controller');
const { uploadImageSingle } = require('../middleware/uploads');


const cinemaRouter = Router()

cinemaRouter.post('/create-cinema', uploadImageSingle('cinema'), createCinema);
cinemaRouter.get('/find-all-cinema', findAllCinema);
cinemaRouter.put('/edit-cinema', uploadImageSingle('cinema'), editCinema);
cinemaRouter.delete('/:id', deleteCinema)


module.exports = {
    cinemaRouter
}
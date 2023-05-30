const { Router } = require('express');
const { getAllSaleBookingDay, getAllSaleCinemaDay, searchSaleStartDateAndEndDate, getAllTopMovieBooking, getAllSaleMovie, searchSaleMovieStartDateAndEndDate } = require('../controllers/sale_controller');

const saleRouter = Router()


saleRouter.get('/find-all-sale-booking', getAllSaleBookingDay)
saleRouter.post('/find-all-sale', searchSaleStartDateAndEndDate)
saleRouter.get('/find-all-sale-cinema', getAllSaleCinemaDay)
saleRouter.get('/find-all-top-movie-booking', getAllTopMovieBooking)
saleRouter.get('/find-all-sale-movie', getAllSaleMovie)
saleRouter.post('/find-all-sale-movie', searchSaleMovieStartDateAndEndDate)

module.exports = {
    saleRouter
}
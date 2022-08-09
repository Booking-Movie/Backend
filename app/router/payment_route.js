const { Router } = require('express');
const { updateStatusBooking, cancelBookingSeat } = require('../controllers/booking_controller');
const { createPayment } = require('../controllers/payment_controller');

const paymentRouter = Router()

paymentRouter.post('/:user_id', updateStatusBooking)
paymentRouter.put('/cancel-booking', cancelBookingSeat)

module.exports = {
    paymentRouter
}
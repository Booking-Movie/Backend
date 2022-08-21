const { Router } = require('express');
const { updateStatusBooking, cancelBookingSeat } = require('../controllers/booking_controller');
const { createPayment } = require('../controllers/payment_controller');

const paymentRouter = Router()

paymentRouter.put('/', updateStatusBooking)
paymentRouter.post('/create-payment', createPayment)

module.exports = {
    paymentRouter
}
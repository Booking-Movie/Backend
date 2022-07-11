const { Router } = require('express');
const { bookingTicket, getAllBooking } = require('../controllers/booking_controller');

const bookingRouter = Router()

bookingRouter.post("/", bookingTicket)
bookingRouter.get("/:id", getAllBooking)

module.exports = {
    bookingRouter
}
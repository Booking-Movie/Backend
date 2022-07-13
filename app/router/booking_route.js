const { Router } = require('express');
const { bookingTicket, getAllBooking, updateSeatCancelBooking } = require('../controllers/booking_controller');

const bookingRouter = Router()

bookingRouter.post("/", bookingTicket)
bookingRouter.get("/:id", getAllBooking)
bookingRouter.put("/:username", updateSeatCancelBooking)

module.exports = {
    bookingRouter
}
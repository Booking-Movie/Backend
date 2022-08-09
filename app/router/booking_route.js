const { Router } = require('express');
const { bookingTicket, getAllBooking, updateStatusSeatBooking } = require('../controllers/booking_controller');

const bookingRouter = Router()

bookingRouter.post("/booking-ticket", bookingTicket)
bookingRouter.get("/get-all-booking/:id", getAllBooking)
bookingRouter.put("/update-status-seat", updateStatusSeatBooking)

module.exports = {
    bookingRouter
}
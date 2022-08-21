const { Router } = require('express');
const { bookingTicket, getAllBooking, updateStatusSeatBooking, cancelBookingSeat, getAllBookingByUserId, updateStatusBooking } = require('../controllers/booking_controller');
const { createPayment } = require('../controllers/payment_controller');

const bookingRouter = Router()

bookingRouter.post("/booking-ticket", bookingTicket)
bookingRouter.get("/get-all-booking/:id", getAllBooking)
bookingRouter.put("/update-status-seat", [], updateStatusSeatBooking, [], createPayment)
bookingRouter.post('/cancel-booking', cancelBookingSeat)
bookingRouter.get("/get-all-booking-user-id/:id", getAllBookingByUserId)
module.exports = {
    bookingRouter
}
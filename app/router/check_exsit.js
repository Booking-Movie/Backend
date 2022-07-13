const { Router } = require('express');
const { bookingTicket, getAllBooking } = require('../controllers/booking_controller');
const { isUsername } = require('../controllers/check_controller');
const { checkEmail } = require('../controllers/users_controller');
const checkRouter = Router()

checkRouter.get("/email/:email", checkEmail)
checkRouter.get("/username/:username", isUsername)

module.exports = {
    checkRouter
}
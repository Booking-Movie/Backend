const { Router } = require('express');
const { bookingTicket } = require('../controllers/ticket_controller');
const ticketRouter = Router()

ticketRouter.put("/:id", bookingTicket)

module.exports = {
    ticketRouter
}
const { Router } = require('express');
const { getInfoMovie, createSeat } = require('../controllers/movie_controller');
const infoRouter = Router()

infoRouter.get("/:id", getInfoMovie)

module.exports = {
    infoRouter
}
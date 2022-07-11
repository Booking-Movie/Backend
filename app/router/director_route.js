const { Router } = require('express');
const { FindAllDirector } = require('../controllers/director_controller');
const directorRouter = Router()

directorRouter.get("/", FindAllDirector);

module.exports = {
    directorRouter
}
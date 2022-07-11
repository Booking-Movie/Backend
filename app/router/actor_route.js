const { Router } = require('express');
const { FindAllActor, CreateActorDirector } = require('../controllers/actor_controller');
const actorRouter = Router()

actorRouter.get("/", FindAllActor);
actorRouter.post("/", CreateActorDirector)

module.exports = {
    actorRouter
}
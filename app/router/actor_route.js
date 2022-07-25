const { Router } = require('express');
const { FindAllActor, CreateActorDirector, FindAllDirector, FindAllDirectorByMovieId } = require('../controllers/actor_controller');
const { authorize, checkAuth } = require('../controllers/auth_controller');

const actorRouter = Router()

actorRouter.get("/", FindAllActor);
actorRouter.post("/", checkAuth, authorize('Admin'), CreateActorDirector)
actorRouter.get("/director", FindAllDirector);
actorRouter.get("/find-all-director/:id", FindAllDirectorByMovieId);

module.exports = {
    actorRouter
}
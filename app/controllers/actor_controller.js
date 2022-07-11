
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const FindAllActor = async (req, res) => {
    try {
        const ListActor = await models.actor.findAll()
        res.status(200).json(ListActor)
    } catch (error) {
        res.status(500).send(error)
    }
}
const CreateActorDirector = async (req, res) => {
    try {
        const { movie_id, actorList, directorList } = req.body
        actorList.forEach(async (actor) => {
            console.log("🚀 ~ file: actor_controller.js ~ line 23 ~ actorList.forEach ~ actor", actor.value)
            await models.actor_movie.create({
                movie_id: movie_id,
                actor_id: actor.value
            })
        })
        directorList.forEach(async (director) => {
            await models.director_movie.create({
                movie_id: movie_id,
                director_id: director.value
            })
        })
        res.status(200).send({
            message: "Create Actor And Director Success"
        })
    } catch (error) {
        res.status(500).send(error)
    }


}

module.exports = {
    FindAllActor,
    CreateActorDirector
}

const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const FindAllActor = async (req, res) => {
    try {
        const actorList = await models.actor.findAll()
        res.status(200).json(actorList)
    } catch (error) {
        res.status(500).send(error)
    }
}
const CreateActorDirector = async (req, res) => {
    const { movie_id, actorList, directorList } = req.body
    try {
        if (actorList !== '') {
            actorList.forEach(async (actor) => {
                await models.actor_movie.create({
                    movie_id: movie_id,
                    actor_id: actor.value
                })
            })
        }
        if (directorList !== '') {
            directorList.forEach(async (director) => {
                await models.director_movie.create({
                    movie_id: movie_id,
                    director_id: director.value
                })
            })
        }
        res.status(200).send({
            message: "Create Actor And Director Success",
            status_code: 200,
            success: true
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const FindAllDirector = async (req, res) => {
    try {
        const directorList = await models.director.findAll()
        res.status(200).json(directorList)
    } catch (error) {
        res.status(500).send(error)
    }
}

const FindAllDirectorByMovieId = async (req, res) => {
    const { id } = req.params
    try {
        const querySql = `#graphql
        select d.name_director from
        movie as m 
        join  director_movie as dm on m.id = dm.movie_id
        join director as d  on dm.director_id = d.id where m.id = ${id} `;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {

    }
}

module.exports = {
    FindAllActor,
    CreateActorDirector,
    FindAllDirector,
    FindAllDirectorByMovieId
}
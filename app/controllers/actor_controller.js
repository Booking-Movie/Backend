
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
var models = initModels(sequelize)

const FindAllActor = async (req, res) => {
    try {
        const actorList = await models.actor.findAll()
        if (actorList) {
            res.status(200).json(actorList)
        } else {
            res.status(404).json({
                message: 'Not Found!',
                status_code: 404,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const CreateActorDirector = async (req, res) => {
    const { movie_id, actor, director } = req.body
    const arrayActor = actor.split(",") || ''
    const arrayDirector = director.split(",") || ''
    try {

        arrayActor.forEach(async (item) => {
            console.log("🚀 ~ file: actor_controller.js ~ line 37 ~ actorList.forEach ~ actor", item)
            const actorNew = await models.actor.create({
                name_actor: item
            })
            await models.actor_movie.create({
                movie_id: movie_id,
                actor_id: actorNew.id
            })
        })

        if (director !== '') {
            arrayDirector.forEach(async (item) => {
                const directorNew = await models.director.create({
                    name_director: item
                })
                await models.director_movie.create({
                    movie_id: movie_id,
                    director_id: directorNew.id
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
        if (directorList) {
            res.status(200).json(directorList)
        } else {
            res.status(404).json({
                message: "Not Found!",
                status_code: 404,
                success: false
            })
        }
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
        if (results) {
            res.status(200).json(results);
        } else {
            res.status(404).json({
                message: "Not Found",
                status_code: 404,
                success: false
            })
        }
    } catch (error) {

    }
}

module.exports = {
    FindAllActor,
    CreateActorDirector,
    FindAllDirector,
    FindAllDirectorByMovieId
}
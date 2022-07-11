const { Router } = require('express')
const { actorRouter } = require('./actor_route')
const { authRouter } = require('./auth_route')
const { bookingRouter } = require('./booking_route')
const { cinemaRouter } = require('./cinema_route')
const { directorRouter } = require('./director_route')
const { infoRouter } = require('./info_route')
const { movieCinemaRouter } = require('./movie_cinema.route')
const { movieRouter } = require('./movie_route')
const { newsRouter } = require('./news_route')
const { searchRouter } = require('./search_route')
const { showtimeRouter } = require('./showtime_route')
const { ticketRouter } = require('./ticket_route')
const { userRouter } = require('./user_route')

const rootRouter = Router()

rootRouter.use('/users', userRouter)
rootRouter.use('/auth', authRouter)
rootRouter.use('/cinema', cinemaRouter)
rootRouter.use('/movie', movieRouter)
rootRouter.use('/showtime', showtimeRouter)
rootRouter.use('/movie-cinema', movieCinemaRouter)
rootRouter.use('/info-movie', infoRouter)
rootRouter.use('/booking-ticket', ticketRouter)
rootRouter.use('/booking', bookingRouter)
rootRouter.use('/search', searchRouter)
rootRouter.use('/actor', actorRouter)
rootRouter.use('/director', directorRouter)
rootRouter.use('/news', newsRouter)


module.exports = {
    rootRouter
}
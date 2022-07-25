const { Router } = require('express')
const { actorRouter } = require('./actor_route')
const { authRouter } = require('./auth_route')
const { bookingRouter } = require('./booking_route')
const { checkRouter } = require('./check_exsit')
const { cinemaRouter } = require('./cinema_route')
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
rootRouter.use('/booking-ticket', ticketRouter)
rootRouter.use('/booking', bookingRouter)
rootRouter.use('/search', searchRouter)
rootRouter.use('/actor', actorRouter)
rootRouter.use('/news', newsRouter)
rootRouter.use('/check', checkRouter)

module.exports = {
    rootRouter
}
const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)


const bookingTicket = async (req, res) => {
    const { danhSachVe } = req.body
    const { user_id, movie_id, cinema_id, user_booking } = req.body
    try {

        danhSachVe.forEach(async (booking) => {
            await models.seat.update({ status_seat: true, user_booking: user_booking }, { where: { id: booking.id } })
            await models.booking.create({ showtime_id: booking.showtime_id, seat_id: booking.id, name_seat: booking.name_seat, status_seat: true, price: booking.price, user_id: user_id, movie_id: movie_id, cinema_id: cinema_id })
        })
        res.status(200).json(danhSachVe)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllBooking = async (req, res) => {
    const { id } = req.params
    try {
        const querySql = `#graphql
        select sum(b.price) as total, s.id as showtime_id, m.name_movie, u.username, u.phone, u.email, m.image_movie, u.fullname, c.name_cinema,s.start_date, s.time_start, JSON_ARRAYAGG(json_object( 'seat_booking',b.name_seat, 'movie_id', b.movie_id)) as booking_seat
        from cinema as c 
        join booking as b on c.id = b.cinema_id
        join users as u on b.user_id = u.id
        join movie as m on b.movie_id = m.id
        join showtime as s on b.showtime_id = s.id
        where c.id = ${id}  group by s.id order by m.id limit 1`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateSeatCancelBooking = async (req, res) => {
    const { username } = req.params
    try {
        await models.seat.update({
            status_seat: false,
            user_booking: ''
        }, {
            where: {
                user_booking: username
            }
        })
        const findUser = await models.users.findOne({
            where: {
                username: username
            }
        })
        await models.booking.destroy({
            where: {
                user_id: findUser.id
            }
        })
        res.status(200).send({
            message: "Update success"
        })
    } catch (error) {
        res.status(500).send(error)
    }
}
module.exports = {
    bookingTicket,
    getAllBooking,
    updateSeatCancelBooking
}

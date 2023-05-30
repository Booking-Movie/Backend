const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)


const bookingTicket = async (req, res) => {
    const { danhSachVe } = req.body
    const { user_id, movie_id, cinema_id } = req.body
    try {
        danhSachVe.forEach((booking) => {
            // await models.seat.update({ status_seat: true, user_booking: user_booking }, { where: { id: booking.id } })   
            models.booking.create({ showtime_id: booking.showtime_id, seat_id: booking.id, name_seat: booking.name_seat, price: booking.price, user_id: user_id, movie_id: movie_id, cinema_id: cinema_id })
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
         select sum(b.price) as total,m.id as movie_id, c.id as cinema_id, s.id as showtime_id,s.code_theater as code_theater, u.email as user_email, m.name_movie, u.username, u.phone, u.email, m.image_movie, u.fullname, c.name_cinema,s.start_date, s.time_start, JSON_ARRAYAGG(json_object( 'booking_id',b.id,'seat_booking',b.name_seat, 'movie_id', b.movie_id, 'status_seat', b.status_seat,'seat_id', b.seat_id)) as booking_seat
        from cinema as c 
        join booking as b on c.id = b.cinema_id
        join users as u on b.user_id = u.id
        join movie as m on b.movie_id = m.id
        join showtime as s on b.showtime_id = s.id
        where s.id = ${id} and b.status_seat = false  group by c.id order by m.id`;
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
        res.status(500).send(error)
    }
}

const getAllBookingByUserId = async (req, res) => {
    const { id } = req.params
    try {
        const querySql = `#graphql
        select sum(b.price) as total, s.code_theater as code_theater,m.id as movie_id, m.name_movie, u.username, c.name_cinema,s.start_date, s.time_start, JSON_ARRAYAGG(json_object( 'booking_id',b.id,'seat_booking',b.name_seat, 'movie_id', b.movie_id, 'status_seat', b.status_seat,'seat_id', b.seat_id)) as booking_seat
        from users as u 
        join booking as b on u.id = b.user_id
        join cinema as c on b.cinema_id = c.id
        join movie as m on b.movie_id = m.id
        join showtime as s on b.showtime_id = s.id
        where u.id = ${id} and m.id = b.movie_id  group by s.id`;
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
        res.status(500).send(error)
    }
}

const updateStatusSeatBooking = async (req, res, next) => {
    const { booking_seat, user_booking, data } = req.body
    try {
        if (booking_seat !== '') {
            booking_seat.forEach(async (seat) => {
                await models.seat.update({
                    status_seat: true,
                    user_booking: user_booking,
                }, {
                    where: {
                        id: seat.seat_id
                    }
                })
            })
            next()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateStatusBooking = async (req, res, next) => {
    const { user_id } = req.body
    try {
        const querySql = `#graphql
        update booking set status_seat=true, price=0 where user_id = ${user_id}`;
        await sequelize.query(querySql)
    } catch (error) {
        res.status(500).send(error)
    }
}

const cancelBookingSeat = async (req, res) => {
    try {
        req.body.forEach(async (booking) => {
            await models.booking.destroy({
                where: {
                    seat_id: booking.seat_id
                }
            })
        })
        res.status(200).send({
            message: "Update Cancel Success"
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    bookingTicket,
    getAllBooking,
    updateStatusSeatBooking,
    updateStatusBooking,
    cancelBookingSeat,
    getAllBookingByUserId
}

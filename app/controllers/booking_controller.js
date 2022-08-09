const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)


const bookingTicket = async (req, res) => {
    const { danhSachVe } = req.body
    const { user_id, movie_id, cinema_id } = req.body
    try {

        danhSachVe.forEach(async (booking) => {
            // await models.seat.update({ status_seat: true, user_booking: user_booking }, { where: { id: booking.id } })
            await models.booking.create({ showtime_id: booking.showtime_id, seat_id: booking.id, name_seat: booking.name_seat, price: booking.price, user_id: user_id, movie_id: movie_id, cinema_id: cinema_id })
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
        select sum(b.price) as total,m.id as movie_id, s.id as showtime_id,s.code_theater as code_theater, u.email as user_email, m.name_movie, u.username, u.phone, u.email, m.image_movie, u.fullname, c.name_cinema,s.start_date, s.time_start, JSON_ARRAYAGG(json_object( 'booking_id',b.id,'seat_booking',b.name_seat, 'movie_id', b.movie_id, 'status_seat', b.status_seat,'seat_id', b.seat_id)) as booking_seat
        from cinema as c 
        join booking as b on c.id = b.cinema_id
        join users as u on b.user_id = u.id
        join movie as m on b.movie_id = m.id
        join showtime as s on b.showtime_id = s.id
        where s.id = ${id} and b.status_seat = false  group by s.id order by m.id`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}


const updateStatusSeatBooking = async (req, res) => {
    const { booking_seat, user_booking, data } = req.body
    console.log("🚀 ~ file: booking_controller.js ~ line 42 ~ updateStatusSeatBooking ~ req.body", data.id)
    try {
        if (booking_seat !== '') {
            await booking_seat.forEach(async (seat) => {
                await models.seat.update({
                    status_seat: true,
                    user_booking: user_booking,
                }, {
                    where: {
                        id: seat.seat_id
                    }
                })
            })
        }

        res.status(200).send({
            data: data,
            message: "Update success"
        })
    } catch (error) {
        res.status(500).send(error)
    }
}

const updateStatusBooking = async (req, res) => {
    const { user_id } = req.params
    console.log("🚀 ~ file: booking_controller.js ~ line 69 ~ updateStatusBooking ~ user_id", user_id)
    try {
        const querySql = `#graphql
        update booking set status_seat=true, price=0 where user_id = ${user_id}`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send(error)
    }
}

const cancelBookingSeat = async (req, res) => {
    try {
        req.body.forEach(async (booking) => {
            await models.booking.destroy({
                where: {
                    id: booking.booking_id
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
    cancelBookingSeat
}

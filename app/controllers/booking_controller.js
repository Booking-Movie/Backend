const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)


const bookingTicket = async (req, res) => {
    try {
        const { danhSachVe } = req.body
        const { user_id, movie_id, cinema_id, user_booking, showtime_id } = req.body

        danhSachVe.forEach((booking) => {
            const newInfo = models.seat.update({ status_seat: true, user_booking: user_booking }, { where: { id: booking.id } })
            const newSeat = models.booking.create({ showtime_id: booking.showtime_id, seat_id: booking.id, name_seat: booking.name_seat, status_seat: true, price: booking.price, user_id: user_id, movie_id: movie_id, cinema_id: cinema_id })
        })
        res.status(200).send(danhSachVe)
    } catch (error) {
        res.status(500).send(error)
    }
}

const getAllBooking = async (req, res) => {
    try {
        const { id } = req.params
        const querySql = `
       select sum(b.price) as total, m.name_movie, u.username, u.phone, u.email, m.image_movie, u.fullname, c.name_cinema,s.start_date, s.time_start, JSON_ARRAYAGG(json_object( 'seat_booking',b.name_seat, 'movie_id', b.movie_id)) as booking_seat
       from cinema as c 
       join booking as b on c.id = b.cinema_id
       join users as u on b.user_id = u.id
       join movie as m on b.movie_id = m.id
       join showtime as s on b.showtime_id = s.id
     where c.id = ${id}  group by s.id order by m.id limit 1`;
        const [results] = await sequelize.query(querySql)
        res.status(200).json(results);
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    bookingTicket,
    getAllBooking
}

//  select   m.name_movie, u.username, u.phone, u.email, m.image_movie, u.fullname, s.start_date, s.time_start, c.name_cinema, JSON_ARRAYAGG(json_object('id', b.id, 'seat_booking', b.name_seat, 'total', SUM(b.price))) as booking_seat
//     from users as u
//     join booking as b on u.id = b.user_id
//     join movie as m on b.movie_id = m.id
//     join cinema as c on b.cinema_id = c.id
//     join showtime as s on c.id = s.cinema_id
//     where c.id = ${ id } group by b.id order by b.name_seat
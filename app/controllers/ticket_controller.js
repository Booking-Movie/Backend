const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)


const bookingTicket = (req, res) => {
    try {
        const { id } = req.params
        const { name_seat, price, showtime_id } = req.body
        const setStatus = models.seat.update({
            status_seat: true,
            name_seat: name_seat,
            price: price,
            showtime_id: showtime_id
        },
            {
                where: {
                    id
                }
            }
        )
        res.status(200).status(setStatus)
    } catch (error) {

    }
}

module.exports = {
    bookingTicket
}
const createPayment = async (req, res) => {
    const { username } = req.params
    try {
        await models.seat.update({
            status_seat: true,
            user_booking: ''
        }, {
            where: {
                user_booking: username
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
    createPayment
}
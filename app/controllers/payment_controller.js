const { sequelize } = require('../config/db_connect');
const initModels = require('../models/init-models');
const models = initModels(sequelize)

const createPayment = async (req, res) => {
    const { user_id, data, total } = req.body
    console.log("🚀 ~ file: payment_controller.js ~ line 7 ~ createPayment ~ req.body", req.body)
    try {
        const payment = await models.payment.create({
            amount: total,
            timetamp: data.create_time,
            transactionId: data.id,
            status_payment: data.status,
            user_id: user_id
        })
        console.log("🚀 ~ file: payment_controller.js ~ line 16 ~ createPayment ~ payment", payment)
        res.status(200).json({
            data: payment,
            message: "Create Payment Success",
            status_code: 200,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createPayment
}
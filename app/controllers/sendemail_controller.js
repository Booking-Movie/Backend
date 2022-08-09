const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {

    try {
        const { email, booking_seat, user_booking, name_movie, name_cinema, time_start, start_date, code_theater } = req.body
        const { id, status } = req.body.data
        const transporter = nodemailer.createTransport({
            service: "gmail",
            // sendmail: true,
            auth: {
                user: "giahuy231997@gmail.com",
                pass: "bnkgaxibkeranypo",
            },
            tls: { rejectUnauthorized: false },
        });

        booking_seat.forEach((seat) => {
            console.log("🚀 ~ file: sendemail_controller.js ~ line 19 ~ content ~ seat", seat.seat_booking)
            transporter.sendMail({
                from: 'giahuy231997@gmail.com', // sender address
                to: email, // list of receivers
                subject: `Hi, ${user_booking}`, // Subject line
                text: `Your ticket has been generated and sent to your email`, // plain text body
                html: `<div><h1>Booking Confirmation</h1></div><p>Movie Name: <b>${name_movie}</b></p><p>Show Date And Time: <b>${start_date} - ${time_start} - ${code_theater}</b></p><p>Location: <b>${name_cinema} </b></p><p>Booking Seat: <b>${seat.seat_booking},</b></p> <p>Payment Status: <b>${status}</b> <p>Payment ID: <b>${id}</b></p>`, // html body // html body
            }, (err) => {
                if (err) {
                    return res.json({
                        message: "Send Email Fail",
                        err
                    })
                }
                return res.json({
                    message: `Send Email Success With Account ${req.body[0].email}`
                })
            });
        })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    sendEmail
}
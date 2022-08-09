const { Router } = require('express');
const { sendEmail } = require('../controllers/sendemail_controller');

const sendEmailRouter = Router()


sendEmailRouter.post('/', sendEmail)


module.exports = {
    sendEmailRouter
}
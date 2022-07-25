const { Router } = require('express');
const { checkExistEmail, checkExistUsername } = require('../controllers/check_controller');
const { } = require('../controllers/users_controller')

const checkRouter = Router()

checkRouter.get("/email/:email", checkExistEmail)
checkRouter.get("/username/:username", checkExistUsername)

module.exports = {
    checkRouter
}
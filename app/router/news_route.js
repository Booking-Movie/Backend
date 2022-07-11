const { Router } = require('express');
const { CreateNew, GetAllNew, UpdateNew, DeleteNew } = require('../controllers/new_controller');
const { uploadImageSingle } = require('../middleware/uploads');
const newsRouter = Router()

newsRouter.get('/', GetAllNew)
newsRouter.post('/create-new', uploadImageSingle('news'), CreateNew)
newsRouter.put('/update-new', uploadImageSingle('news'), UpdateNew)
newsRouter.delete('/delete-new/:new_id', DeleteNew)

module.exports = {
    newsRouter
}
const { Router } = require('express');
const { checkAuth, authorize } = require('../controllers/auth_controller');
const { CreateNew, GetAllNew, UpdateNew, DeleteNew } = require('../controllers/new_controller');
const { uploadImageSingle } = require('../helper/upload-file_helper');

const newsRouter = Router()

newsRouter.get('/', GetAllNew)
newsRouter.post('/create-new', checkAuth, authorize('Admin'), uploadImageSingle('news'), CreateNew)
newsRouter.put('/update-new', checkAuth, authorize('Admin'), uploadImageSingle('news'), UpdateNew)
newsRouter.delete('/delete-new/:new_id', checkAuth, authorize('Admin'), DeleteNew)

module.exports = {
    newsRouter
}
const { Router } = require('express');
const { checkAuth, authorize } = require('../controllers/auth_controller');
const { getAllNew, createNew, updateNew, deleteNew } = require('../controllers/new_controller');
const { uploadImageSingle } = require('../helper/upload-file_helper');

const newsRouter = Router()

newsRouter.get('/', getAllNew)
newsRouter.post('/create-new', checkAuth, authorize('Admin'), uploadImageSingle('news'), createNew)
newsRouter.put('/update-new', checkAuth, authorize('Admin'), uploadImageSingle('news'), updateNew)
newsRouter.delete('/delete-new/:new_id', checkAuth, authorize('Admin'), deleteNew)

module.exports = {
    newsRouter
}
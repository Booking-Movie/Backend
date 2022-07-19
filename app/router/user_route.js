const { Router } = require('express')
const { checkAuth, authorize } = require('../controllers/auth_controller')
const { findAllUser, createUser, uploadAvatar, findDetailUser, editUser, deleteUser, checkEmail } = require('../controllers/users_controller')
const { uploadImageSingle } = require('../helper/upload-file_helper')
const userRouter = Router()

userRouter.post('/create-user', checkAuth, authorize('Admin'), uploadImageSingle("avatar"), createUser)
userRouter.get('/find-all-users', findAllUser)
userRouter.post('/upload-avatar', checkAuth, uploadImageSingle("avatar"), uploadAvatar)
userRouter.get('/detail/:id', [], findDetailUser)
userRouter.put("/update-user", checkAuth, authorize('Admin'), uploadImageSingle("avatar"), editUser)
userRouter.delete("/delete-user/:id", checkAuth, authorize('Admin'), deleteUser)

module.exports = {
    userRouter
}
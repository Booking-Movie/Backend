const { Router } = require('express')
const { checkAuth, authorize } = require('../controllers/auth_controller')
const { findAllUser, createUser, findDetailUser, deleteUser, updateUser } = require('../controllers/users_controller')
const { uploadImageSingle } = require('../helper/upload-file_helper')

const userRouter = Router()

userRouter.post('/create-user', checkAuth, authorize('Admin'), uploadImageSingle("avatar"), createUser)
userRouter.get('/find-all-users', findAllUser)
userRouter.get('/detail/:id', [], findDetailUser)
userRouter.put("/update-user", checkAuth, authorize('Admin'), uploadImageSingle("avatar"), updateUser)
userRouter.delete('/delete-user/:id', checkAuth, authorize('Admin'), deleteUser)

module.exports = {
    userRouter
}
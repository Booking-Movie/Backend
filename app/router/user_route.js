const { Router } = require('express')
const { findAllUser, createUser, uploadAvatar, findDetailUser, editUser, deleteUser, checkEmail } = require('../controllers/users_controller')
const { uploadImageSingle } = require('../middleware/uploads')


const userRouter = Router()

userRouter.post('/', uploadImageSingle("avatar"), createUser)
userRouter.get('/find-all-users', findAllUser)
userRouter.post('/upload-avatar', uploadImageSingle("avatar"), uploadAvatar)
userRouter.get('/:id', [], findDetailUser)
userRouter.put("/", uploadImageSingle("avatar"), editUser)
userRouter.delete("/:id", deleteUser)
// userRouter.post("/:email", checkEmail)

module.exports = {
    userRouter
}
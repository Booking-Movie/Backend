const { Router } = require('express');
const { signIn, signUp, checkAuth } = require('../controllers/auth_controller');
const { uploadImageSingle } = require('../helper/upload-file_helper');

const authRouter = Router()

authRouter.post("/signin", signIn);
authRouter.post("/signup", uploadImageSingle("avatar"), signUp);

module.exports = {
    authRouter
}
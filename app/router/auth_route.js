const { Router } = require('express');
const { signIn, signUp } = require('../controllers/auth_controller');
const { uploadImageSingle } = require('../middleware/uploads');
const { authenticate } = require('../middleware/validation/auth');
const authRouter = Router()

authRouter.post("/signin", signIn, authenticate);
authRouter.post("/signup", uploadImageSingle("avatar"), signUp);

module.exports = {
    authRouter
}
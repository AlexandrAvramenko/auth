const Router = require("express")
const router = new Router()
const controller = require("../controllers/user-controller")
const {
    body
} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post("/sign-up",
    body('text').isEmpty(),
    body('text').isEmpty(),
    body('email').isEmail(),
    body('password').isLength({
        min: 3,
        max: 22
    }), controller.signUp)
router.post("/sign-in", controller.signIn)
router.post("/sign-out", controller.signOut)
router.get("/refresh", controller.refresh)
router.get("/users", authMiddleware, controller.getUsers)

module.exports = router
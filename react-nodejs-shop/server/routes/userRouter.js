const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/register',UserController.registration)
router.post('/login', UserController.login)
router.get('/check',authMiddleware, UserController.checkAuth)
router.get('/changeRole',authMiddleware, UserController.changeRole)

module.exports = router
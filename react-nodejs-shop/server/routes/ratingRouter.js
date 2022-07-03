const Router = require('express')
const router = new Router()
const ratingController = require('../controllers/ratingController')
const authMiddleware = require("../middleware/authMiddleware");

router.post('/set', authMiddleware, ratingController.set)



module.exports = router
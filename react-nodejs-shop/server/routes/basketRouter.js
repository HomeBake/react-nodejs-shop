const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware")

router.post('/add/', authMiddleware, basketController.add)
router.get('/', authMiddleware, basketController.get)
router.delete('/delete', authMiddleware, basketController.delete)

module.exports = router
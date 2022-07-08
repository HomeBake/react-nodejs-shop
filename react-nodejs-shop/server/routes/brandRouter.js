const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add',authMiddleware, roleMiddleware('ADMIN'), brandController.add)
router.get('/', brandController.get)
router.delete('/delete',authMiddleware, roleMiddleware('ADMIN'), brandController.delete)

module.exports = router
const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/add', roleMiddleware('ADMIN'), brandController.add)
router.get('/', brandController.get)
router.delete('/delete', roleMiddleware('ADMIN'), brandController.delete)

module.exports = router
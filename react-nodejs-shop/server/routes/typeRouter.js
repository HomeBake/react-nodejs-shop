const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/add', roleMiddleware('ADMIN'), typeController.add)
router.get('/', typeController.get)
router.delete('/delete/', roleMiddleware('ADMIN'), typeController.delete)

module.exports = router
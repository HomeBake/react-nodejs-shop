const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add',authMiddleware, roleMiddleware('ADMIN'), typeController.add)
router.get('/', typeController.get)
router.delete('/delete/',authMiddleware, roleMiddleware('ADMIN'), typeController.delete)

module.exports = router
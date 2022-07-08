const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const roleMiddleware = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/authMiddleware");

router.post('/add',authMiddleware, roleMiddleware('ADMIN'), deviceController.add)
router.delete('/delete',authMiddleware, roleMiddleware('ADMIN'), deviceController.delete)
router.get('/', deviceController.get)
router.get('/:id', deviceController.getOne)

module.exports = router
const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const roleMiddleware = require("../middleware/roleMiddleware");

router.post('/add', roleMiddleware('ADMIN'), deviceController.add)
router.delete('/delete', roleMiddleware('ADMIN'), deviceController.delete)
router.get('/', deviceController.get)
router.get('/:id', deviceController.getOne)

module.exports = router
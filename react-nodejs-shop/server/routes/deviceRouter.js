const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')

router.post('/add', deviceController.add)
router.delete('/delete', deviceController.delete)
router.get('/', deviceController.get)
router.get('/:id', deviceController.getOne)

module.exports = router
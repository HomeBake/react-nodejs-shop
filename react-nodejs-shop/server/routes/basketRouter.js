const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')

router.post('/add', basketController.add)
router.get('/', basketController.get)
router.delete('/delete', basketController.delete)

module.exports = router
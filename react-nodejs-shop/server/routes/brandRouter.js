const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')

router.post('/add', brandController.add)
router.get('/', brandController.get)
router.delete('/delete', brandController.delete)

module.exports = router
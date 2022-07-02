const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')

router.post('/add', typeController.add)
router.get('/', typeController.get)
router.delete('/delete/', typeController.delete)

module.exports = router
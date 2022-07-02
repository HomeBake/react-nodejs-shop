const Router = require('express')
const router = new Router()

router.post('/add')
router.delete('/delete/:id')
router.get('/')
router.get('/:id')

module.exports = router
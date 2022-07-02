const Router = require('express')
const router = new Router()

router.post('/register')
router.post('/login')
router.get('/auth')

module.exports = router
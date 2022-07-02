const Router = require('express')
const router = new Router()

router.post('/add/:deviceId')
router.get('/')
router.delete('/delete/:deviceId')

module.exports = router
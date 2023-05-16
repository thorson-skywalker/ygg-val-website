const router = require('express').Router()
const apiRoutes = require('./api/sign_up.js')
const clientRoutes = require('./client/index.js')

router.use('/api', apiRoutes)
router.use('/', clientRoutes)

module.exports = router;
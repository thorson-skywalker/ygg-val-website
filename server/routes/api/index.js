const router = require('express').Router()
const userRoutes = require('./users.js')

router.use('/users', userRoutes)

module.exports = router;
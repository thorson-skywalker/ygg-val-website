const router = require('express').Router()
const { sign_up } = require('../../controllers/sign_up.js')

// first parameter declares url path, second parameter implements check method, third parameter installs api function call
router.post('/sign_up', sign_up)

module.exports = router;
const router = require('express').Router()
const { sign_up, delete_user } = require('../../controllers/sign_up.js')

// first parameter declares url path, second parameter implements check method, third parameter installs api function call
router.post('/sign_up', sign_up)
router.delete('/delete_user', delete_user)

module.exports = router;
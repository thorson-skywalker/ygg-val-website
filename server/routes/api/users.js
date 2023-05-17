const router = require('express').Router()
const { sign_up, delete_user, login_in, find_all_users } = require('../../controllers/user_controllers.js')

// first parameter declares url path, second parameter implements check method, third parameter installs api function call\
router.get('/find_all_users', find_all_users)
router.post('/sign_up', sign_up)
router.post('/login', login_in)
router.delete('/delete_user', delete_user)

module.exports = router;
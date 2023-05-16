// dependencies for encryption
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
//import queries for Users model
const { sign_up_query } = require('../models/Users.js')

// functions (controllers) which will be exported to their respected routes
exports.sign_up = (req, res) => {
      const { username, password } = req.body

      if(!username || !password) {
            return res.status(422).json({
                  error: "Sign up unsuccessful. Valid data not recieved from request."
            })
      } 

      // using dependencies to encrypt the received password value
      const salt = uuidv4()
      const encryption = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString('hex')

      sign_up_query(username, password, encryption)
      .then(results => {
            if(results === 'user successfully created') {
                  return res.status(201).json({ message: "Account successfully created"})
            } else {
                  return res.status(400).json({ message: "Error in creating account"})
            }
      })
}
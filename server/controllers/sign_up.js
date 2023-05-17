// dependencies for encryption
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
//import queries for Users model
const { sign_up_query, delete_user_query, login_in_query } = require('../models/Users.js')

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
            if(results) {
                  return res.status(201).json({ message: "Account successfully created"})
            } else {
                  return res.status(400).json({ message: "Error in creating account"})
            }
      })
}

exports.delete_user = (req, res) => {
      const { username } = req.body
      
      if(!username) {
            return res.status(422).json({
                  error: 'Deletion attempt unsuccessful. No username provided'
            })
      }

      delete_user_query(username)
      .then(results => {
            res.status(201).json({ message: "user deleted" })
            return
      })
      .catch(err => {
            console.error("Error with deletion attempt on controller with error: " + err)
      })
}
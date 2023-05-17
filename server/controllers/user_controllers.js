// dependencies for encryption
const { v4: uuidv4 } = require('uuid')
const crypto = require('crypto')
//import queries for Users model
const { sign_up_query, delete_user_query, login_in_query, find_all_users_query } = require('../models/Users.js')

// functions (controllers) which will be exported to their respected routes
exports.find_all_users = (req, res) => {
      find_all_users_query()
            .then(results => {
                  res.json({
                        message: "All users found",
                        results: results
                  })
            })
            .catch(err => {
                  console.error('Error on find-all controller with error: ' + err)

                  return "Error with find-all controller with error: " + err
            })
}

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
                  return res.status(201).json({ 
                        message: "Account successfully created",
                        results: results
                  })
            } else {
                  return res.status(400).json({ message: "Error in creating account"})
            }
      })
      .catch(err => {
            console.error('Error with sign up controller: ' + err)

            res.json({ message: "Error with sign up controller: " + err})
      })
}

exports.login_in = (req, res) => {
      const { username, password } = req.body
      
      if(!username || !password) {
            return res.status(422).json({ message: "insufficient data recieved from client"})
      }

      login_in_query(username, password)
            .then(results => {
                  if(results) {
                        res.status(200).json({ 
                              message: "User logged in",
                              logged_in_user: results
                        })
                  } else {
                        res.status(401).json({ message: "Unauthorized access"})
                  }
            })
            .catch(err => {
                  console.error('Error with login request controller with error: ' + err)

                  res.json({ message: "Error with login controller: " + err})
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
      .then(() => {
            res.status(201).json({ message: "user deleted" })
            return
      })
      .catch(err => {
            console.error("Error with deletion attempt on controller with error: " + err)

            res.json({ message: "Error with delete controller: " + err})
      })
}
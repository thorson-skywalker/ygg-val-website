const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection.js')

const users = sequelize.define('Users',
      {
            username: {
                  type: DataTypes.STRING(50),
                  allowNull: false,
                  unique: true
            },
            password: {
                  type: DataTypes.STRING(255),
                  allowNull: false
            },
            salt: {
                  type: DataTypes.STRING(100),
                  allowNull: false
            }
})

// write queries to Users table below
const sign_up_query = (username, password, salt) => {
      return users.create({
            username: username,
            password: password,
            salt: salt
      })
            .then((results) => {
                  return results.json()
            })
            .catch(err => {
                  console.error('sign up attempt failed with error: ' + err)
            })
}

const login_in_query = (username, password, salt) => {
      return users.findOne({
            where: {
                  username: username,
                  password: password,
                  salt: salt
            }
      })
            .then(results => {
                  if(!results) {
                        return 'Invalid login data'
                  }

                  return results.json({ message: `${username} logged in`})
            })
            .catch(err => {
                  console.error('Error with login query with error: ' + err)
            })
}

const delete_user_query = (username) => {
      return users.destroy({
            where: {
                  username: username
            }
      })
            .then((results) => {
                  return results.json({
                        message: "user destroyed"
                  })
            })
            .catch(err => {
                  console.error('Delete attempt unsuccesful with error: ' + err)
            })
}

module.exports = { users, sign_up_query, delete_user_query, login_in_query };
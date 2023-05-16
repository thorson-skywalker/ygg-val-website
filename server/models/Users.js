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
      users.create({
            username: username,
            password: password,
            salt: salt
      })
            .then(() => {
                  return 'user sucessfully created'
            })
            .catch(err => {
                  console.error('sign up attempt failed with error: ' + err)
            })
}

module.exports = { users, sign_up_query };
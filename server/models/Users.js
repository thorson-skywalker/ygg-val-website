const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection.js')

class Users extends Model {
      // hooks can be written here
      // see cchester11 github repo Just Tech News for examples
}

Users.init(
      {
            username: {
                  type: DataTypes.STRING(50),
                  allowNull: false
            },
            password: {
                  type: DataTypes.STRING(255),
                  allowNull: false
            },
            salt: {
                  type: DataTypes.STRING(100),
                  allowNull: false
            }
      },
      {
            sequelize,
            modelName: 'Users',
            underscored: true
      }
)

// write queries to Users table below
const sign_up_query = (username, password, salt) => {
      Users.create({
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

module.exports = { Users, sign_up_query };
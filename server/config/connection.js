// dotenv dependency loads env variables
// sequelize dependency compiles connection code for backend connection to db
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

// env variables loaded
dotenv.config();

// stage allocation for sequelize variable
let sequelize;

// conditional use of sequelize variable and subsequent db connection according to env variables loaded
if (process.env.NODE_ENV === 'local') {
      sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
            host: 'localhost',
            dialect: 'mysql',
            define: {
                  freezeTableName: true,
                  timestamps: true
            }
      })

      console.log('connected to local db')
} else {
      console.error('server error at db connection time in connection file')
}

exports.sequelize = sequelize;
exports.connection = () => {
      sequelize.authenticate()
      .then(() => {
            console.log('Authenticating..')
      })
      .catch(err => {
            console.log('Error while authenticating db connection')
            console.error(err)
      })
}
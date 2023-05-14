const dotenv = require('dotenv');
const Sequelize = require('sequelize');
const { SELECT } = require('sequelize/types/query-types');

dotenv.config()

let sequelize;

if(process.env.NODE_ENV === 'local') {
      sequelize = new Sequelize(proces.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
            host: 'localhost',
            dialect: 'mysql',
            define: {
                  freezeTableName: true,
                  timestamps: true
            }
      })
}
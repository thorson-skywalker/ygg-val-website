const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

let sequelize = function (node_env) {
      if(node_env === 'local') {
            sequelize = new Sequelize(proces.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
                  host: 'localhost',
                  dialect: 'mysql',
                  define: {
                        freezeTableName: true,
                        timestamps: true
                  }
            })
      } else {
            console.error('new error')
      }
};
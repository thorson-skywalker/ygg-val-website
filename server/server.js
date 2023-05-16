// server dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv')
dotenv.config()
const sequelize = require('./config/connection.js')
const PORT = process.env.PORT
const path = require('path')

// middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(require('./routes'))

// authentication
sequelize.connection()
// connect to db and serve site to browser
sequelize.sequelize.sync({
    force: false
})
    .then(() => {
        if (process.env.NODE_ENV === 'local') {
            app.listen(4001, () => {
                console.log('running locally on PORT 4001')
            })
        } else {
            console.error('server error at runtime')
        }
    })
    .catch(err => {
        if (err) {
            throw new Error(err)
        }
    })
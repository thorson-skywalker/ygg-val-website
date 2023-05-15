// server dependency and initiation of express dependency
const express = require('express')
const app = express()

// dotenv dependency for loading env variables and load of env variables subsequently
const dotenv = require('dotenv')
dotenv.config()

// import db connection file
const sequelize = require('./config/connection.js')

// if a web service is not found, app will run locally on PORT 4001 @ (localhost:4001)
const PORT = process.env.PORT

// library used to write paths to below files in below routes
const path = require('path')

// static routes to frontend html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/layouts/home.html'))
});
app.get('/api/heroimage', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/assets/images/hero_2.jpeg'))
})

sequelize.connection()
// written to finally run express and recieve a callback
sequelize.sequelize.sync()
.then(() => {
    if(process.env.NODE_ENV==='local') {
        app.listen(4001, () => {
            console.log('running locally on PORT 4001')
        })
    } else {
        console.error('server error at runtime')
    }
})
.catch(err => {
    if(err) {
        throw new Error(err)
    }
})
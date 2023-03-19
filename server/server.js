// server dependencies
const express = require('express')
const path = require('path')

// initiate instance of express
const app = express()
// if a web service is not found, app will run locally on PORT 4001 @ (localhost:4001)
const PORT = process.env.PORT || 4001;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/layouts/home.html'))
});

// written to finally run express and recieve a callback
app.listen(PORT, () => console.log('App listening on PORT ' + PORT));
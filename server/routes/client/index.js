// importing express routing library in order to serve html templates to the browser
const router = require('express').Router()
// library used to write paths to below files in below routes
const path = require('path')

// static routes to frontend html
router.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../../../client/layouts/home.html'))
});
router.get('/api/heroimage', (req, res) => {
      res.sendFile(path.join(__dirname, '../../../client/assets/images/hero_2.jpeg'))
})

module.exports = router;
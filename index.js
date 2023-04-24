const mongoose = require('mongoose')
require('dotenv').config()
const express = require('express')
const ServiceRoute = require('./Routes/service.route')
const BlogRoute = require('./Routes/blog.route')
const UserRoute = require('./Routes/user.route')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 4000
const path = require('path')
var crypto = require('crypto');

const app = express()
app.use(express.json())
app.use(bodyParser.text({ type: '/' }));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
mongoose.connect(process.env.DB_URL).then(
    (res) => {
        console.log('db is connetct')
        app.use('/services', ServiceRoute)
        app.use('/users', UserRoute)
        app.use('/blogs', BlogRoute)

    }
).catch(err => console.dir(err))

app.get('/', (req, res) => {
    crypto.randomBytes(2, function (err, buffer) {
        console.log(parseInt(buffer.toString('hex'), 16))
        res.send('helo');
    });

   
}) 
app.listen(PORT, (error) => {
    console.log('server listening')
})
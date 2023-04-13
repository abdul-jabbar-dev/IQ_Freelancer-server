require('dotenv').config()
const express = require('express')
const ServiceRoute = require('./Routes/service.route')
const BlogRoute = require('./Routes/blog.route')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000

const app = express()
app.use(express.json())

mongoose.connect(process.env.DB_URL).then(
    (res) => {
        console.log('db is connetct')

        app.use('/services', ServiceRoute)
        app.use('/blogs', BlogRoute)

    }
).catch(err => console.dir(err))

app.get('/', (req, res) => {
    res.send('Home')
})




app.listen(PORT, (error) => {
    console.log('server listening')
})
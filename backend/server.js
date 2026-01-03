require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const workoutRoutes = require('./routes/workouts') // import the router
const userRoutes = require('./routes/user')

// express app
const app = express()

// Middleware
app.use(express.json()); // to use req.body

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// Routes
app.use('/api/workouts', workoutRoutes) // uses routes defined in workouts
app.use('/api/user', userRoutes) // uses routes defined in user

// Connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Listen for requests
        app.listen(process.env.PORT, () => {
            console.log("connected to DB and the server is running on port", process.env.PORT)
        })
    })
    .catch((err) => console.log(err))

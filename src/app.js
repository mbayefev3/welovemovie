if (process.env.USER) require("dotenv").config();
const express = require("express");
const moviesRoute = require("./movies/movies.route")
const app = express();
app.use(express.json())

app.use("/movies", moviesRoute)





app.use((req, res, next) => {
    next({
        status: 404,
        message: 'page not found!'
    })
})


app.use((err, req, res, next) => {

    const { status, message } = err
    res.status(status).json({ error: message })
})
module.exports = app;

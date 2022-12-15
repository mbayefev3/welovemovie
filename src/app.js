if (process.env.USER) require("dotenv").config();
const express = require("express");
const moviesRoute = require("./movies/movies.route")
const reviewsRoute = require("./reviews/reviews.route")
const theatersRoute = require("./theaters/theater.route")
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json())

app.use("/movies", moviesRoute)

app.use("/reviews", reviewsRoute)

app.use("/theaters", theatersRoute)

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

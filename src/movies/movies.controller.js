const services = require("./movies.service")

async function listMovies(req, res) {

    const { is_showing } = req.query
    if (is_showing) {


        const movies = await services.moviesCurrentlyInTheaters(true)
        return res.status(200).json({
            data: movies
        })
    }

    const movies = await services.listMovies()

    res.status(200).json({
        data: movies
    })

}


async function movieIdExists(req, res, next) {
    const { movieId } = req.params
    const movie = await services.readMovie(Number(movieId))

    if (movie) {
        res.locals.movie = movie
        return next()
    }
    next({
        status: 404,
        message: "Movie cannot be found."
    })


    // "error": "Movie cannot be found."
    // res.status(404).send({
    //     error: `cannot access route with given id ${movie}`
    // })
}



async function listTheaters(req, res) {
    const { movie: { movie_id } } = res.locals

    const theaters = await services.listTheaters(movie_id)
    res.status(200).json({
        data: theaters
    })

}
async function readMovie(req, res) {
    const { movie } = res.locals
    res.status(200).json({
        data: movie
    })

}


async function listReviews(req, res) {
    const { movie: { movie_id } } = res.locals

    const reviews = await services.listReviews(movie_id)
    res.status(200).json({
        data: reviews
    })
}

module.exports = {
    listMovies,
    readMovie: [movieIdExists, readMovie],
    listTheaters: [movieIdExists, listTheaters],
    listReviews: [movieIdExists, listReviews]
}
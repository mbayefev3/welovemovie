const services = require("./theater.service")


async function listMoviesInEachTheaters(req, res) {
    const theathersAndMovies = await services.listMoviesInEachTheaters()

    res.status(200).json({
        data: theathersAndMovies
    })
}



module.exports = {
    listMoviesInEachTheaters
}
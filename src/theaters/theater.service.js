const db = require("../db/connection")


// This route should return all the theaters and, the movies playing at each theatre added to the movies key. This means you will need to check the movies_theaters table.

// The response from the server should look like the following.




async function listMoviesInEachTheaters() {

    const theaters = await db("theaters").select("*")

    const movies = await db("theaters as t").join("movies_theaters as mt", "t.theater_id", "mt.theater_id").join("movies as m", "mt.movie_id", "m.movie_id").distinct("m.*", "mt.*")

    const moviesInTheaters = theaters.map(theater => {
        const { theater_id } = theater
        const filteredMovies = movies.filter(movie => {
            const { theater_id: id } = movie
            return theater_id === id
        })
        return {
            ...theater
            , movies: filteredMovies
        }
    })
    return moviesInTheaters
}




module.exports = { listMoviesInEachTheaters }
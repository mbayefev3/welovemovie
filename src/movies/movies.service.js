const db = require("../db/connection")

function listMovies() {
    // this will retrieve the list of all movies
    return db("movies").select("*")
}


function readMovie(movieId) {

    return db("movies").select("*").where({ movie_id: movieId }).first()
}

async function moviesCurrentlyInTheaters(bool) {


    await db("movies_theaters")
        .update({ is_showing: false })
        .where({ movie_id: 1 })

    return db("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .distinct("m.movie_id", "m.title", "m.runtime_in_minutes", "m.rating", "m.description", "m.image_url")
        .where({ "mt.is_showing": bool })



}






// "review_id": 1,
// "content": "Lorem markdownum ...",
// "score": 3,
// "created_at": "2021-02-23T20:48:13.315Z",
// "updated_at": "2021-02-23T20:48:13.315Z",
// "critic_id": 1,
// "movie_id": 1,

async function listReviews(movieId) {

    const reviews = await db("reviews as r").join("critics as c", "c.critic_id", "r.critic_id")
        .select("r.review_id", "r.content", "r.score", "r.created_at", "r.updated_at", "r.critic_id", "r.movie_id")
        .where({ "r.movie_id": movieId })
    const critics = await db("reviews as r").join("critics as c", "c.critic_id", "r.critic_id")
        .select("c.*")
        .where({ "r.movie_id": movieId })

    reviews.forEach((review, i) => {

        review.critic = critics[i]
    })
    return reviews



}

function listTheaters(movieId) {

    return db("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .join("theaters as t", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({ "m.movie_id": movieId })
}

module.exports = {
    listMovies,
    moviesCurrentlyInTheaters,
    readMovie,
    listTheaters,
    listReviews
}
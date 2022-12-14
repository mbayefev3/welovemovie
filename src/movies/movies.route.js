const route = require("express").Router()
const router = require("express").Router()
const controller = require("./movies.controller")

router.route("/").get(controller.listMovies)

router.route("/:movieId").get(controller.readMovie)
router.route("/:movieId/theaters").get(controller.listTheaters)
router.route("/:movieId/reviews").get(controller.listReviews)
module.exports = router
const route = require("express").Router()
const router = require("express").Router()
const controller = require("./movies.controller")
const methodNotAllowed = require("../methodNotAllowed")
router.route("/").get(controller.listMovies)

router.route("/:movieId").get(controller.readMovie).all(methodNotAllowed)
router.route("/:movieId/theaters").get(controller.listTheaters).all(methodNotAllowed)
router.route("/:movieId/reviews").get(controller.listReviews).all(methodNotAllowed)
module.exports = router
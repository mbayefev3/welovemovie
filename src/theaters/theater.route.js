const router = require("express").Router()
const controller = require("./theater.controller")
const methodNotAllowed = require("../methodNotAllowed")



router.route("/").get(controller.listMoviesInEachTheaters).all(methodNotAllowed)

module.exports = router

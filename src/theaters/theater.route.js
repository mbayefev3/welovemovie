const router = require("express").Router()
const controller = require("./theater.controller")



router.route("/").get(controller.listMoviesInEachTheaters)

module.exports = router
const services = require("./reviews.service")

async function reviewIdExists(req, res, next) {

    const { reviewId } = req.params
    const review = await services.read(Number(reviewId))

    if (review) {
        res.locals.review = review
        console.log('r', res.locals.reviews)
        return next()
    }

    next({
        status: 404,
        message: "Review cannot be found."
    })

}


async function update(req, res) {
    const { review } = res.locals

    const updated = await services.update({
        ...review,
        ...req.body.data
    })

    res.status(200).json({
        data: updated
    })

}

async function destroy(req, res) {
    const { reviewId } = req.params
    await services.delete(Number(reviewId))

    res.status(204).send("No content")

}


module.exports = {
    delete: [reviewIdExists, destroy],
    update: [reviewIdExists, update]
}
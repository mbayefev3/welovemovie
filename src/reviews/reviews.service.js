
const db = require("../db/connection")


function read(review_id) {
    return db("reviews").select("*").where({ review_id }).first()
}


function destroy(review_id) {

    return db("reviews").where({ review_id }).del()
}


async function update(review) {

    const critic = await db("reviews as r").join("critics as c", "c.critic_id", "r.critic_id").select("c.*")
        .where({ "r.critic_id": review.critic_id }).first()

    await db("reviews").where({ review_id: review.review_id }).update(review) //1

    const [updated] = await db("reviews").select("*").where({ review_id: review.review_id })

    return {
        ...updated,
        critic
    }
}
module.exports = {
    read, delete: destroy,
    update
}

const db = require("../db/connection")


function read(review_id) {
    return db("reviews").select("*").where({ review_id }).first()
}


function destroy(review_id) {

    return db("reviews").where({ review_id }).del()
}



module.exports = {
    read, delete: destroy
}
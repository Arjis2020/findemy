const Purchases = require('../models/purchase.model')
const insert = require('../databaseUtils/insert')

const purchase = async (req, res) => {
    const { course_id, user_id } = req.body

    try {
        // check if user has already bought the course
        const purchase = await Purchases.findOne({
            course_id,
            user_id
        })
        if (!purchase || !purchase.id) {
            await insert(Purchases, {
                course_id,
                user_id
            })
            res.send("Success")
        }
        else {
            res.status(500).send({
                status: "Failed",
                reason: "User has already bought the course"
            })
        }
    }
    catch (err) {
        res.status(500).send({
            status: "Failed",
            reason: err.toString()
        })
    }
}

const getAllPurchases = async (req, res) => {
    const { user_id } = req.query
    const purchases = await Purchases.find({
        user_id
    })

    res.send(purchases)
}

module.exports = { purchase, getAllPurchases }
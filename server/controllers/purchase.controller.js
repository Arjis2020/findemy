const Purchases = require('../models/purchase.model')
const insert = require('../databaseUtils/insert')
const ValidationError = require('../errors/ValidationError')

const purchase = async (req, res) => {
    const { courses } = req.body
    const user_id = req.decoded._id

    const injectedCourses = courses.map(course => ({
        user_id,
        course_id: course
    }))
    try {
        await Purchases.insertMany(injectedCourses)
        res.send("Success")
    }
    catch (err) {
        if (err instanceof ValidationError)
            res.status(409).send({
                status: "Failed",
                reason: err.toString()
            })
        else
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
const insert = require("../databaseUtils/insert")
const ValidationError = require("../errors/ValidationError")
const Cart = require("../models/cart.model")

const getCart = async (req, res) => {
    const user_id = req.decoded._id

    const orders = (await Cart.find(
        {
            user_id
        },
    ).populate({
        path: 'course_id',
        populate: {
            path: 'instructors'
        }
    })).map(item => ({ ...item.course_id.toJSON() }))

    const totalDiscountedPrice = orders.reduce((sum, i) => sum + i.discountedPrice, 0)
    const totalPrice = orders.reduce((sum, i) => sum + i.price, 0)
    const discountPercentage = Math.floor(((totalPrice - totalDiscountedPrice) / totalPrice) * 100)
    const discount = totalPrice - totalDiscountedPrice

    const response = {
        orders,
        totalPrice,
        totalDiscountedPrice,
        discountPercentage,
        discount
    }

    res.send(response)
}

const removeFromCart = async (req, res) => {
    try {
        const user_id = req.decoded._id
        const course_id = req.params.cid

        await Cart.deleteOne({
            user_id,
            course_id
        })

        return getCart(req, res)
    }
    catch (err) {
        res.status(500).send({
            status: 'failed',
            reason: err.toString()
        })
    }
}

const addToCart = async (req, res) => {
    const { course_id } = req.body
    const user_id = req.decoded._id

    try {
        await insert(Cart, {
            user_id,
            course_id
        })
        return getCart(req, res)
    }
    catch (err) {
        console.log(err)
        if (err instanceof ValidationError) {
            res.status(404).send({
                status: 'failed',
                reason: 'Invalid course id'
            })
        }
        else {
            res.status(409).send({
                status: 'failed',
                reason: 'Course already added to cart'
            })
        }
    }
}

module.exports = { getCart, removeFromCart, addToCart }
const { default: mongoose } = require("mongoose")
const Cart = require("../models/cart.model")
const Courses = require("../models/course.model")

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

module.exports = { getCart }
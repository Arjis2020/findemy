const Purchases = require('../models/purchase.model')
const ValidationError = require('../errors/ValidationError')
const Cart = require('../models/cart.model')

const purchase = async (req, res) => {
    const { courses } = req.body
    const user_id = req.decoded._id

    const injectedCourses = courses.map(course => ({
        user_id,
        course_id: course._id
    }))
    try {
        await Purchases.insertMany(injectedCourses)
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

        const updatedCart = {
            orders,
            totalPrice,
            totalDiscountedPrice,
            discountPercentage,
            discount
        }

        res.send(updatedCart)
    }
    catch (err) {
        console.log(err)
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
    const user_id = req.decoded._id
    const purchases = (await Purchases.find({
        user_id
    }).populate({
        path: 'course_id',
        populate: {
            path: 'instructors'
        }
    })).map(item => ({ ...item.course_id.toJSON() }))

    res.send(purchases)
}

module.exports = { purchase, getAllPurchases }
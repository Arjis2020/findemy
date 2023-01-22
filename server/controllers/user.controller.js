const bcrypt = require('bcrypt')
const Users = require('../models/user.model')
const insert = require('../databaseUtils/insert')
const jwt = require('jsonwebtoken')
const { COOKIE_TOKEN } = require('../constants')
const Cart = require('../models/cart.model')
const ValidationError = require('../errors/ValidationError')

require('dotenv').config()

const authorize = async (req, res) => {
    const decoded = req.decoded
    delete decoded.iat
    delete decoded.exp

    // const cart = (await Cart.find(
    //     {
    //         user_id: decoded._id
    //     },
    //     {
    //         course_id: 1
    //     }
    // ).populate(['course_id'])).map(item => ({ ...item.course_id.toJSON() }))

    // const cart = (await Cart.find(
    //     {
    //         user_id: decoded._id
    //     }
    // ).populate('course_id')).map(i => ({ ...i.course_id.toJSON() }))
    const user_id = decoded._id
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

    const cart = {
        orders,
        totalPrice,
        totalDiscountedPrice,
        discountPercentage,
        discount
    }

    const response = {
        ...decoded,
        cart
    }

    // console.log(response)

    res.send(response)
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({
        email
    })

    if (user && user._id) {
        // user was found
        // check the password
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (isValidPassword) {
            // get the cart data
            const orders = (await Cart.find(
                {
                    user_id: user._id
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

            const cart = {
                orders,
                totalPrice,
                totalDiscountedPrice,
                discountPercentage,
                discount
            }

            // log him in
            const jwtSignaturePayload = {
                _id: user._id,
                email: user.email,
                name: user.name
            }

            // generate a JWT token
            const authToken = jwt.sign(jwtSignaturePayload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            })

            const response = {
                ...jwtSignaturePayload,
                cart
            }

            res.cookie(COOKIE_TOKEN, authToken, {
                maxAge: +process.env.JWT_EXPIRES_IN,
                httpOnly: true
            })
                .send(response)
        }
        else {
            res.status(401).send("Incorrect password")
        }
    }
    else {
        res.status(404).send({
            status: "Failed",
            reason: "Incorrect credentials or the user doesn't exist"
        })
    }
}

const logout = async (req, res) => {
    res.clearCookie(COOKIE_TOKEN).end()
}

const signup = async (req, res) => {
    const { email, name, password } = req.body
    const hashedPass = await bcrypt.hash(password, 10)

    try {
        await insert(Users, {
            email,
            name,
            password: hashedPass
        })
        return login(req, res)
    }
    catch (err) {
        if (err instanceof ValidationError) {
            res.status(409).send({
                status: 'failed',
                reason: 'User already exists'
            })
        }
        else {
            res.status(500).send({
                status: "Failed",
                reason: err.toString()
            })
        }
    }
}

const getAllUsers = async (req, res) => {
    const users = await Users.find()
    return res.send(users)
}

module.exports = { authorize, login, signup, getAllUsers, logout }
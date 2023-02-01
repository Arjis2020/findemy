const bcrypt = require('bcrypt')
const Users = require('../models/user.model')
const insert = require('../databaseUtils/insert')
const jwt = require('jsonwebtoken')
const { COOKIE_TOKEN } = require('../constants')
const Cart = require('../models/cart.model')
const ValidationError = require('../errors/ValidationError')
const Purchases = require('../models/purchase.model')
const nodemailer = require('nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')

require('dotenv').config()

const authorize = async (req, res) => {
    const decoded = req.decoded
    delete decoded.iat
    delete decoded.exp

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

    const purchases = (await Purchases.find({
        user_id
    }).populate('course_id')).map(item => ({ ...item.course_id.toJSON() }))

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
        cart,
        purchases
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

            const purchases = (await Purchases.find({
                user_id: user._id
            }).populate('course_id')).map(item => ({ ...item.course_id.toJSON() }))

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
                cart,
                purchases
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

const forgotPassword = async (req, res) => {
    const { email } = req.body
    try {
        var readHTMLFile = function (path, callback) {
            fs.readFile(path, { encoding: 'utf-8' }, function (err, html) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, html);
                }
            });
        };

        const user = await Users.findOne({ email })

        const token = jwt.sign({
            _id: user._id,
            email: user.email,
            name: user.name
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_AUTH_EMAIL,
                pass: process.env.NODEMAILER_AUTH_PASSWORD,
            },
        });

        readHTMLFile('views/forgotPassword.html', async function (err, html) {
            if (err) {
                console.log('error reading file', err);
                return;
            }
            var template = handlebars.compile(html);
            var replacements = {
                email,
                name: user.name,
                app_name: "Findemy",
                operating_system: "Mac OS",
                browser_name: "Chrome",
                action_url: `http://localhost:3000/resetPassword?token=${token}`,
                support_url: ""
            };
            var htmlToSend = template(replacements);
            // fs.writeFileSync('gen.html', htmlToSend)
            await transporter.sendMail({
                from: '"Findemy.com" <dave.hester@findemy.com>', // sender address
                to: email,
                subject: "Forgot password",
                html: htmlToSend,
            });
        });

        res.send({
            status: "success"
        })
    }
    catch (err) {
        console.log(err.toString())
        res.status(500).send({
            status: 'failed',
            reason: err.toString()
        })
    }
}

module.exports = { authorize, login, signup, getAllUsers, logout, forgotPassword }
const bcrypt = require('bcrypt')
const Users = require('../models/user.model')
const insert = require('../databaseUtils/insert')
const jwt = require('jsonwebtoken')
const { COOKIE_TOKEN } = require('../constants')

require('dotenv').config()

const authorize = async (req, res) => {
    const decoded = req.decoded
    delete decoded.iat
    delete decoded.exp

    res.send(decoded)
}

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await Users.findOne({
        email
    })

    if (user && user.id) {
        // user was found
        // check the password
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (isValidPassword) {
            // log him in
            const response = {
                id: user.id,
                email: user.email,
                name: user.name,
                created_at: user.created_at
            }

            // generate a JWT token
            const authToken = jwt.sign(response, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            })

            res
            .cookie(COOKIE_TOKEN, authToken, {
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
        // res.send({
        //     status: "Success"
        // })
    }
    catch (err) {
        res.status(500).send({
            status: "Failed",
            reason: err.toString()
        })
    }
}

const getAllUsers = async (req, res) => {
    const users = await Users.find()
    return res.send(users)
}

module.exports = { authorize, login, signup, getAllUsers, logout }
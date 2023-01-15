const express = require('express')
const insert = require('../databaseUtils/insert')
const router = express.Router()
const bcrypt = require('bcrypt')

const Users = require('../models/users.model')

router.get('/', async (req, res) => {
    const users = await Users.find()
    res.send(users)
})

router.post('/login', async (req, res) => {
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
            res.send(response)
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
})

router.post('/signup', async (req, res) => {
    const { email, name, password } = req.body
    const hashedPass = await bcrypt.hash(password, 10)

    try {
        await insert(Users, {
            email,
            name,
            password: hashedPass
        })
        res.send({
            status: "Success"
        })
    }
    catch (err) {
        res.status(500).send({
            status: "Failed",
            reason: err.toString()
        })
    }
})

module.exports = router
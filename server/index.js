const express = require('express')
const { init } = require('./database')
require('dotenv').config()

const PORT = process.env.PORT || 9000

const app = express()

app.use(express.json())

const courses = require('./routes/courses')
const users = require('./routes/users')
const purchases = require('./routes/purchases')

try {
    // connect db
    init()

    app.use('/courses', courses)
    app.use('/users', users)
    app.use('/purchases', purchases)

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}
catch (err) {
    console.log(err);
}

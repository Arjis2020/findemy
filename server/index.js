const express = require('express')
const { init } = require('./database')
const cors = require('cors')
var cookieParser = require('cookie-parser');
require('dotenv').config()

const PORT = process.env.PORT || 9000

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
}))
app.use(cookieParser());
app.use(express.json())

// load all models to avoid errors
require('./models/user.model')
require('./models/instructor.model')
require('./models/category.model')
require('./models/course.model')
require('./models/cart.model')
require('./models/purchase.model')

const courses = require('./routes/courses')
const users = require('./routes/users')
const purchases = require('./routes/purchases')
const cart = require('./routes/cart');

try {
    // connect db
    init()

    app.use('/courses', courses)
    app.use('/users', users)
    app.use('/purchases', purchases)
    app.use('/cart', cart)

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}
catch (err) {
    console.log(err);
}

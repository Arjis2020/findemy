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

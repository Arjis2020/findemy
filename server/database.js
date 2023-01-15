const mongoose = require('mongoose')

require('dotenv').config()

const init = () => {
    try {
        mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
            () => console.log("Connected to mongodb")
        )
    }
    catch (err) {
        throw err
    }
}

module.exports = { init }
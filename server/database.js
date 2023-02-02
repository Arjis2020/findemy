const mongoose = require('mongoose')

require('dotenv').config()

const init = (callback) => {
    try {
        mongoose.connect(process.env.DB_URI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            () => {
                console.log("Connected to mongodb")
                if (callback) callback()
            }
        )
    }
    catch (err) {
        throw err
    }
}

module.exports = { init }
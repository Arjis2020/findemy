const Razorpay = require('razorpay')
require('dotenv').config()

const privateRazorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const publicRazorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: ""
})

module.exports = {privateRazorpayInstance, publicRazorpayInstance}

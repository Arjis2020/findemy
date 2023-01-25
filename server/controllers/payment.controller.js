const razorpayInstance = require('../razorpay')
require('dotenv').config()
const crypto = require('crypto')

const createOrder = async (req, res) => {
    const { amount, currency, receipt, notes } = req.body
    try {

        const order = await razorpayInstance.orders.create({ amount, currency, receipt, notes })
        res.send(order)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'failed',
            reason: err.toString()
        })
    }
}

const verifyOrder = async (req, res) => {
    const { order_id, payment_id } = req.body
    const razorpay_signature = req.headers['x-razorpay-signature']

    const key_secret = process.env.RAZORPAY_KEY_SECRET

    let hmac = crypto.createHmac('sha256', key_secret)

    hmac.update(order_id + "|" + payment_id);

    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
    if (razorpay_signature === generated_signature) {
        res.json({ success: 'success', reason: "Payment has been verified" })
    }
    else
        res.status(500).json({ success: 'failed', reason: "Payment verification failed" })
}

module.exports = { createOrder, verifyOrder }
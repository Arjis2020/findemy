const { privateRazorpayInstance, publicRazorpayInstance } = require('../razorpay')
require('dotenv').config()
const crypto = require('crypto')

const getPaymentMethods = async (req, res) => {
    try {
        const methods = await publicRazorpayInstance.payments.fetchPaymentMethods()
        res.send(methods)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'failed',
            reason: err
        })
    }
}

// not working as of 27/01/2023
const verifyVPA = async (req, res) => {
    const { vpa } = req.body

    try {
        const response = await privateRazorpayInstance.payments.validateVpa({
            vpa
        })
        res.send(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'failed',
            reason: 'Internal server error'
        })
    }
}

const generateQR = async (req, res) => {
    const { amount } = req.body
    try {
        const currentDate = new Date()
        const close_by = Math.floor(new Date(currentDate.setMinutes(currentDate.getMinutes() + 15)).getTime() / 1000)
        const response = await privateRazorpayInstance.qrCode.create({
            type: "upi_qr",
            name: "",
            usage: "single_use",
            fixed_amount: true,
            payment_amount: amount,
            close_by
        })
        res.send(response)
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'failed',
            reason: err.toString()
        })
    }
}

const createOrder = async (req, res) => {
    const { amount, currency, receipt, notes } = req.body
    try {

        const order = await privateRazorpayInstance.orders.create({ amount, currency, receipt, notes })
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

module.exports = { createOrder, verifyOrder, getPaymentMethods, verifyVPA, generateQR }
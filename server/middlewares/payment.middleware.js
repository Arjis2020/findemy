const paymentMiddleware = (req, res, next) => {
    if(req.headers['x-razorpay-signature']) next()
    else {
        res.status(401).send({
            status: 'failed',
            reason: 'Header must contain the razorpay signature obtained from a successful transaction'
        })
    }
}

module.exports = paymentMiddleware
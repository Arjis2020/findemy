const jwt = require('jsonwebtoken')
const { COOKIE_TOKEN } = require('../constants')

const authenticate = async (req, res, next) => {
    let cookies = req.cookies
    let authToken = cookies[COOKIE_TOKEN]
    if (authToken) {
        try {
            jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.error(err.toString());
                    res.clearCookie(COOKIE_TOKEN).status(401).send({
                        status: 'failed',
                        reason: "User is not verified"
                    })
                }
                else {
                    req.decoded = decoded
                    next()
                }
            })
        }
        catch (err) {
            if (err instanceof jwt.TokenExpiredError) {
                res.clearCookie(COOKIE_TOKEN).status(401).send({
                    status: 'failed',
                    reason: 'Token expired'
                })
            }
        }
    }
    else {
        res.clearCookie(COOKIE_TOKEN).status(401).send({
            status: 'failed',
            reason: "Please provide a valid token"
        })
    }
}

module.exports = authenticate
const jwt = require('jsonwebtoken')

const checkToken = (req, res, next) => {
    const token = req.headers['x-auth-token'] || req.headers['authorization']
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.error(err.toString());
                    res.status(401).send({
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
                res.status(401).send({
                    status: 'failed',
                    reason: 'Token expired'
                })
            }
        }
    }
    else {
        res.status(401).send({
            status: 'failed',
            reason: "Please provide a valid token"
        })
    }
}

module.exports = checkToken
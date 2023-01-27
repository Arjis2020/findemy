const cacheMiddleware = (req, res, next) => {
    res.set('Cache-control', 'public, max-age=900')
    next()
}

module.exports = cacheMiddleware
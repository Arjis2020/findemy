class ValidationError extends Error {
    constructor(err) {
        super(err)
    }
}

module.exports = ValidationError
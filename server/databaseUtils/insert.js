module.exports = (model, data) => {
    return new Promise((resolve, reject) => {
        if (typeof model === 'undefined' || !model) {
            reject("Model cannot be empty")
        }
        const document = new model({
            ...data
        })
        document.save()
        .then(doc => resolve(doc))
        .catch((err) => {
            if (err) reject(err)
        })
    })
}
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Schema = mongoose.Schema

const CoursesSchema = new Schema({
    title: String,
    shortDescription: String,
    detailedDescription: String,
    instructors: {
        type: [Schema.Types.ObjectId],
        ref: 'instructors'
    },
    rating: Number,
    totalRatings: Number,
    totalHours: Number,
    lectures: Number,
    levels: [String],
    imageUrl: String,
    // videoUrl: String,
    price: Number,
    discountedPrice: Number,
    requirements: [String],
    learnings: [String],
    totalArticles: Number,
    totalVideoHours: Number,
    totalDownloadableResources: Number,
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'categories'
    },
    slug: String
}, {
    timestamps: true
})

module.exports = CoursesSchema
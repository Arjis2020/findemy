const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Schema = mongoose.Schema

const CoursesSchema = new Schema({
    title: String,
    shortDescription: String,
    detailedDescription: String,
    instructors: [Schema.Types.ObjectId],
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
    categories: [Schema.Types.ObjectId],
    slug: String,
    created_at: {
        type: Date,
        default: Date.now
    },
})

module.exports = CoursesSchema
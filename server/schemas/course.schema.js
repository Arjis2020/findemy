const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')
const Schema = mongoose.Schema

const CoursesSchema = new Schema({
    title: {
        type: String,
        text: true
    },
    shortDescription: {
        type: String,
        text: true
    },
    detailedDescription: {
        type: String,
        text: true
    },
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
    requirements: {
        type: [String],
        text: true
    },
    learnings: {
        type: [String],
        text: true
    },
    totalArticles: Number,
    totalVideoHours: Number,
    totalDownloadableResources: Number,
    categories: {
        type: [Schema.Types.ObjectId],
        ref: 'categories',
    },
    slug: String
}, {
    timestamps: true
})

CoursesSchema.index({ slug: 1, title: 1 }, {
    unique: true
})

CoursesSchema.index({
    title: 'text',
    shortDescription: 'text',
    detailedDescription: 'text',
    learnings: 'text',
    categories: 'text',
    requirements: 'text'
}, {
    name: "search_index",
    weights: {
        title: 6,
        shortDescription: 5,
        detailedDescription: 5,
        learnings: 4,
        requirements: 4,
        categories: 3,
    }
})

module.exports = CoursesSchema
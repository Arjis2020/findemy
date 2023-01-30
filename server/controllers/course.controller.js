const insert = require('../databaseUtils/insert')
const ValidationError = require('../errors/ValidationError')
const Cart = require('../models/cart.model')
const Courses = require('../models/course.model')

const getAllCourses = async (req, res) => {
    // return all available courses
    const courses = await Courses.find({}, {
        title: 1,
        rating: 1,
        totalRatings: 1,
        imageUrl: 1,
        instructors: 1,
        discountedPrice: 1,
        price: 1,
        slug: 1
    }).populate('instructors')

    res.send(courses)
}

const getCourseBySlug = async (req, res) => {
    const slug = "/" + req.params.slug

    const result = await Courses.findOne({ slug }).populate('instructors').populate('categories')

    res.send(result)
}

const search = async (req, res) => {
    try {
        const search = req.query.q
        const page = req.query.page || 1
        const sortBy = req.query.sort

        let sort

        switch (sortBy) {
            case "mostRelevant":
                sort = {
                    score: {
                        $meta: 'textScore'
                    }
                }
                break;
            case "mostReviewed":
                sort = { totalRatings: -1 }
                break
            case "highestRated":
                sort = { rating: -1 }
                break
            case "newest":
                sort = { created_at: -1 }
                break
            default:
                sort = {
                    score: {
                        $meta: 'textScore'
                    }
                }
                break;
        }

        const filters = {
            rating: req.query.rating,
            levels: req.query.levels?.split(','),
            prices: req.query.prices?.split(',')
        }

        const RESULTS_PER_PAGE = 10
        const SKIP = (page - 1) * RESULTS_PER_PAGE

        let levels = filters.levels.includes('all') ? ['beginner', 'intermediate', 'expert'] : filters.levels
        levels = levels.map(level => level.charAt(0).toUpperCase() + level.substring(1))
        const price = filters.prices.includes('free') && filters.prices.includes('paid') ? {
            $gte: 0
        } : filters.prices.includes('free') ? 0 : filters.prices.includes('paid') ? {
            $gt: 0
        } : {
            $gte: 0
        }

        // apply indexed text search
        const results = await Courses.find({
            $text: {
                $search: search
            },
            $score: {
                $meta: 'textScore'
            },
            rating: {
                $gte: filters.rating || 0
            },
            levels: {
                $in: levels
            },
            price
        })
            .sort(sort)
            .populate('instructors')
            .populate('categories')
            .limit(RESULTS_PER_PAGE)
            .skip(SKIP)

        const totalSize = await Courses.find({
            $text: {
                $search: search
            },
            $score: {
                $meta: 'textScore'
            },
            rating: {
                $gte: filters.rating || 0
            },
            levels: {
                $in: levels
            },
            price
        }).count()

        const fullResult = await Courses.find({
            $text: {
                $search: search
            },
            $score: {
                $meta: 'textScore'
            }
        })

        const ratingStats = fullResult.reduce((stats, i) => {
            if (i.rating >= 3) {
                stats.gte3++
            }
            if (i.rating >= 3.5) {
                stats['gte3.5']++
            }
            if (i.rating >= 4) {
                stats.gte4++
            }
            if (i.rating >= 4.5) {
                stats['gte4.5']++
            }

            return stats
        }, {
            "gte3": 0,
            "gte3.5": 0,
            "gte4": 0,
            "gte4.5": 0
        })

        const priceStats = fullResult.reduce((stats, i) => {
            if (i.price === 0) {
                stats.free++
            }
            else if (i.price > 0) {
                stats.paid++
            }
            return stats
        }, {
            free: 0,
            paid: 0
        })

        const levelStats = fullResult.reduce((stats, i) => {
            if (i.levels.length === 3) stats.all++
            if (i.levels.includes('Beginner')) stats.beginner++
            if (i.levels.includes('Intermediate')) stats.intermediate++
            if (i.levels.includes('Expert')) stats.expert++

            return stats
        }, {
            all: 0,
            beginner: 0,
            intermediate: 0,
            expert: 0
        })

        const response = {
            results,
            totalSize,
            levelStats,
            ratingStats,
            priceStats
        }

        res.send(response)
    }
    catch (err) {
        res.status(500).send({
            status: 'failed',
            reason: err.toString()
        })
    }
}

const searchByCategory = async (req, res) => {
    try {
        const page = req.query.page || 1
        const category = req.params.category

        const RESULTS_PER_PAGE = 10
        const SKIP = (page - 1) * RESULTS_PER_PAGE

        const data = await Courses.aggregate([
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categories'
                }
            },
            {
                $lookup: {
                    from: 'instructors',
                    localField: 'instructors',
                    foreignField: '_id',
                    as: 'instructors'
                }
            },
            {
                $match: {
                    'categories.title': {
                        $regex: `^${category}$`,
                        $options: 'i'
                    }
                }
            },
            {
                $facet: {
                    stage1: [
                        {
                            $group: {
                                _id: "",
                                totalSize: {
                                    $count: {}
                                }
                            }
                        }
                    ],
                    stage2: [
                        {
                            $skip: SKIP
                        },
                        {
                            $limit: RESULTS_PER_PAGE
                        },
                        {
                            $group: {
                                _id: "",
                                results: {
                                    $push: '$$ROOT'
                                }
                            }
                        }
                    ]
                }
            }
        ])

        const consolidatedData = data[0]
        const response = { ...consolidatedData.stage1[0], results: [...consolidatedData.stage2[0]?.results] }
        delete response._id

        res.send(response)
    }
    catch (err) {
        res.status(500).send({
            status: 'failed',
            reason: err.toString()
        })
    }
}

const addOne = async (req, res) => {
    const { title, body, price } = req.body

    try {
        await insert(Courses, {
            title,
            body,
            price
        })
        res.send("Course added successfully")
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Error")
    }
}

module.exports = { getAllCourses, getCourseBySlug, search, searchByCategory, addOne }
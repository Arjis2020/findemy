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
    const search = req.query.q
    //apply indexed text search
    const result = await Courses.find({
        $text: {
            $search: search
        },
        $score: {
            $meta: 'textScore'
        }
    })
    .sort({ score: { $meta: 'textScore' } })
    .populate('instructors')
    .populate('categories')

    res.send(result)
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

module.exports = { getAllCourses, getCourseBySlug, search, addOne }
const mongoose = require('mongoose')
const insert = require('../databaseUtils/insert')
const Cart = require('../models/cart.model')
const Courses = require('../models/course.model')

const getAllCourses = async (req, res) => {
    // return all available courses
    const courses = await Courses.aggregate([{
        $lookup: {
            from: 'instructors',
            localField: 'instructors',
            foreignField: '_id',
            as: 'instructors',
            pipeline: [{ $project: { name: 1 } }]
        },
    },
    {
        $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
            pipeline: [
                { $project: { title: 1 } }
            ]
        }
    },
    {
        $project: {
            title: 1,
            rating: 1,
            totalRatings: 1,
            imageUrl: 1,
            instructors: 1,
            discountedPrice: 1,
            price: 1,
            slug: 1
        }
    }
    ])

    res.send(courses)
}

const getCourseBySlug = async (req, res) => {
    const slug = "/" + req.params.slug

    // do id matching logic
    const result = await Courses.aggregate([{
        $lookup: {
            from: 'instructors',
            localField: 'instructors',
            foreignField: '_id',
            as: 'instructors',
        },
    },
    {
        $lookup: {
            from: 'categories',
            localField: 'categories',
            foreignField: '_id',
            as: 'categories',
            pipeline: [
                { $project: { title: 1 } }
            ]
        }
    },
    ]).match({
        // _id: mongoose.Types.ObjectId(id)
        slug
    })

    res.send(result[0])
}

const search = async (req, res) => {
    const search = req.query.search
    // apply substring logic and fetch all matching courses
    const result = await Courses.find({
        title: {
            $regex: new RegExp(search, 'i')
        }
    })
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

const addToCart = async (req, res) => {
    const { course_id } = req.body
    const user_id = req.decoded._id
    
    try {
        const cid = await Courses.findById(course_id, { _id: 1 })
        if (cid._id) {
            const cart_id = await Cart.findOne({
                user_id,
                course_id
            })
            if (!cart_id) {
                const doc = await insert(Cart, {
                    user_id,
                    course_id
                })
                res.send(doc)
            }
            else {
                res.status(409).send({
                    status: 'failed',
                    reason: 'Course already added to cart'
                })
            }
        }
        else {
            res.status(404).send({
                status: 'failed',
                reason: 'Invalid course id'
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).send({
            status: 'failed',
            reason: "Course could not be added to cart"
        })
    }
}

module.exports = { getAllCourses, getCourseBySlug, search, addOne, addToCart }
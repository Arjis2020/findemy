const mongoose = require('mongoose')
const insert = require('../databaseUtils/insert')
const Courses = require('../models/course.model')

const getAllCourses = async (req, res) => {
    // return all available courses
    const courses = await Courses.aggregate([{
        $lookup: {
            from: 'instructors',
            localField: 'instructors',
            foreignField: '_id',
            as: 'instructors',
            pipeline: [
                {
                    $project: {
                        name: 1
                    }
                }
            ]
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
    // console.log(courses)
    res.send(courses)
}

const getCourseById = async (req, res) => {
    const id = req.query.id
    
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
        _id: mongoose.Types.ObjectId(id)
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

module.exports = { getAllCourses, getCourseById, search, addOne }
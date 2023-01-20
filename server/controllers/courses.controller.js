const insert = require('../databaseUtils/insert')
const Courses = require('../models/courses.model')

const getAllCourses = async (req, res) => {
    // return all available courses
    const courses = await Courses.find()
    res.send(courses)
}

const getCourseById = async (req, res) => {
    const id = req.query.id
    // do id matching logic
    const result = await Courses.find({
        id
    })
    res.send(result)
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
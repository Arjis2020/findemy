const mongoose = require('mongoose')
const courses = require('../../data/courses')
const database = require('../../database');
const Courses = require('../../models/course.model');
const fs = require('fs')

database.init(main)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandom(min, max) {
    return Number((Math.random() * (max - min) + min).toFixed(1))
}

function getRandomPrice(min, max) {
    const rawPrice = getRandomInt(min, max)
    return Math.floor(rawPrice / 100) * 100 + 99
}

function getDiscountPrice(price) {
    const percentage = getRandomInt(0, 90)
    const discount = (percentage / 100) * price
    const discountedPrice = Math.floor(price - discount)
    return Math.floor(discountedPrice / 100) * 100 + 99
}

function getSlug(title) {
    title = title.replace(/\./g, "")
    const titleSplitted = title.split(' ').map(word => word.toLowerCase())
    return "/" + titleSplitted.join('-')
}

function generateShortDesc(desc) {
    return desc.split('. ')[0] + '.'
}

async function main() {
    const mutatedCourses = []
    Object.keys(courses).forEach(key => {
        const arr = courses[key]
        const updatedCourses = arr.map(course => {
            // course.instructors = course.instructors.map(i => mongoose.Types.ObjectId(i))
            // course.categories = course.categories.map(i => mongoose.Types.ObjectId(i))
            course.shortDescription = generateShortDesc(course.detailedDescription)
            course.rating = getRandom(3, 5)
            course.totalRatings = getRandomInt(20000, 200000)
            course.totalHours = getRandomInt(72, 120)
            course.lectures = getRandomInt(10, 50)
            // course.videoUrl = getSlug(course.title)
            course.price = getRandomPrice(500, 6000)
            course.discountedPrice = getDiscountPrice(course.price)
            course.totalArticles = getRandomInt(20, 50)
            course.totalVideoHours = getRandomInt(12, 60)
            course.totalDownloadableResources = getRandomInt(50, 150)
            course.slug = getSlug(course.title)

            return course
        })
        mutatedCourses.push(...updatedCourses)
    })

    try {
        const insertedCourses = await Courses.insertMany(mutatedCourses)
        console.log(insertedCourses)
    }
    catch (err) {
        console.log(err)
    }
    finally {
        process.exit(0)
    }
}
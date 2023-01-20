const instructors = require('../../data/instructors')
const database = require('../../database')
const Instructor = require('../../models/instructor.model')

database.init(main)

function main() {
    fetch('https://randomuser.me/api/?results=10')
        .then((response) => response.json())
        .then((response) => bindData(response))
}

const bindData = async (data) => {
    const instructorSensitiveData = []
    for (const person of data.results) {
        const { gender, name: { first, last }, picture: { large } } = person
        instructorSensitiveData.push({
            name: first + " " + last,
            imageURL: large,
            gender
        })
    }

    const processedInstructors = []

    for (const index in instructors) {
        let instructor = instructors[index]
        instructor = {
            ...instructor,
            ...instructorSensitiveData[index],
            reviews: getRandomInt(20000, 200000),
            students: getRandomInt(2000000, 20000000),
            courses: getRandomInt(20, 150)
        }
        processedInstructors.push(instructor)
    }

    // console.log(processedInstructors)
    try {
        const insertedDocs = await Instructor.insertMany(processedInstructors)
        console.log(insertedDocs)
    }
    catch (err) {
        console.error(err)
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
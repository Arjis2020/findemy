import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function Description() {

    const description = `This course is fully up-to-date with React 18 (the latest version of React)!

    It was completely updated and re-recorded from the ground up - it teaches the very latest version of React with all the core, modern features you need to know!
    
    ---
    
    This course also comes with two paths which you can take: The "complete" path (full >40h course) and the "summary" path (~4h summary module) - you can choose the path that best fits your time requirements! :-)
    
    ---
    
    React.js is THE most popular JavaScript library you can use and learn these days to build modern, reactive user interfaces for the web.
    
    This course teaches you React in-depth, from the ground up, step by step by diving into all the core basics, exploring tons of examples and also introducing you to advanced concepts as well.
    
    You'll get all the theory, tons of examples and demos, assignments and exercises and tons of important knowledge that is skipped by most other resources - after all, there is a reason why this course is that huge! :)
    
    And in case you don't even know why you would want to learn React and you're just here because of some ad or "the algorithm" - no worries: ReactJS is a key technology as a web developer and in this course I will also explain WHY it's that important!
    
    
    
    Welcome to "React - The Complete Guide"!
    
    This course will teach you React.js in a practice-oriented way, using all the latest patterns and best practices you need. You will learn all the key fundamentals as well as advanced concepts and related topics to turn you into a React.js developer.
    
    This is a huge course because it really covers EVERYTHING you need to know and learn to become a React.js developer!
    
    No matter if you know nothing about React or if you already got some basic React knowledge (not required but also not a problem), you will get tons of useful information and knowledge out of this course!
    
    My goal with this course is to ensure that you feel confident working with React, so that you can apply for React jobs, use it in your own projects or simply enhance your portfolio as a developer - whatever your goal is: This course gets you there!
    
    
    
    I originally created this course in 2017 and I have kept it updated since that - redoing it from the ground up in 2021. And of course I'm dedicated to keeping this course up-to-date - so that you can rely on this course to learn React in the best possible way!`

    return (
        <Stack
            my={2}
            spacing={1.5}
        >
            <Typography
                fontFamily='UdemySansBold'
                fontSize={22}
            >
                Description
            </Typography>
            <Typography
                maxWidth={'95%'}
                fontSize={14}
            >
                {description}
            </Typography>
        </Stack>
    )
}

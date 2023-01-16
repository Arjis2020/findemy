import { Stack, Typography } from '@mui/material'
import React from 'react'

export default function Requirements() {
    const requirements = [
        'JavaScript + HTML + CSS fundamentals are absolutely required',
        `You DON'T need to be a JavaScript expert to succeed in this course!`,
        'ES6+ JavaScript knowledge is beneficial but not a must-have',
        'NO prior React or any other JS framework experience is required!'
    ]

    return (
        <Stack
            mt={2}
            width='100%'
        >
            <Typography
                fontFamily='UdemySansBold'
                fontSize={22}
            >
                Requirements
            </Typography>
            <ul
                className='single-column-ul'
            >
                {requirements.map(requirement => (
                    <li>
                        <Typography
                            fontSize={14}
                        >
                            {requirement}
                        </Typography>
                    </li>
                ))}
            </ul>
        </Stack>
    )
}

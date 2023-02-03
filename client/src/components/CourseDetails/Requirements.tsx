import { Stack, Typography } from '@mui/material'
import React from 'react'

type RequirementsProps = {
    requirements: Array<string>
}

export default function Requirements({ requirements }: RequirementsProps) {
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
                    <li
                        key={requirement}
                    >
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

import { Stack, Typography } from '@mui/material'
import React from 'react'

type DescriptionProps = {
    description: string
}

export default function Description({ description }: DescriptionProps) {
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
            {description.split('\n').map((paragraph, i) => (
                <Typography
                    maxWidth={'95%'}
                    fontSize={14}
                    paragraph
                    key={i}
                >
                    {paragraph}
                </Typography>
            ))}
        </Stack>
    )
}

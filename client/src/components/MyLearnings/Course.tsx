import { Card, LinearProgress, Stack, Typography } from '@mui/material'
import React from 'react'
import ICourseModel from '../../models/course.model'
import Ratings from '../Ratings'

type CourseProps = {
    course: ICourseModel
}

export default function Course({ course }: CourseProps) {
    const { imageUrl, instructors, title } = course
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius: 0,
                maxWidth: 230,
                height: '100%',
            }}
        >
            <Stack
                spacing={0.5}
                justifyContent='space-between'
                height='100%'
            >
                <Stack
                    spacing={0.5}
                >
                    <img
                        src={imageUrl}
                        width="230"
                        style={{
                            border: '1px solid #d1d7dc',
                            aspectRatio: 'auto'
                        }}
                    />
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={16}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant='caption'
                        color='#6a6f73'
                    >
                        {instructors.map(i => i.name).join(", ")}
                    </Typography>
                </Stack>
                <Stack
                    spacing={0.5}
                >
                    <LinearProgress
                        value={100}
                        variant='determinate'
                        sx={{
                            height: '2px'
                        }}
                    />
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                    >
                        <Typography
                            variant='caption'
                        >
                            100%
                        </Typography>
                        <Stack
                            alignItems='end'
                        >
                            <Ratings
                                value={5}
                            />
                            <Typography
                                variant='caption'
                            >
                                Your rating
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}

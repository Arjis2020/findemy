import { Star, Reviews, People, PlayCircle } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'
import InstructorModel from '../../models/instructor.model'

type IntructorProps = {
    instructors: Array<InstructorModel>
}

export default function Instructor({ instructors }: IntructorProps) {
    return (
        <Stack
            sx={{
                my: 2,
                mb: 4
            }}
            spacing={2}
        >
            <Typography
                fontFamily='UdemySansBold'
                fontSize={22}
            >
                Instructor
            </Typography>
            {instructors.map(instructor => (
                <>
                    <Stack>
                        <Typography
                            component='a'
                            fontSize={20}
                            fontFamily='UdemySansBold'
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            {instructor.name}
                        </Typography>
                        <Typography
                            color='#6a6f73'
                        >
                            {instructor.skills.join(', ')}
                        </Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        spacing={2}
                    >
                        <Avatar
                            src={instructor.imageURL}
                            sx={{
                                height: 110,
                                width: 110
                            }}
                        />
                        <Stack
                            spacing={1}
                        >
                            <Stack
                                direction='row'
                                spacing={2}
                                alignItems='center'
                            >
                                <Star
                                    sx={{
                                        fontSize: 18
                                    }}
                                />
                                <Typography
                                    fontSize={14}
                                >
                                    {instructor.rating} Instructor Rating
                                </Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={2}
                                alignItems='center'
                            >
                                <Reviews
                                    sx={{
                                        fontSize: 18
                                    }}
                                />
                                <Typography
                                    fontSize={14}
                                >
                                    {instructor.reviews.toLocaleString()} Reviews
                                </Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={2}
                                alignItems='center'
                            >
                                <People
                                    sx={{
                                        fontSize: 18
                                    }}
                                />
                                <Typography
                                    fontSize={14}
                                >
                                    {instructor.students.toLocaleString()} Students
                                </Typography>
                            </Stack>
                            <Stack
                                direction='row'
                                spacing={2}
                                alignItems='center'
                            >
                                <PlayCircle
                                    sx={{
                                        fontSize: 18
                                    }}
                                />
                                <Typography
                                    fontSize={14}
                                >
                                    {instructor.courses.toLocaleString()} Courses
                                </Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Typography
                        fontSize={14}
                    >
                        {instructor.introduction}
                    </Typography>
                </>
            ))}
        </Stack>
    )
}

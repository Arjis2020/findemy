import { Star, Reviews, People, PlayCircle } from '@mui/icons-material'
import { Avatar, Stack, Typography } from '@mui/material'

export default function Instructor() {
    const instructor = {
        rating: 4.6,
        reviews: 542264,
        students: 2304183,
        courses: 43
    }

    return (
        <Stack
            sx={{
                my: 2
            }}
            spacing={2}
        >
            <Typography
                fontFamily='UdemySansBold'
                fontSize={22}
            >
                Instructor
            </Typography>
            <Stack>
                <Typography
                    component='a'
                    fontSize={20}
                    fontFamily='UdemySansBold'
                    sx={{
                        textDecoration: 'underline'
                    }}
                >
                    Academind by Maximillian Schwarzmüller
                </Typography>
                <Typography
                    color='#6a6f73'
                >
                    AWS certified, Professional Web Developer and Instructor
                </Typography>
            </Stack>
            <Stack
                direction='row'
                spacing={2}
            >
                <Avatar
                    src='https://img-b.udemycdn.com/user/200_H/13952972_e853.jpg'
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
                As a self-taught professional I really know the hard parts and the difficult topics when learning new or improving on already-known languages. This background and experience enables me to focus on the most relevant key concepts and topics. My track record of many 5-star rated courses and more than 2,000,000 students on Udemy is the best proof for that.
                Whether working as development instructor or teaching Business Administration I always received great feedback. The most rewarding experience is to see how people find new, better jobs, build awesome web applications, acquire amazing projects or simply enjoy their hobby with the help of my content.
                Together with Manuel Lorenz, I founded Academind to offer the best possible learning experience to our more than 2,000,000 students.
            </Typography>
        </Stack>
    )
}

import { Box, Container, Divider, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import CheckoutView from './CheckoutView'
import CourseView from './CourseView'
import YouMayAlsoLike from './YouMayAlsoLike'

export type CartCourse = {
    id: number | string,
    title: string,
    author: string,
    rating: number,
    totalRatings: number,
    totalHours: number,
    lectures: number,
    levels: string,
    thumbnail: string,
    price: number,
    realPrice: number
}

export default function Cart() {
    const courses: Array<CartCourse> = [
        {
            id: 1,
            title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
            author: 'Academind by Maximillian Schwarzmüller',
            rating: 4.6,
            totalRatings: 173462,
            totalHours: 58.5,
            lectures: 598,
            levels: 'All',
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
            price: 449,
            realPrice: 3499
        },
        {
            id: 2,
            title: 'Modern React with Redux [2023 Update]',
            author: 'Stephen Grider',
            rating: 4.7,
            totalRatings: 79302,
            totalHours: 64,
            lectures: 722,
            levels: 'All',
            thumbnail: 'https://img-c.udemycdn.com/course/480x270/705264_caa9_13.jpg',
            price: 449,
            realPrice: 3499
        },
    ]

    const totalPrice = courses.reduce((sum, i) => sum + i.price, 0)
    const totalRealPrice = courses.reduce((sum, i) => sum + i.realPrice, 0)
    const discount = Math.floor(((totalRealPrice - totalPrice) / totalRealPrice) * 100)

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'))

    return (
        <Container
            maxWidth='xl'
            sx={{
                py: 4
            }}
        >
            <Stack
                spacing={4}
                width='100%'
            >
                <Typography
                    variant='h4'
                    fontFamily='UdemySansBold'
                >
                    Shopping Cart
                </Typography>
                {!matches ?
                    <Stack
                        direction='row'
                        spacing={10}
                    >
                        <Stack
                            divider={<Divider />}
                            flex='1'
                        >
                            <Typography
                                fontSize={14}
                                fontFamily='UdemySansBold'
                            >
                                {courses.length} Courses in Cart
                            </Typography>
                            {courses.map(course => (
                                <CourseView
                                    item={course}
                                />
                            ))}
                        </Stack>
                        <CheckoutView
                            totalPrice={totalPrice}
                            totalRealPrice={totalRealPrice}
                            discount={discount}
                        />
                    </Stack>
                    :
                    <Stack
                        spacing={4}
                    >
                        <CheckoutView
                            totalPrice={totalPrice}
                            totalRealPrice={totalRealPrice}
                            discount={discount}
                        />
                        <Stack
                            divider={<Divider />}
                            flex='1'
                        >
                            <Typography
                                fontSize={14}
                                fontFamily='UdemySansBold'
                            >
                                {courses.length} Courses in Cart
                            </Typography>
                            {courses.map(course => (
                                <CourseView
                                    item={course}
                                />
                            ))}
                        </Stack>
                    </Stack>
                }
                <Stack
                    spacing={2}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        variant='h5'
                    >
                        You might also like
                    </Typography>
                    <YouMayAlsoLike />
                </Stack>
            </Stack>
        </Container>
    )
}

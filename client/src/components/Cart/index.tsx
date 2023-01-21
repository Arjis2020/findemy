import { Box, Container, Divider, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { triggerGetCartCourses } from '../../redux/actions/cart.action'
import { RootState } from '../../redux/reducers'
import { CartAction } from '../../redux/reducers/cart.reducer'
import CheckoutView from './CheckoutView'
import CourseView from './CourseView'
import YouMayAlsoLike from './YouMayAlsoLike'

// export type OrderMeta = {
//     totalPrice: number,
//     totalRealPrice: number,
//     discountPercentage: number,
//     discount: number
// }

export default function Cart() {
    const cart = useSelector<RootState>((state) => state.cartReducer) as CartAction
    const orders: Array<Course> = cart.cartOrders.orders

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(triggerGetCartCourses())
    }, [])

    // let orders: Array<Orders> = [
    //     {
    //         id: 1,
    //         title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
    //         author: 'Academind by Maximillian Schwarzmüller',
    //         rating: 4.6,
    //         totalRatings: 173462,
    //         totalHours: 58.5,
    //         lectures: 598,
    //         levels: 'All',
    //         thumbnail: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
    //         price: 449,
    //         realPrice: 3499
    //     },
    //     {
    //         id: 2,
    //         title: 'Modern React with Redux [2023 Update]',
    //         author: 'Stephen Grider',
    //         rating: 4.7,
    //         totalRatings: 79302,
    //         totalHours: 64,
    //         lectures: 722,
    //         levels: 'All',
    //         thumbnail: 'https://img-c.udemycdn.com/course/480x270/705264_caa9_13.jpg',
    //         price: 449,
    //         realPrice: 3499
    //     },
    // ]


    // const totalPrice = orders.reduce((sum, i) => sum + i.discountedPrice, 0)
    // const totalRealPrice = orders.reduce((sum, i) => sum + i.price, 0)
    // const discountPercentage = Math.floor(((totalRealPrice - totalPrice) / totalRealPrice) * 100)
    // const discount = totalRealPrice - totalPrice

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
                                {orders.length} Courses in Cart
                            </Typography>
                            {orders.map(course => (
                                <CourseView
                                    item={course}
                                />
                            ))}
                        </Stack>
                        <CheckoutView/>
                    </Stack>
                    :
                    <Stack
                        spacing={4}
                    >
                        <CheckoutView/>
                        <Stack
                            divider={<Divider />}
                            flex='1'
                        >
                            <Typography
                                fontSize={14}
                                fontFamily='UdemySansBold'
                            >
                                {orders.length} Courses in Cart
                            </Typography>
                            {orders.map(course => (
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

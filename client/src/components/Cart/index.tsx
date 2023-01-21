import { Container, Divider, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { triggerGetCartCourses } from '../../redux/actions/cart.action'
import { RootState } from '../../redux/reducers'
import { CartAction } from '../../redux/reducers/cart.reducer'
import Loader from '../Loader'
import CheckoutView from './CheckoutView'
import CourseView from './CourseView'
import YouMayAlsoLike from './YouMayAlsoLike'

export default function Cart() {
    const cart = useSelector<RootState>((state) => state.cartReducer) as CartAction

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(triggerGetCartCourses())
    }, [])

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'))

    return (
        cart.cartOrders ?
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
                                    {cart.cartOrders.orders.length} Courses in Cart
                                </Typography>
                                {cart.cartOrders.orders.map(course => (
                                    <CourseView
                                        item={course}
                                    />
                                ))}
                            </Stack>
                            <CheckoutView />
                        </Stack>
                        :
                        <Stack
                            spacing={4}
                        >
                            <CheckoutView />
                            <Stack
                                divider={<Divider />}
                                flex='1'
                            >
                                <Typography
                                    fontSize={14}
                                    fontFamily='UdemySansBold'
                                >
                                    {cart.cartOrders.orders.length} Courses in Cart
                                </Typography>
                                {cart.cartOrders.orders.map(course => (
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
            :
            <Loader />
    )
}

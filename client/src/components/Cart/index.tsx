import { Button, Container, Divider, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { triggerGetCart } from '../../redux/actions/cart.action'
import { RootState } from '../../redux/reducers'
import { triggerGetCart } from '../../redux/reducers/cart.reducer'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import Loader from '../Loader'
import CheckoutView from './CheckoutView'
import CourseView from './CourseView'
import YouMayAlsoLike from './YouMayAlsoLike'

export default function Cart() {
    const cart = useAppSelector((state) => state.cartReducer)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(triggerGetCart())
    }, [])

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'))

    return (
        cart.data.orders ?
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
                    {
                        cart.data.orders.length > 0 ?
                            !matches ?
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
                                            {cart.data.orders.length} Courses in Cart
                                        </Typography>
                                        {cart.data.orders.map(course => (
                                            <CourseView
                                                key={course._id}
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
                                    >
                                        <Typography
                                            fontSize={14}
                                            fontFamily='UdemySansBold'
                                        >
                                            {cart.data.orders.length} Courses in Cart
                                        </Typography>
                                        <Stack
                                            divider={<Divider />}
                                        >
                                            {cart.data.orders.map(course => (
                                                <CourseView
                                                    key={course._id}
                                                    item={course}
                                                />
                                            ))}
                                        </Stack>
                                    </Stack>
                                </Stack>
                            :
                            <Stack
                                flex={1}
                                spacing={1}
                            >
                                <Typography
                                    fontSize={14}
                                    fontFamily='UdemySansBold'
                                >
                                    {cart.data.orders.length} Courses in Cart
                                </Typography>
                                <Stack
                                    sx={{
                                        boxShadow: '0 0 2px #d1d7dc',
                                        py: 5,
                                        mb: 5
                                    }}
                                    alignItems='center'
                                    spacing={3}
                                >
                                    <img
                                        src='https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2-2x.jpg'
                                        width='240px'
                                    />
                                    <Typography
                                        textAlign='center'
                                    >
                                        Your cart is empty. Keep shopping to find a course!
                                    </Typography>
                                    <Link
                                        to='/'
                                        className='link-unstyled-full'
                                    >
                                        <Button
                                            variant='contained'
                                            disableElevation
                                            disableRipple
                                            sx={{
                                                py: 1,
                                                px: 1.5,
                                                fontFamily: 'UdemySansBold',
                                                fontSize: 16,
                                                textTransform: 'none',
                                                borderRadius: 0
                                            }}
                                        >
                                            Keep shopping
                                        </Button>
                                    </Link>
                                </Stack>
                            </Stack>
                    }
                    {cart.data.orders.length > 0 && <Stack
                        spacing={2}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            variant='h5'
                        >
                            You might also like
                        </Typography>
                        <YouMayAlsoLike />
                    </Stack>}
                </Stack>
            </Container>
            :
            <Loader />
    )
}

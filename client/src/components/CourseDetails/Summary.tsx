import { Star } from '@mui/icons-material'
import { AppBar, Box, Button, Slide, Stack, Theme, Toolbar, Typography, useMediaQuery, useScrollTrigger } from '@mui/material'
import { memo, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import ICourseModel from '../../models/course.model'
import { CartState } from '../../redux/reducers/cart.reducer'
import { useAppSelector } from '../../redux/store'

type SummaryProps = {
    values: ICourseModel
}

export default memo(function Summary({ values }: SummaryProps) {
    const laptop = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop'))
    const mobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const trigger = useScrollTrigger({
        disableHysteresis: true
    })

    type RevealOnScrollProps = {
        children: ReactElement
    }

    const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
        return (
            !laptop ?
                <Slide
                    direction='down'
                    in={trigger}
                // mountOnEnter
                // unmountOnExit
                >
                    {children}
                </Slide>
                :
                <Box>
                    {children}
                </Box>
        )
    }

    const courseAsCart: CartState = {
        data: {
            orders: [values],
            totalPrice: values.price,
            totalDiscountedPrice: values.discountedPrice,
            discountPercentage: Math.floor((values.price - values.discountedPrice) / values.price),
            discount: values.price - values.discountedPrice
        }
    }

    const cart = useAppSelector((state) => state.cartReducer)
    const purchases = useAppSelector((state) => state.purchaseReducer)

    const doesCourseExistInCart = cart.data.orders.findIndex((item) => item._id === values._id) !== -1
    const isPurchased = purchases.data.findIndex(course => course._id === values._id) !== -1

    const BuyButton = () => (
        <Link
            to='/checkout'
            state={courseAsCart}
            className='link-unstyled-full'
            style={{
                width: '100%'
            }}
        >
            <Button
                variant='contained'
                sx={{
                    background: theme => theme.palette.common.black,
                    fontFamily: 'UdemySansBold',
                    fontSize: 16,
                    borderRadius: 0,
                    color: '#fff',
                    textTransform: 'none',
                    py: 1.8,
                    px: 1.5,
                    "&:hover": {
                        background: "#000"
                    }
                }}
                fullWidth
                disableElevation
                disableRipple
            >
                Buy now
            </Button>
        </Link>
    )

    return (
        <RevealOnScroll>
            {!doesCourseExistInCart && !isPurchased ? <AppBar
                position='fixed'
                sx={{
                    background: theme => !mobile ? theme.palette.common.black : theme.palette.common.white,
                    zIndex: 2,
                    top: !laptop ? 0 : 'auto',
                    bottom: !laptop ? 'auto' : 0,
                    py: !laptop ? 'auto' : 1.5,
                }}
            >
                <Toolbar>
                    {!mobile ? <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                    >
                        <Stack
                            spacing={0.5}
                        >
                            <Typography
                                fontFamily='UdemySansBold'
                                fontSize={16}
                            >
                                {values.title}
                            </Typography>
                            <Stack
                                direction='row'
                                spacing={1}
                                alignItems='center'
                            >
                                <Box
                                    sx={{
                                        background: "#eceb98",
                                        px: 1,
                                        py: 0.3,
                                        color: '#000'
                                    }}
                                >
                                    <Typography
                                        fontFamily='UdemySansBold'
                                        fontSize={12}
                                    >
                                        Bestseller
                                    </Typography>
                                </Box>
                                <Stack
                                    spacing={0.5}
                                    direction='row'
                                    alignItems='center'
                                >
                                    <Typography
                                        color='#f3ca8c'
                                        fontFamily='UdemySansBold'
                                        fontSize={14}
                                    >
                                        {values.rating}
                                    </Typography>
                                    <Star
                                        sx={{
                                            color: '#f3ca8c',
                                            fontSize: 18
                                        }}
                                    />
                                </Stack>
                                <Typography
                                    component='a'
                                    fontSize={14}
                                    sx={{
                                        textDecoration: 'underline'
                                    }}
                                    color='#cec0fc'
                                >
                                    ({values.totalRatings.toLocaleString()} ratings)
                                </Typography>
                                <Typography
                                    fontSize={14}
                                >
                                    {values.instructors[0].students.toLocaleString()} students
                                </Typography>
                            </Stack>
                        </Stack>
                        {laptop && <Stack
                            direction='row'
                            spacing={2}
                            alignItems='center'
                        >
                            <Stack
                                alignItems='end'
                            >
                                <Typography
                                    fontFamily='UdemySansBold'
                                    fontSize={18}
                                >
                                    ???{values.discountedPrice?.toLocaleString()}
                                </Typography>
                                {values.discountedPrice !== values.price && <Typography
                                    color="#6a6f73"
                                    fontSize={14}
                                    sx={{
                                        textDecoration: 'line-through'
                                    }}
                                >
                                    ???{values.price.toLocaleString()}
                                </Typography>}
                            </Stack>
                            {!doesCourseExistInCart && !isPurchased && <Link
                                to='/checkout'
                                state={courseAsCart}
                                className='link-unstyled-full'
                            >
                                <Button
                                    variant='contained'
                                    sx={{
                                        background: '#fff',
                                        fontFamily: 'UdemySansBold',
                                        fontSize: 16,
                                        borderRadius: 0,
                                        color: '#000',
                                        textTransform: 'none',
                                        py: 1.8,
                                        px: 1.5,
                                        "&:hover": {
                                            background: "#e0e0e0"
                                        }
                                    }}
                                    disableElevation
                                    disableRipple
                                >
                                    Buy now
                                </Button>
                            </Link>}
                        </Stack>}
                    </Stack>
                        :
                        <BuyButton />
                    }
                </Toolbar>
            </AppBar>
                :
                <div></div>
            }
        </RevealOnScroll>
    )
})

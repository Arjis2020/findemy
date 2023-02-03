import { Box, Button, Card, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';
import React from 'react';
import VideoPreview from './VideoPreview';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { CartAction } from '../../redux/reducers/cart.reducer';
import { useNavigate } from 'react-router-dom';
import CourseModel from '../../models/course.model';
import { Link } from 'react-router-dom';
import { LoginAction } from '../../redux/actions/auth.action';

type SummaryCardProps = {
    showVideo?: boolean,
    values: CourseModel,
    onAddToCartClicked: () => void
}

export default function SummaryCard({ showVideo = true, values, onAddToCartClicked }: SummaryCardProps) {
    const discountPercentage = Math.floor(((values.price - values.discountedPrice) / values.price) * 100)

    const cart = useSelector<RootState>((state) => state.cartReducer) as CartAction
    const purchases = useSelector<RootState>((state) => state.purchaseReducer) as CourseModel[]

    const doesCourseExistInCart = cart.orders.findIndex((item) => item._id === values._id) !== -1
    const isPurchased = purchases.findIndex(course => course._id === values._id) !== -1

    const features = [
        {
            title: `${values.totalVideoHours} hours on-demand video`,
            icon: <OndemandVideoIcon />
        },
        {
            title: `${values.totalArticles.toLocaleString()} articles`,
            icon: <InsertDriveFileOutlinedIcon />
        },
        {
            title: `${values.totalDownloadableResources} downloadable resources`,
            icon: <SystemUpdateAltOutlinedIcon />
        },
        {
            title: 'Full lifetime access',
            icon: <AllInclusiveOutlinedIcon />
        },
        {
            title: 'Access on mobile and TV',
            icon: <SmartphoneOutlinedIcon />
        },
        {
            title: 'Assignments',
            icon: <AssignmentIcon />
        },
        {
            title: 'Certificate of completion',
            icon: <EmojiEventsOutlinedIcon />
        },
        {
            title: 'Closed captions',
            icon: <ClosedCaptionOffRoundedIcon />
        }
    ]

    const courseAsCart = {
        orders: [values],
        totalPrice: values.price,
        totalDiscountedPrice: values.discountedPrice,
        discountPercentage: Math.floor((values.price - values.discountedPrice) / values.price),
        discount: values.price - values.discountedPrice
    }
    const navigate = useNavigate()

    return (
        <Card
            sx={{
                borderRadius: 0,
                boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
            }}
            variant='elevation'
        >
            <Stack
                spacing={1}
            >
                {showVideo && <VideoPreview
                    sx={{
                        mt: 0,
                        border: '1px solid #fff'
                    }}
                    course={values}
                />}
                <Stack
                    sx={{
                        px: 2,
                        py: 2.5
                    }}
                    alignItems='center'
                    spacing={3}
                >
                    <Stack
                        spacing={2}
                        alignItems='center'
                        width='100%'
                    >
                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'
                            width='100%'
                        >
                            <Typography
                                fontFamily='UdemySansBold'
                                variant='h4'
                            >
                                ₹{values.discountedPrice}
                            </Typography>
                            {values.discountedPrice !== values.price && <Typography
                                color="#6a6f73"
                                fontSize={16}
                                sx={{
                                    textDecoration: 'line-through'
                                }}
                            >
                                ₹{values.price}
                            </Typography>}
                            {discountPercentage > 0 && <Typography>
                                {discountPercentage}% off
                            </Typography>}
                        </Stack>
                        <Stack
                            spacing={1}
                            width='100%'
                        >
                            {!isPurchased ?
                                <Button
                                    variant='contained'
                                    sx={{
                                        borderRadius: 0,
                                        textTransform: 'none',
                                        fontFamily: 'UdemySansBold',
                                        py: 1.3,
                                        fontSize: 16
                                    }}
                                    onClick={doesCourseExistInCart ? () => navigate('/cart') : onAddToCartClicked}
                                    fullWidth
                                    disableElevation
                                    disableRipple
                                >
                                    {doesCourseExistInCart ? 'Go to cart' : 'Add to cart'}
                                </Button>
                                :
                                <Link
                                    to='/my-learning'
                                    className='link-unstyled-full'
                                >
                                    <Button
                                        variant='contained'
                                        sx={{
                                            borderRadius: 0,
                                            textTransform: 'none',
                                            fontFamily: 'UdemySansBold',
                                            py: 1.3,
                                            fontSize: 16,
                                            background: theme => theme.palette.common.black,
                                            "&:hover": { background: '#000' }
                                        }}
                                        fullWidth
                                        disableElevation
                                        disableRipple
                                    >
                                        Go to course
                                    </Button>
                                </Link>
                            }
                            {!doesCourseExistInCart && !isPurchased && <Link
                                to='/checkout'
                                state={courseAsCart}
                                className='link-unstyled-full'
                            >
                                <Button
                                    variant='outlined'
                                    color='inherit'
                                    sx={{
                                        borderRadius: 0,
                                        textTransform: 'none',
                                        fontFamily: 'UdemySansBold',
                                        py: 1.3,
                                        fontSize: 16
                                    }}
                                    fullWidth
                                    disableRipple
                                    disableElevation
                                >
                                    Buy now
                                </Button>
                            </Link>}
                        </Stack>
                        <Typography
                            variant='caption'
                            color='#000'
                        >
                            30-Day Money-Back Guarantee
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={1.5}
                        width='100%'
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            This course includes:
                        </Typography>
                        <Stack
                            spacing={1}
                        >
                            {features.map((i, index) => {
                                const clonedIcon = React.cloneElement(i.icon, {
                                    sx: {
                                        fontSize: 18
                                    }
                                })
                                return (
                                    <Stack
                                        key={index}
                                        direction='row'
                                        alignItems='center'
                                        spacing={2}
                                    >
                                        {clonedIcon}
                                        <Typography
                                            fontSize={14}
                                        >
                                            {i.title}
                                        </Typography>
                                    </Stack>
                                )
                            })}
                        </Stack>
                    </Stack>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                        px={1}
                    >
                        <Typography
                            fontSize={14}
                            fontFamily='UdemySansBold'
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            Share
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontFamily='UdemySansBold'
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            Gift this course
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontFamily='UdemySansBold'
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            Apply coupon
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}

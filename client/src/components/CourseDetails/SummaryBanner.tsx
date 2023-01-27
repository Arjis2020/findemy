import { StarBorder } from '@mui/icons-material'
import { Box, Button, Rating, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LanguageIcon from '@mui/icons-material/Language';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import './index.css'
import VideoPreview from './VideoPreview';
import CourseModel from '../../models/course.model';
import Ratings from '../Ratings';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { CartAction } from '../../redux/reducers/cart.reducer';

type SummaryBannerProps = {
    values: CourseModel,
    onAddToCartClicked: () => void
}

export default function SummaryBanner({ values, onAddToCartClicked }: SummaryBannerProps) {
    const laptop = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop'))
    const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const discountPercentage = Math.floor(((values.price - values.discountedPrice) / values.price) * 100)
    const navigate = useNavigate()
    const cart = useSelector<RootState>((state) => state.cartReducer) as CartAction

    const doesCourseExistInCart = cart.orders.findIndex((item) => item._id === values._id) !== -1

    const DesktopView = () => {
        return (
            <Stack
                maxWidth='60%'
                spacing={1.5}
                color='#fff'
            >
                <Typography
                    variant='h4'
                    color='#fff'
                    fontFamily='UdemySansBold'
                >
                    {values.title}
                </Typography>
                <Typography
                    fontSize={18}
                >
                    {values.shortDescription}
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
                        <Ratings
                            value={values.rating}
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
                <Stack
                    direction='row'
                    spacing={0.5}
                    alignItems='center'
                    sx={{
                        flexFlow: 'row wrap'
                    }}
                >
                    <Typography
                        fontSize={14}
                    >
                        Created by
                        <span className='course-creators'>
                            {values.instructors.map((instructor, i) => (
                                <>
                                    <Typography
                                        component='a'
                                        fontSize={14}
                                        ml={0.5}
                                        sx={{
                                            textDecoration: 'underline'
                                        }}
                                        color='#cec0fc'>
                                        {instructor.name}
                                    </Typography>{values.instructors.length > 1 && i < values.instructors.length - 1 && ','}
                                </>
                            ))}
                            {/* <Typography
                                component='a'
                                fontSize={14}
                                sx={{
                                    textDecoration: 'underline'
                                }}
                                color='#cec0fc'>
                                Maximillian Schwarmüller
                            </Typography> */}
                        </span>
                    </Typography>
                </Stack>
                <Stack
                    spacing={2}
                    direction='row'
                    alignItems='center'
                >
                    <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                    >
                        <NewReleasesIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                        <Typography
                            fontSize={14}
                        >
                            Last updated 01/23
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                    >
                        <LanguageIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                        <Typography
                            fontSize={14}
                        >
                            English
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                    >
                        <SubtitlesIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                        <Typography
                            fontSize={14}
                        >
                            English [CC], Dutch [Auto]
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        )
    }

    const MobileView = () => {
        return (
            <Stack
                spacing={5}
                maxWidth={!laptop ? '66%' : !tablet ? '70%' : '100%'}
                color='#fff'
            >
                <Stack
                    spacing={1.5}
                >
                    <VideoPreview
                        course={values}
                    />
                    <Typography
                        variant='h4'
                        color='#fff'
                        fontFamily='UdemySansBold'
                    >
                        {values.title}
                    </Typography>
                    <Typography
                        fontSize={18}
                    >
                        {values.shortDescription}
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
                            <Ratings
                                value={values.rating}
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
                            ({values.totalRatings} ratings)
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            {values.instructors[0].students.toLocaleString()} students
                        </Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        spacing={0.5}
                        alignItems='center'
                        sx={{
                            flexFlow: 'row wrap'
                        }}
                    >
                        <Typography
                            fontSize={14}
                        >
                            Created by
                            <span className='course-creators'>
                                {values.instructors.map((instructor, i) => (
                                    <>
                                        <Typography
                                            component='a'
                                            fontSize={14}
                                            ml={0.5}
                                            sx={{
                                                textDecoration: 'underline'
                                            }}
                                            color='#cec0fc'>
                                            {instructor.name}
                                        </Typography>{values.instructors.length > 1 && i < values.instructors.length - 1 && ','}
                                    </>
                                ))}
                                {/* <Typography
                                component='a'
                                fontSize={14}
                                sx={{
                                    textDecoration: 'underline'
                                }}
                                color='#cec0fc'>
                                Maximillian Schwarmüller
                            </Typography> */}
                            </span>
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={1}
                    // direction='row'
                    // alignItems='center'
                    >
                        <Stack
                            spacing={1}
                            direction='row'
                            alignItems='center'
                        >
                            <NewReleasesIcon
                                sx={{
                                    fontSize: 16
                                }}
                            />
                            <Typography
                                fontSize={14}
                            >
                                Last updated 01/23
                            </Typography>
                        </Stack>
                        <Stack
                            spacing={1}
                            direction='row'
                            alignItems='center'
                        >
                            <LanguageIcon
                                sx={{
                                    fontSize: 16
                                }}
                            />
                            <Typography
                                fontSize={14}
                            >
                                English
                            </Typography>
                        </Stack>
                        <Stack
                            spacing={1}
                            direction='row'
                            alignItems='center'
                        >
                            <SubtitlesIcon
                                sx={{
                                    fontSize: 16
                                }}
                            />
                            <Typography
                                fontSize={14}
                            >
                                English [CC], Dutch [Auto]
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>
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
                            ₹{values.discountedPrice.toLocaleString()}
                        </Typography>
                        {values.discountedPrice !== values.price && <Typography
                            color="#6a6f73"
                            fontSize={16}
                            sx={{
                                textDecoration: 'line-through'
                            }}
                        >
                            ₹{values.price.toLocaleString()}
                        </Typography>}
                        {values.discountedPrice !== values.price && <Typography>
                            {discountPercentage}% off
                        </Typography>}
                    </Stack>
                    <Stack
                        spacing={1}
                        width='100%'
                    >
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
                    </Stack>
                    <Stack
                        spacing={0.5}
                        alignItems='center'
                    >
                        <Typography
                            variant='caption'
                        >
                            30-Day Money-Back Guarantee
                        </Typography>
                        <Typography
                            variant='caption'
                        >
                            Full Lifetime Access
                        </Typography>
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
        )
    }

    return (
        <Stack
            sx={{
                background: theme => theme.palette.common.black
            }}
            pl={!laptop ? 15 : !tablet ? 7.5 : 2}
            pr={!laptop ? 8 : !tablet ? 7.5 : 2}
            py={4}
            alignItems={!laptop ? 'stretch' : 'center'}
        >
            {!laptop ?
                <DesktopView />
                :
                <MobileView />
            }
        </Stack>
    )
}

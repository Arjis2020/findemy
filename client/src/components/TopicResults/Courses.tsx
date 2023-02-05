import { Box, Button, Stack, Theme, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ICourseModel from "../../models/course.model";
// import { triggerAddToCart } from "../../redux/actions/cart.action";
import { RootState } from "../../redux/reducers";
import { CartState, triggerAddToCart } from "../../redux/reducers/cart.reducer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import StyledTooltip from "../GlobalStyles/StyledTooltip";
import Ratings from "../Ratings";
import SearchResultTooltip from "../Tooltips/SearchResultTooltip";

type SearchResultCourseProps = {
    course: ICourseModel,
}

export default function Courses({ course }: SearchResultCourseProps) {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const levels = (() => {
        if (course.levels.length === 3) return 'All levels'
        else return course.levels[0]
    })()


    const cart = useSelector<RootState>((state) => state.cartReducer) as CartState
    const user = useAppSelector((state) => state.authReducer)
    const purchases = useAppSelector((state) => state.purchaseReducer)

    const doesCourseExistInCart = cart.data.orders.findIndex((item) => item._id === course._id) !== -1
    const isPurchased = purchases.data.findIndex(item => item._id === course._id) !== -1

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onAddToCartClicked = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!user.data?._id) navigate('/login')
        if (doesCourseExistInCart) navigate('/cart')
        else dispatch(triggerAddToCart(course._id))
    }

    const DesktopView = () => (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'start'}
        >
            <Stack
                direction='row'
                spacing={2}
                alignItems='start'
            >
                <img
                    src={course.imageUrl}
                    width={260}
                    height={145}
                    style={{

                        objectFit: 'cover'
                    }}
                />
                <Stack
                    maxWidth='60%'
                    alignItems='start'
                    height='100%'
                >
                    <Typography
                        fontSize={16}
                        fontFamily='UdemySansBold'
                    >
                        {course.title}
                    </Typography>
                    <Typography
                        variant='body2'
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {course.shortDescription}
                    </Typography>
                    <Typography
                        variant='caption'
                        color="#6a6f73"
                        textOverflow='ellipsis'
                        noWrap
                        maxWidth='70%'
                    >
                        {course.instructors.map(i => i.name).join(', ')}
                    </Typography>
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={0.5}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            color='#b4690e'
                            fontSize={15}
                        >
                            {course.rating}
                        </Typography>
                        <Ratings
                            value={course.rating}
                        />
                        <Typography
                            color="#6a6f73"
                            fontSize='12px'
                        >
                            ({course.totalRatings.toLocaleString()})
                        </Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        spacing={0.5}
                        alignItems='center'
                    >
                        <Typography
                            variant='caption'
                        >
                            {course.totalHours} total hours
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            {course.totalArticles} lectures
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            {levels}
                        </Typography>
                    </Stack>
                    <Box
                        sx={{
                            background: "#eceb98",
                            px: 1,
                            py: 0.3,
                            mt: 1
                        }}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            fontSize={12}
                        >
                            Bestseller
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
            <Stack
                alignItems='end'
                justifyContent='start'
                height='100%'
            >
                <Typography
                    fontFamily='UdemySansBold'
                >
                    ₹{course.discountedPrice.toLocaleString()}
                </Typography>
                {course.discountedPrice !== course.price && <Typography
                    color="#6a6f73"
                    fontSize={14}
                    sx={{
                        textDecoration: 'line-through'
                    }}
                >
                    ₹{course.price.toLocaleString()}
                </Typography>}
            </Stack>
        </Stack>
    )

    const MobileView = () => (
        <Stack
            direction={'column'}
            justifyContent={'start'}
            alignItems={'start'}
        >
            <Stack
                direction='row'
                spacing={1}
                alignItems='start'
                width='100%'
            >
                <img
                    src={course.imageUrl}
                    width={60}
                    height={60}
                    style={{
                        objectFit: 'cover'
                    }}
                />
                <Stack
                    alignItems='start'
                    width='80%'
                >
                    <Typography
                        fontSize={16}
                        fontFamily='UdemySansBold'
                    >
                        {course.title}
                    </Typography>
                    <Typography
                        variant='caption'
                        color="#6a6f73"
                        textOverflow='ellipsis'
                        noWrap
                        maxWidth='80%'
                    >
                        {course.instructors.map(i => i.name).join(', ')}
                    </Typography>
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={0.5}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            color='#b4690e'
                            fontSize={15}
                        >
                            {course.rating}
                        </Typography>
                        <Ratings
                            value={course.rating}
                        />
                        <Typography
                            color="#6a6f73"
                            fontSize='12px'
                        >
                            {course.totalRatings}
                        </Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        spacing={0.5}
                        alignItems='center'
                    >
                        <Typography
                            variant='caption'
                        >
                            {course.totalHours} total hours
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            {course.totalArticles} lectures
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            {levels}
                        </Typography>
                    </Stack>
                    <Stack
                        alignItems='center'
                        justifyContent='start'
                        height='100%'
                        direction='row'
                        spacing={1}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            ₹{course.discountedPrice.toLocaleString()}
                        </Typography>
                        {course.discountedPrice !== course.price && <Typography
                            color="#6a6f73"
                            fontSize={14}
                            sx={{
                                textDecoration: 'line-through'
                            }}
                        >
                            ₹{course.price.toLocaleString()}
                        </Typography>}
                    </Stack>
                    <Box
                        sx={{
                            background: "#eceb98",
                            px: 1,
                            py: 0.3,
                            mt: 1
                        }}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            fontSize={12}
                        >
                            Bestseller
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Stack>
    )

    return (
        <Box>
            {matches ?
                <MobileView />
                :
                <StyledTooltip
                    arrow
                    title={
                        <SearchResultTooltip
                            learnings={course.learnings}
                            doesCourseExistInCart={doesCourseExistInCart}
                            isPurchased={isPurchased}
                            onAddToCartClicked={onAddToCartClicked}
                        />
                    }
                >
                    <Box
                        sx={{
                            transition: '0.3s ease all',
                            "&:hover": {
                                opacity: 0.8
                            }
                        }}
                    >
                        <DesktopView />
                    </Box>
                </StyledTooltip>
            }
        </Box>
    )
}
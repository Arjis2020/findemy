import { StarBorder } from "@mui/icons-material";
import { Box, Rating, Stack, Theme, Typography, useMediaQuery } from "@mui/material";

type SearchResultCourseProps = {
    course: Course
}

export default function Courses({ course }: SearchResultCourseProps) {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

    const levels = (() => {
        if (course.levels.length === 3) return 'All levels'
        else return course.levels[0]
    })()

    const DesktopView = () => (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
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
                    <span>
                        {course.instructors.map((instructor, i) => (
                            <>
                                <Typography
                                    variant='caption'
                                    color="#6a6f73"
                                    textOverflow='ellipsis'
                                    noWrap
                                    maxWidth='70%'
                                >
                                    {instructor.name}
                                </Typography>{course.instructors.length > 1 && i < course.instructors.length - 1 && ', '}
                            </>
                        ))}
                    </span>
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
                        <Rating
                            value={course.rating}
                            readOnly
                            precision={0.5}
                            size='small'
                            sx={{
                                color: '#e59819',
                                fontSize: 15
                            }}
                            emptyIcon={
                                <StarBorder
                                    fontSize='inherit'
                                    sx={{
                                        color: '#e59819'
                                    }}
                                />
                            }
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
                    <span>
                        {course.instructors.map((instructor, i) => (
                            <>
                                <Typography
                                    variant='caption'
                                    color="#6a6f73"
                                    textOverflow='ellipsis'
                                    noWrap
                                    maxWidth='80%'
                                >
                                    {instructor.name}
                                </Typography>{course.instructors.length > 1 && i < course.instructors.length - 1 && ', '}
                            </>
                        ))}
                    </span>
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
                        <Rating
                            value={course.rating}
                            readOnly
                            precision={0.5}
                            size='small'
                            sx={{
                                color: '#e59819',
                                fontSize: 15
                            }}
                            emptyIcon={
                                <StarBorder
                                    fontSize='inherit'
                                    sx={{
                                        color: '#e59819'
                                    }}
                                />
                            }
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
                <DesktopView />}
        </Box>
    )
}
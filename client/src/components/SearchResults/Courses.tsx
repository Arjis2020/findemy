import { Box, Rating, Stack, Theme, Typography, useMediaQuery } from "@mui/material";

export default function Courses() {

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

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
                    src="https://img-b.udemycdn.com/course/480x270/1362070_b9a1_2.jpg"
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
                        React - The Complete Guide (incl Hooks, React Router, Redux)
                    </Typography>
                    <Typography
                        variant='body2'
                    >
                        Dive in and learn React.js from scratch! Learn reactjs, Hooks, Redux, React Routing, Animations, Next.js and more!
                    </Typography>
                    <Typography
                        variant='caption'
                        color="#6a6f73"
                        textOverflow='ellipsis'
                        noWrap
                        maxWidth='70%'
                    >
                        Academind by Maxmillan Schwarzmüller, Maxmillan Schwarzmüller
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
                            {/* {data.rating} */}4.5
                        </Typography>
                        <Rating
                            value={4.5}
                            readOnly
                            precision={0.5}
                            size='small'
                            sx={{
                                color: '#e59819',
                                fontSize: 15
                            }}
                        />
                        <Typography
                            color="#6a6f73"
                            fontSize='12px'
                        >
                            {/* ({data.total_reviews.toLocaleString()}) */}(173,315)
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
                            49.5 total hours
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            49 lectures
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            All levels
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
                    ₹449
                </Typography>
                <Typography
                    color="#6a6f73"
                    fontSize={14}
                    sx={{
                        textDecoration: 'line-through'
                    }}
                >
                    ₹3,499
                </Typography>
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
                    src="https://img-b.udemycdn.com/course/480x270/1362070_b9a1_2.jpg"
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
                        React - The Complete Guide (incl Hooks, React Router, Redux)
                    </Typography>
                    <Typography
                        variant='caption'
                        color="#6a6f73"
                        textOverflow='ellipsis'
                        noWrap
                        maxWidth='80%'
                    >
                        Academind by Maxmillan Schwarzmüller, Maxmillan Schwarzmüller
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
                            {/* {data.rating} */}4.5
                        </Typography>
                        <Rating
                            value={4.5}
                            readOnly
                            precision={0.5}
                            size='small'
                            sx={{
                                color: '#e59819',
                                fontSize: 15
                            }}
                        />
                        <Typography
                            color="#6a6f73"
                            fontSize='12px'
                        >
                            {/* ({data.total_reviews.toLocaleString()}) */}(173,315)
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
                            49.5 total hours
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            49 lectures
                        </Typography>
                        <p>
                            &bull;
                        </p>
                        <Typography
                            variant='caption'
                        >
                            All levels
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
                            ₹449
                        </Typography>
                        <Typography
                            color="#6a6f73"
                            fontSize={14}
                            sx={{
                                textDecoration: 'line-through'
                            }}
                        >
                            ₹3,499
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

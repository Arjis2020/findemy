import { Box, Card, IconButton, Rating, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import CarouselData from '../../carousel.data.json'
import GridCarousel from 'react-grid-carousel'
import { ArrowBackIosSharp, ArrowForwardIosSharp } from '@mui/icons-material'

export default function YouMayAlsoLike() {
    const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.up('tablet'))
    const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop'))

    const datasetLength = desktop ? 5 : tablet ? 3 : 1

    return (
        <GridCarousel
            gap={15}
            cols={datasetLength}
            rows={1}
            mobileBreakpoint={0}
            containerStyle={{
                marginInline: '-15px'
            }}
            arrowRight={
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 'calc(50% - 100px)',
                        left: 'initial',
                        right: 0,
                        background: theme => theme.palette.common.black,
                        height: '3rem',
                        width: '3rem',
                        border: '1px solid #6a6f73',
                        "&:hover": {
                            background: "#000"
                        },
                        zIndex: 10
                    }}
                >
                    <ArrowForwardIosSharp
                        sx={{
                            color: '#fff'
                        }}
                        fontSize='small'
                    />
                </IconButton>
            }
            arrowLeft={
                <IconButton
                    sx={{
                        zIndex: 10,
                        position: 'absolute',
                        top: 'calc(50% - 100px)',
                        right: 'initial',
                        left: 0,
                        background: theme => theme.palette.common.black,
                        height: '3rem',
                        width: '3rem',
                        border: '1px solid #6a6f73',
                        "&:hover": {
                            background: "#000"
                        }
                    }}
                >
                    <ArrowBackIosSharp
                        sx={{
                            color: '#fff'
                        }}
                        fontSize='small'
                    />
                </IconButton>
            }
        >
            {CarouselData.map((data) => {
                return (
                    <GridCarousel.Item>
                        <Card
                            sx={{
                                minWidth: '15rem',
                                maxWidth: '37.5rem',
                                background: 'none'
                            }}
                            elevation={0}
                        >
                            <img
                                src={data.img}
                                style={{
                                    width: '100%'
                                }}
                                alt='course-img'
                            />
                            <Stack
                                sx={{
                                    width: '100%'
                                }}
                                alignItems='start'
                            >
                                <Typography
                                    fontFamily='UdemySansBold'
                                >
                                    {data.title}
                                </Typography>
                                <Typography
                                    variant='caption'
                                    color="#6a6f73"
                                    textOverflow='ellipsis'
                                    noWrap
                                    maxWidth='15rem'
                                >
                                    {data.author}
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
                                        {data.rating}
                                    </Typography>
                                    <Rating
                                        value={data.rating}
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
                                        ({data.total_reviews.toLocaleString()})
                                    </Typography>
                                </Stack>
                                <Stack
                                    direction='row'
                                    spacing={1}
                                    alignItems='center'
                                >
                                    <Typography
                                        fontFamily='UdemySansBold'
                                    >
                                        ₹{data.price}
                                    </Typography>
                                    <Typography
                                        color="#6a6f73"
                                        fontSize={14}
                                        sx={{
                                            textDecoration: 'line-through'
                                        }}
                                    >
                                        ₹{data.real_price}
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
                        </Card>
                    </GridCarousel.Item>
                )
            })}
        </GridCarousel>
    )
}

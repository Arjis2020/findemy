import { Box, Card, CardActionArea, IconButton, Rating, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import CarouselData from '../../carousel.data.json'
import GridCarousel from 'react-grid-carousel'
import { ArrowBackIosSharp, ArrowForwardIosSharp, StarBorder } from '@mui/icons-material'
import { CourseAction, triggerCoursesRetrieval } from '../../redux/actions/course.action'
import { useEffect } from 'react'
import { RootState } from '../../redux/reducers'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function YouMayAlsoLike() {
    const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.up('tablet'))
    const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop'))

    const courses = useSelector<RootState>((state) => state.courseReducer) as CourseAction

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
            {courses.data.map((data) => {
                return (
                    <GridCarousel.Item>
                        <Card
                            sx={{
                                minWidth: '15rem',
                                maxWidth: '37.5rem',
                                background: 'none',
                                borderRadius: 0,
                                height: '100%',
                            }}
                            elevation={0}
                        >
                            <Link
                                to={`/course${data.slug}`}
                                className='link-unstyled-full'
                            >
                                <CardActionArea
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        ".MuiCardActionArea-focusHighlight": {
                                            background: 'none'
                                        }
                                    }}
                                    disableRipple
                                >
                                    <img
                                        src={data.imageUrl}
                                        style={{
                                            width: '100%'
                                        }}
                                        alt='course-img'
                                    />
                                    <Stack
                                        flex={1}
                                        sx={{
                                            width: '100%',
                                        }}
                                        alignItems='start'
                                        justifyContent='space-between'
                                    >
                                        <Stack
                                            alignItems='start'
                                        >
                                            <Typography
                                                fontFamily='UdemySansBold'
                                            >
                                                {data.title}
                                            </Typography>
                                            <span>
                                                {data.instructors.map((instructor, i) => (
                                                    <>
                                                        <Typography
                                                            variant='caption'
                                                            color="#6a6f73"
                                                            textOverflow='ellipsis'
                                                            noWrap
                                                            maxWidth='15rem'
                                                        >
                                                            {instructor.name}
                                                        </Typography>{data.instructors.length > 1 && i < data.instructors.length - 1 && ', '}
                                                    </>
                                                ))}
                                            </span>
                                        </Stack>
                                        <Stack
                                            alignItems='start'
                                        >
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
                                                    ({data.totalRatings.toLocaleString()})
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
                                                    ₹{data.discountedPrice}
                                                </Typography>
                                                {data.discountedPrice !== data.price &&
                                                    <Typography
                                                        color="#6a6f73"
                                                        fontSize={14}
                                                        sx={{
                                                            textDecoration: 'line-through'
                                                        }}
                                                    >
                                                        ₹{data.price}
                                                    </Typography>
                                                }
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
                                </CardActionArea>
                            </Link>
                        </Card>
                    </GridCarousel.Item>
                )
            })}
        </GridCarousel>
    )
}

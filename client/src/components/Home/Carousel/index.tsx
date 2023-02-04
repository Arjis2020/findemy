import { Box, Card, CardActionArea, IconButton, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import GridCarousel from 'react-grid-carousel'
import { ArrowBackIosSharp, ArrowForwardIosSharp } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/reducers'
import { CourseAction, triggerCoursesRetrieval } from '../../../redux/actions/course.action'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../Loader'
import ICourseModel from '../../../models/course.model'
import Ratings from '../../Ratings'
import { fetchCourses } from '../../../redux/reducers/course.reducer'
import { useAppDispatch, useAppSelector } from '../../../redux/store'

export default function Carousel() {
    const tablet = useMediaQuery((theme: Theme) => theme.breakpoints.up('tablet'))
    const desktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('desktop'))

    const dispatch = useAppDispatch()

    const courses = useAppSelector((state) => state.courseReducer)

    useEffect(() => {
        dispatch(fetchCourses())
    }, [])

    const datasetLength = desktop ? 5 : tablet ? 3 : 1

    return (
        courses.isLoading ?
            <Loader
                sx={{
                    height: 'auto'
                }}
            />
            :
            <GridCarousel
                containerClassName='grid-carousel-container'
                gap={15}
                cols={datasetLength}
                rows={1}
                mobileBreakpoint={0}
                containerStyle={{
                    marginInline: '45px',
                    borderRadius: 0
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
                {courses.data.map((data: ICourseModel) => {
                    return (
                        <GridCarousel.Item
                            key={data._id}
                        >
                            <Card
                                sx={{
                                    minWidth: '15rem',
                                    maxWidth: '37.5rem',
                                    background: 'none',
                                    borderRadius: 0,
                                    height: '100%'
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
                                                <Typography
                                                    variant='caption'
                                                    color="#6a6f73"
                                                    textOverflow='ellipsis'
                                                    noWrap
                                                    maxWidth='15rem'
                                                >
                                                    {data.instructors.map(i => i.name).join(', ')}
                                                </Typography>
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
                                                    <Ratings
                                                        value={data.rating}
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

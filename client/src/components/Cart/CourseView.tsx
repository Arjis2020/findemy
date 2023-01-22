import { StarBorder } from '@mui/icons-material'
import { Box, Button, Rating, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { triggerRemoveFromCart } from '../../redux/actions/cart.action';

type CourseViewProps = {
    item: Course
}

export default function CourseView({ item }: CourseViewProps) {
    const downDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.down('desktop'))
    const downTablet = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet'))

    const levels = (() => {
        if (item.levels.length === 3) return 'All'
        else return item.levels.join(', ')
    })()

    const dispatch = useDispatch()

    const handleRemoveClicked = () => {
        dispatch(triggerRemoveFromCart(item._id))
    }

    return (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='start'
            py={3.5}
            width='100%'
            flex={1}
        >
            <Link
                to={`/course${item.slug}`}
                className='link-unstyled-full'
            >
                <Stack
                    spacing={2}
                    direction='row'
                    alignItems='start'
                    width='100%'
                >
                    <img
                        src={item.imageUrl}
                        style={{
                            height: !downDesktop ? '4.2rem' : '3rem',
                            width: !downTablet ? '7.5rem' : '3rem',
                            objectFit: 'cover'
                        }}
                    />
                    <Stack
                        width='100%'
                    >
                        <Stack
                            spacing={0.5}
                        >
                            <Typography
                                fontFamily='UdemySansBold'
                                lineHeight={1}
                                maxWidth={!downTablet ? '70%' : '90%'}
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                fontSize={12}
                            >
                                By {item.instructors.map((instructor, i) => (
                                    <span>
                                        {instructor.name}{i < item.instructors.length - 1 ? ', ' : ''}
                                    </span>
                                ))}
                            </Typography>
                        </Stack>
                        {downDesktop && <Stack
                            spacing={0.5}
                            direction='row'
                            alignItems='center'
                            width='100%'
                        >
                            <Typography
                                color='#b4690e'
                                fontFamily='UdemySansBold'
                                fontSize={14}
                            >
                                {item.rating}
                            </Typography>
                            <Rating
                                value={item.rating}
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
                                ({item.totalRatings.toLocaleString()} ratings)
                            </Typography>
                        </Stack>}
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing={1}
                            mt={1}
                        >
                            <Box
                                sx={{
                                    background: "#eceb98",
                                    px: 1,
                                    py: 0.3,
                                    color: '#000',
                                }}
                            >
                                <Typography
                                    fontFamily='UdemySansBold'
                                    fontSize={12}
                                >
                                    Bestseller
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    background: "#acd2cc",
                                    px: 1,
                                    py: 0.3,
                                    color: '#000',
                                    mt: 1
                                }}
                            >
                                <Typography
                                    fontFamily='UdemySansBold'
                                    fontSize={12}
                                    whiteSpace='nowrap'
                                >
                                    Updated Recently
                                </Typography>
                            </Box>
                            {!downDesktop && <Stack
                                spacing={0.5}
                                direction='row'
                                alignItems='center'
                            >
                                <Typography
                                    color='#b4690e'
                                    fontFamily='UdemySansBold'
                                    fontSize={14}
                                >
                                    {item.rating}
                                </Typography>
                                <Rating
                                    value={item.rating}
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
                            </Stack>}
                            {!downDesktop && <Typography
                                color="#6a6f73"
                                fontSize='12px'
                            >
                                ({item.totalRatings.toLocaleString()} ratings)
                            </Typography>}
                        </Stack>
                        <Stack
                            direction='row'
                            spacing={0.5}
                            alignItems='center'
                            mt={0.8}
                            flex={1}
                            // width='100%'
                            // flexWrap='wrap'
                        >
                            <Typography
                                variant='caption'
                                // whiteSpace='nowrap'
                            >
                                {item.totalHours} total hours
                            </Typography>
                            <p>
                                &bull;
                            </p>
                            <Typography
                                variant='caption'
                                // whiteSpace='nowrap'
                            >
                                {item.lectures} lectures
                            </Typography>
                            <p>
                                &bull;
                            </p>
                            <Typography
                                variant='caption'
                                // whiteSpace='nowrap'
                            >
                                {levels} levels
                            </Typography>
                        </Stack>
                        {downDesktop && <Stack
                            spacing={1}
                            alignItems='center'
                            direction='row'
                            mt={1}
                        >
                            <Button
                                variant='text'
                                sx={{
                                    background: 'none',
                                    "&:hover": {
                                        background: 'none'
                                    },
                                    p: 0,
                                    minWidth: 0,
                                    textTransform: 'none',
                                    fontSize: 14
                                }}
                                disableRipple
                                disableElevation
                                onClick={handleRemoveClicked}
                            >
                                <Typography
                                    component='a'
                                    fontSize='inherit'
                                >
                                    Remove
                                </Typography>
                            </Button>
                            <Typography
                                component='a'
                                fontSize={14}
                            >
                                Save for Later
                            </Typography>
                        </Stack>}
                    </Stack>
                </Stack>
            </Link>
            <Stack
                direction='row'
                alignItems='start'
                spacing={6}
            >
                {!downDesktop && <Stack
                    spacing={1}
                    alignItems='end'
                >
                    <Button
                        variant='text'
                        sx={{
                            background: 'none',
                            "&:hover": {
                                background: 'none'
                            },
                            p: 0,
                            minWidth: 0,
                            textTransform: 'none',
                            fontSize: 14
                        }}
                        disableRipple
                        disableElevation
                        onClick={handleRemoveClicked}
                    >
                        <Typography
                            component='a'
                            fontSize='inherit'
                        >
                            Remove
                        </Typography>
                    </Button>
                    <Typography
                        component='a'
                        fontSize={14}
                    >
                        Save for Later
                    </Typography>
                </Stack>}
                <Stack
                    alignItems='end'
                >
                    <Stack
                        direction='row'
                        alignItems='center'
                        spacing={0.5}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            sx={{
                                color: '#a435f0'
                            }}
                        >
                            ₹{item.discountedPrice.toLocaleString()}
                        </Typography>
                        <LocalOfferIcon
                            sx={{
                                color: '#a435f0',
                                fontSize: 16
                            }}
                        />
                    </Stack>
                    {item.discountedPrice !== item.price && <Typography
                        color="#6a6f73"
                        fontSize={14}
                        sx={{
                            textDecoration: 'line-through',
                            mr: '35%'
                        }}
                    >
                        ₹{item.price.toLocaleString()}
                    </Typography>}
                </Stack>
            </Stack>
        </Stack>
    )
}

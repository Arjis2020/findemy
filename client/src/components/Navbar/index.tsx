import { AppBar, Avatar, Box, Button, Divider, IconButton, Stack, SwipeableDrawer, TextField, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material'
import Cart from './Cart'
import Languages from './Languages'
import Login from './Login'
import Search, { ISearchForm } from './Search'
import Signup from './Signup'
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useEffect, useState } from 'react'
import { ArrowForwardIosSharp, Close } from '@mui/icons-material'
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants'
import UserAvatar from './UserAvatar'
import Notification from './Notification'
import MyLearning from './MyLearning'
import './index.css'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppSelector } from '../../redux/store'
import Loader from '../Loader'

export default function Header() {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))
    const [open, setOpen] = useState<boolean>(false)
    const user = useAppSelector((state) => state.authReducer)

    const { handleSubmit, register } = useForm<ISearchForm>()

    const location = useLocation()
    const navigate = useNavigate()

    const [mobileSearchVisibility, setMobileSearchVisibility] = useState<boolean>(false)

    const whitelistedAppbarRelativeRoutes = [
        '/course'
    ]

    const shouldPositionRelative = whitelistedAppbarRelativeRoutes.includes("/" + location.pathname.split('/')[1])

    const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(!open);
    }

    const onSearch: SubmitHandler<ISearchForm> = (values) => {
        navigate(`/search?q=${values.search}&page=1`)
        setMobileSearchVisibility(false)
    }

    const PopularItems = ({
        title
    }: {
        title: string
    }) => {
        return (
            <Stack
                direction='row'
                width='100%'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    maxWidth={200}
                >
                    {title}
                </Typography>
                <ArrowForwardIosSharp
                    sx={{
                        fontSize: 14
                    }}
                />
            </Stack>
        )
    }

    const MobileSearch = () => (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                right: 0,
                left: 0,
                zIndex: 9999,
                background: 'white',
            }}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                p={2}
                alignItems='center'
                width='100%'
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                >
                    <SearchIcon
                        sx={{
                            color: '#000'
                        }}
                    />
                    <form
                        style={{
                            width: '100%',
                        }}
                        onSubmit={handleSubmit(onSearch)}
                    >
                        <TextField
                            variant='standard'
                            placeholder='Search for anything'
                            autoComplete='off'
                            InputProps={{
                                disableUnderline: true
                            }}
                            fullWidth
                            {...register('search', {
                                required: true,
                                minLength: 3
                            })}
                        />
                        <input type='submit' hidden />
                    </form>
                </Stack>
                <IconButton
                    disableRipple
                    onClick={() => setMobileSearchVisibility(false)}
                >
                    <Close
                        sx={{
                            color: '#000'
                        }}
                    />
                </IconButton>
            </Stack>
            <Divider flexItem />
        </Box>
    )

    const DesktopView = () => (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
        >
            <Stack
                direction='row'
                spacing={5}
                alignItems='center'
                width='fit-content'
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontWeight={600}
                    variant='h5'
                >
                    <Link
                        to='/'
                        style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}
                    >
                        {APP_NAME}
                    </Link>
                </Typography>
                <Search
                    onSearch={onSearch}
                />
            </Stack>
            {
                user.isLoading ?
                    <Loader
                        sx={{
                            height: 'auto',
                            mt: 0
                        }}
                        size={30}
                    />
                    :
                    !user.data._id ?
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing={1}
                        >
                            <Cart />
                            <Login />
                            <Signup />
                            <Languages />
                        </Stack>
                        :
                        <Stack
                            direction='row'
                            alignItems='center'
                            spacing={2}
                        >
                            <MyLearning />
                            <Cart />
                            <Notification />
                            <UserAvatar
                                name={user.data.name}
                            />
                        </Stack>
            }
        </Stack>
    )

    const MobileView = () => (
        mobileSearchVisibility ?
            <MobileSearch />
            :
            <Fragment
                key='left'
            >
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='center'
                    width='100%'
                >
                    <IconButton
                        onClick={toggleDrawer}
                    >
                        <MenuIcon
                            sx={{
                                color: '#000'
                            }}
                        />
                    </IconButton>
                    <Typography
                        fontFamily='UdemySansBold'
                        variant='h5'
                        fontWeight={600}
                    >
                        <Link
                            to='/'
                            style={{
                                textDecoration: 'none',
                                color: 'inherit'
                            }}
                        >
                            {APP_NAME}
                        </Link>
                    </Typography>
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <IconButton
                            onClick={() => setMobileSearchVisibility(true)}
                        >
                            <SearchIcon
                                sx={{
                                    color: '#000'
                                }}
                            />
                        </IconButton>
                        <IconButton>
                            <Cart />
                        </IconButton>
                    </Stack>
                </Stack>
            </Fragment>
    )

    const MenuDrawer = (
        <SwipeableDrawer
            anchor='left'
            open={open}
            onOpen={toggleDrawer}
            onClose={toggleDrawer}
            PaperProps={{
                sx: {
                    width: '18rem',
                    overflow: 'hidden auto',
                    alignItems: 'start'
                }
            }}
        >
            <Stack
                // spacing={1}
                divider={<Divider />}
                width='100%'
            >
                {
                    user.isLoading ?
                        <Loader
                            sx={{
                                height: 'auto',
                                mt: 0
                            }}
                            size={30}
                        />
                        :
                        !user.data._id && <Stack
                            spacing={1}
                            px={2}
                            py={1}
                        >
                            <Typography>
                                <Link
                                    to='/login'
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                    onClick={toggleDrawer}
                                >
                                    Log in
                                </Link>
                            </Typography>
                            <Typography>
                                <Link
                                    to='/signup'
                                    style={{
                                        textDecoration: 'none'
                                    }}
                                    onClick={toggleDrawer}
                                >
                                    Sign up
                                </Link>
                            </Typography>
                        </Stack>
                }
                {
                    user.isLoading ?
                        <Loader
                            sx={{
                                height: 'auto',
                                mt: 0
                            }}
                            size={30}
                        />
                        :
                        user.data._id && <Stack
                            divider={<Divider />}
                        >
                            <Stack
                                px={2}
                                py={1}
                                direction='row'
                                spacing={1}
                                alignItems='center'
                                sx={{
                                    background: '#f7f9fa'
                                }}
                            >
                                <Avatar
                                    sx={{
                                        height: 65,
                                        width: 65,
                                        background: '#000',
                                        fontSize: 24,
                                        fontFamily: 'UdemySansBold'
                                    }}
                                >
                                    {(user.data?.name.charAt(0) + user.data?.name.split(' ')[1].charAt(0)).toUpperCase()}
                                </Avatar>
                                <Stack>
                                    <Typography
                                        fontFamily='UdemySansBold'
                                    >
                                        Hi, {user.data.name}
                                    </Typography>
                                    <Typography
                                        variant='caption'
                                    >
                                        Welcome back
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                px={2}
                                py={2}
                                spacing={1}
                            >
                                <Typography
                                    fontFamily='UdemySansBold'
                                    color='#6a6f73'
                                    fontSize={14}
                                >
                                    Learn
                                </Typography>
                                <Link
                                    to='/my-learning'
                                    className='link-unstyled'
                                >
                                    <Typography>
                                        My learning
                                    </Typography>
                                </Link>
                            </Stack>
                        </Stack>
                }
                <Stack
                    mt={1}
                    spacing={1}
                    py={1}
                    px={2}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        color='#6a6f73'
                        fontSize={14}
                    >
                        Most popular
                    </Typography>
                    <Stack
                        spacing={2}
                    >
                        {['Web Development',
                            'Mobile Development',
                            'Game Development',
                            'Entrepreneurship',
                            'Business Analytics & Intelligence',
                            'Digital Marketing',
                            'Graphic Design & Illustration',
                            'IT Certifications',
                            'Personal Transformation',
                            'All categories'
                        ].map((title: string) => {
                            return (
                                <PopularItems
                                    key={title}
                                    title={title}
                                />
                            )
                        })}
                    </Stack>
                </Stack>
                <Stack
                    px={2}
                    py={1}
                    spacing={1}
                    alignItems='start'
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        color='#6a6f73'
                        fontSize={14}
                    >
                        More from Udemy
                    </Typography>
                    <Stack
                        spacing={1.5}
                    >
                        <Typography>
                            Udemy Business
                        </Typography>
                        <Typography>
                            Get the app
                        </Typography>
                        <Typography>
                            Invite friends
                        </Typography>
                        <Typography>
                            Help
                        </Typography>
                        <Button
                            sx={{
                                border: '1px solid #000',
                                minWidth: 0,
                                borderRadius: 0,
                                color: 'inherit',
                                fontSize: 16,
                                p: 0,
                                textTransform: 'none',

                            }}
                        >
                            <Stack
                                direction='row'
                                spacing={1}
                                sx={{
                                    width: '100%',
                                    p: 0.8,
                                    pr: '1.6rem'
                                }}
                            >
                                <LanguageIcon />
                                <Typography
                                    fontSize={16}
                                >
                                    English
                                </Typography>
                            </Stack>
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </SwipeableDrawer>
    )

    const CheckoutView = () => (
        <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            width='100%'
        >
            <Typography
                fontFamily='UdemySansBold'
            >
                {APP_NAME}
            </Typography>
            <Button
                variant='text'
                sx={{
                    textTransform: 'none',
                    fontFamily: 'UdemySansBold',
                    color: '#5624d0',
                    background: 'none',
                    "&:hover": {
                        background: 'none'
                    }
                }}
                disableElevation
                disableRipple
                type='submit'
                onClick={() => navigate(-1)}
            >
                Cancel
            </Button>
        </Stack>
    )

    const checkoutRoute = '/checkout'

    const shouldDisplayCheckoutNavbar = location.pathname === checkoutRoute

    return (
        <AppBar
            position={!shouldPositionRelative ? 'sticky' : 'relative'}
            color='transparent'
            sx={{
                background: '#fff'
            }}
        >
            <Toolbar>
                {
                    shouldDisplayCheckoutNavbar ? <CheckoutView />
                        :
                        !matches ?
                            <DesktopView />
                            :
                            <MobileView />
                }
                {MenuDrawer}
            </Toolbar>
        </AppBar>
    )
}

import { AppBar, Button, Divider, Drawer, IconButton, Paper, Stack, SwipeableDrawer, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material'
import Cart from './Cart'
import Languages from './Languages'
import Login from './Login'
import Search from './Search'
import Signup from './Signup'
import MenuIcon from '@mui/icons-material/Menu';
import { Fragment, useState } from 'react'
import { ArrowForwardIosSharp } from '@mui/icons-material'
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { APP_NAME } from '../../utils/Constants'

export default function Header() {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))
    const [open, setOpen] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const whitelistedAppbarRelativeRoutes = [
        '/course'
    ]

    const shouldPositionRelative = whitelistedAppbarRelativeRoutes.includes(location.pathname)

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
                <Search />
            </Stack>
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
        </Stack>
    )

    const MobileView = () => (
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
                    <IconButton>
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
                spacing={1}
                divider={<Divider />}
                width='100%'
            >
                <Stack
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
                <Stack
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
            // position='sticky'
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

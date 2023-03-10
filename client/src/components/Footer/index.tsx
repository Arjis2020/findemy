import { Box, Button, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';
import './index.css'
import Partners from './Partners';
import { useLocation } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants';

type FooterProps = {
    showBusinessBranding?: boolean
}

export default function Footer({ showBusinessBranding = true }: FooterProps) {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("tablet"))

    const businessBrandingWhitelistedRoutes = [
        '/login',
        '/signup',
        '/search',
        '/course',
        '/cart',
        '/search',
        '/my-learning',
        '/topic',
        '/forgotPassword',
        '/resetPassword'
    ]

    const blackListedRoutes = [
        '/checkout'
    ]

    const location = useLocation()

    const DesktopView = () => {
        return (
            <Stack
                spacing={10}
                py={5}
            >
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignItems='start'
                >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        width='50%'
                    >
                        <Stack
                            spacing={1}
                        >
                            <Typography
                                fontSize={14}
                            >
                                Findemy Business
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Teach on Findemy
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Get the app
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                About us
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Contact us
                            </Typography>
                        </Stack>
                        <Stack
                            spacing={1}
                        >
                            <Typography
                                fontSize={14}
                            >
                                Careers
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Blog
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Help and Support
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Affiliate
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Investors
                            </Typography>
                        </Stack>
                        <Stack
                            spacing={1}
                        >
                            <Typography
                                fontSize={14}
                            >
                                Terms
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Privacy Policy
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Cookie settings
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Sitemap
                            </Typography>
                            <Typography
                                fontSize={14}
                            >
                                Accessibility statement
                            </Typography>
                        </Stack>
                    </Stack>
                    <Button
                        sx={{
                            border: '1px solid #fff',
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
                                px: '1.6rem'
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
                <Stack
                    direction='row'
                    justifyContent='space-between'
                    alignContent='center'
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        variant='h4'
                    >
                        {APP_NAME}
                    </Typography>
                    <Typography
                        variant='caption'
                        color='white'
                    >
                        ?? {new Date().getFullYear()} Findemy, Inc.
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    const MobileView = () => {
        return (
            <Stack
                spacing={10}
                py={5}
            >
                <Stack
                    spacing={2}
                    alignItems='start'
                >
                    <Button
                        sx={{
                            border: '1px solid #fff',
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
                                px: '1.6rem'
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
                    <Stack
                        spacing={1}
                    >
                        <Typography
                            fontSize={14}
                        >
                            Findemy Business
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Teach on Findemy
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Get the app
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            About us
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Contact us
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Careers
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Blog
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Help and Support
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Affiliate
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Investors
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Terms
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Privacy Policy
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Cookie settings
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Sitemap
                        </Typography>
                        <Typography
                            fontSize={14}
                        >
                            Accessibility statement
                        </Typography>
                    </Stack>
                </Stack>
                <Stack
                    spacing={1}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        variant='h4'
                    >
                        {APP_NAME}
                    </Typography>
                    <Typography
                        variant='caption'
                        color='white'
                    >
                        ?? {new Date().getFullYear()} Findemy, Inc.
                    </Typography>
                </Stack>
            </Stack>
        )
    }

    showBusinessBranding = typeof showBusinessBranding !== 'undefined' && businessBrandingWhitelistedRoutes.includes(location.pathname.substring(0, location.pathname.indexOf('/', 2) === -1 ? location.pathname.length : location.pathname.indexOf('/', 2)))
    const omitFooter = blackListedRoutes.includes(location.pathname)

    return (
        !omitFooter ? <footer
            className='footer-container'
        >
            {showBusinessBranding && <Box
                sx={{
                    p: matches ? 3 : 0,
                    paddingInline: '2.5rem',
                    paddingBlock: '1.2rem',
                }}
            >
                <Partners />
            </Box>
            }
            <Box
                sx={{
                    borderTop: '1px solid #3e4143',
                    p: matches ? 3 : 0,
                    paddingInline: '2.5rem',
                    paddingBlock: '1.2rem',
                }}
            >
                {
                    matches ?
                        <MobileView />
                        :
                        <DesktopView />
                }
            </Box>
        </footer>
            :
            null
    )
}

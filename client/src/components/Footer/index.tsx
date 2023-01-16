import { Box, Button, Divider, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';
import './index.css'
import Partners from './Partners';
import { useLocation } from 'react-router-dom';

type FooterProps = {
    showBusinessBranding?: boolean
}

export default function Footer({ showBusinessBranding = true }: FooterProps) {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("tablet"))

    const businessBrandingWhitelistedRoutes = [
        '/login',
        '/signup',
        '/search',
        '/course'
    ]

    const location = useLocation()

    const DesktopView = () => {
        return (
            <Stack>
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
            </Stack>
        )
    }

    const MobileView = () => {
        return (
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
            </Stack>
        )
    }

    showBusinessBranding = typeof showBusinessBranding !== 'undefined' && businessBrandingWhitelistedRoutes.includes(location.pathname)

    return (
        <footer
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
    )
}

import { Star } from '@mui/icons-material'
import { AppBar, Box, Button, Slide, Stack, Toolbar, Typography, useScrollTrigger } from '@mui/material'
import { memo, ReactElement } from 'react'

type SummaryProps = {
    view: 'mobile' | 'desktop'
}

export default memo(function Summary({ view }: SummaryProps) {
    const trigger = useScrollTrigger({
        disableHysteresis: true
    })

    type RevealOnScrollProps = {
        children: ReactElement
    }

    const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
        return (
            view === 'desktop' ?
                <Slide
                    direction='down'
                    in={trigger}
                // mountOnEnter
                // unmountOnExit
                >
                    {children}
                </Slide>
                :
                <Box>
                    {children}
                </Box>
        )
    }

    return (
        <RevealOnScroll>
            <AppBar
                position='fixed'
                sx={{
                    background: theme => theme.palette.common.black,
                    zIndex: 2,
                    top: view === 'desktop' ? !trigger ? 0 : 0 : 'auto',
                    bottom: view === 'desktop' ? 'auto' : 0,
                    py: view === 'desktop' ? 'auto' : 1.5
                }}
            >
                <Toolbar>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                    >
                        <Stack
                            spacing={0.5}
                        >
                            <Typography
                                fontFamily='UdemySansBold'
                                fontSize={16}
                            >
                                React - The complete guide (incl Hooks, React Router, Redux)
                            </Typography>
                            <Stack
                                direction='row'
                                spacing={1}
                                alignItems='center'
                            >
                                <Box
                                    sx={{
                                        background: "#eceb98",
                                        px: 1,
                                        py: 0.3,
                                        color: '#000'
                                    }}
                                >
                                    <Typography
                                        fontFamily='UdemySansBold'
                                        fontSize={12}
                                    >
                                        Bestseller
                                    </Typography>
                                </Box>
                                <Stack
                                    spacing={0.5}
                                    direction='row'
                                    alignItems='center'
                                >
                                    <Typography
                                        color='#f3ca8c'
                                        fontFamily='UdemySansBold'
                                        fontSize={14}
                                    >
                                        4.6
                                    </Typography>
                                    <Star
                                        sx={{
                                            color: '#f3ca8c',
                                            fontSize: 18
                                        }}
                                    />
                                </Stack>
                                <Typography
                                    component='a'
                                    fontSize={14}
                                    sx={{
                                        textDecoration: 'underline'
                                    }}
                                    color='#cec0fc'
                                >
                                    (173,987 ratings)
                                </Typography>
                                <Typography
                                    fontSize={14}
                                >
                                    686,194 students
                                </Typography>
                            </Stack>
                        </Stack>
                        {view === 'mobile' && <Stack
                            direction='row'
                            spacing={2}
                            alignItems='center'
                        >
                            <Stack
                                alignItems='end'
                            >
                                <Typography
                                    fontFamily='UdemySansBold'
                                    fontSize={18}
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
                            <Button
                                variant='contained'
                                sx={{
                                    background: '#fff',
                                    fontFamily: 'UdemySansBold',
                                    fontSize: 16,
                                    borderRadius: 0,
                                    color: '#000',
                                    textTransform: 'none',
                                    py: 1.8,
                                    px: 1.5,
                                    "&:hover": {
                                        background: "#e0e0e0"
                                    }
                                }}
                                disableElevation
                                disableRipple
                            >
                                Buy now
                            </Button>
                        </Stack>}
                    </Stack>
                </Toolbar>
            </AppBar>
        </RevealOnScroll>
    )
})

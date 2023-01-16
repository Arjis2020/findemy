import { Star } from '@mui/icons-material'
import { AppBar, Box, Slide, Stack, Toolbar, Typography, useScrollTrigger, useTheme } from '@mui/material'
import { memo, ReactElement, useState } from 'react'

export default memo(function Summary() {
    const trigger = useScrollTrigger({
        disableHysteresis: true
    })

    type RevealOnScrollProps = {
        children: ReactElement
    }

    const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
        return (
            <Slide
                direction='down'
                in={trigger}
                mountOnEnter
                unmountOnExit
            >
                {children}
            </Slide>
        )
    }

    return (
        <RevealOnScroll>
            <AppBar
                position='fixed'
                sx={{
                    background: theme => theme.palette.common.black,
                    zIndex: 2,
                    top: !trigger ? 0 : 64
                }}
            >
                <Toolbar>
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
                </Toolbar>
            </AppBar>
        </RevealOnScroll>
    )
})

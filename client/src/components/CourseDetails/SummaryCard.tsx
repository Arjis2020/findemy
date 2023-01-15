import { Box, Button, Card, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ClosedCaptionOffRoundedIcon from '@mui/icons-material/ClosedCaptionOffRounded';
import React from 'react';

type SummaryCardProps = {
    showVideo?: boolean
}

export default function SummaryCard({ showVideo = true }: SummaryCardProps) {
    const features = [
        {
            title: '49 hours on-demand video',
            icon: <OndemandVideoIcon />
        },
        {
            title: '51 articles',
            icon: <InsertDriveFileOutlinedIcon />
        },
        {
            title: '92 downloadable resources',
            icon: <SystemUpdateAltOutlinedIcon />
        },
        {
            title: 'Full lifetime access',
            icon: <AllInclusiveOutlinedIcon />
        },
        {
            title: 'Access on mobile and TV',
            icon: <SmartphoneOutlinedIcon />
        },
        {
            title: 'Assignments',
            icon: <AssignmentIcon />
        },
        {
            title: 'Certificate of completion',
            icon: <EmojiEventsOutlinedIcon />
        },
        {
            title: 'Closed captions',
            icon: <ClosedCaptionOffRoundedIcon />
        }
    ]

    return (
        <Card
            sx={{
                borderRadius: 0,
                boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)',
            }}
            variant='elevation'
        >
            <Stack
                spacing={1}
            >
                {showVideo && <Button
                    style={{
                        padding: '1px'
                    }}
                    disableElevation
                    disableRipple
                >
                    <img src="https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg"
                        srcSet="https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg 240w, https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg 480w, https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg 750w"
                        alt=""
                        sizes="(min-width: 1080px) 240px,
                                (min-width: 43.81em) 600px,
                                100vw"
                        width={'100%'}
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: 'url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAIAAABEtEjdAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kc8rRFEUxz8zgxGjERaUxaRhhcYosVFGQk2axii/NjPP/FDzxuu9mSRbZTtFiY1fC/4CtspaKSIlO2VNbNBz3oyaSebczj2f+733nO49F+yRtKIaVT5QM1k9PB7wzM7Ne5zP1NBGE63YooqhjYRCQSraxx02K970WLUqn/vX6pfihgK2WuFhRdOzwhPCwdWsZvG2cIuSii4Jnwp363JB4VtLjxX5xeJkkb8s1iPhUbA3CnuSZRwrYyWlq8LycrxqOqf83sd6iSuemZmW2CHejkGYcQJ4mGSMUQboY0jmAXrw0ysrKuT7CvlTrEiuIrPGGjrLJEmRpVvUnFSPS0yIHpeRZs3q/9++Gol+f7G6KwDVT6b51gnOLfjOm+bnoWl+H4HjES4ypfyVAxh8Fz1f0rz74N6As8uSFtuB801ofdCierQgOcTtiQS8nkDDHDRfQ91CsWe/+xzfQ2RdvuoKdvegS867F38AGNNnwvJxPYUAAAAJcEhZcwAACxMAAAsTAQCanBgAAALtSURBVHic7cEBAQAAAIIg/69uSEABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/Bh0SQABe+rNwwAAAABJRU5ErkJggg==&quot;)'
                        }} />
                </Button>}
                <Stack
                    sx={{
                        px: 2,
                        py: 2.5
                    }}
                    alignItems='center'
                    spacing={3}
                >
                    <Stack
                        spacing={2}
                        alignItems='center'
                        width='100%'
                    >
                        <Stack
                            direction='row'
                            spacing={1}
                            alignItems='center'
                            width='100%'
                        >
                            <Typography
                                fontFamily='UdemySansBold'
                                variant='h4'
                            >
                                ₹449
                            </Typography>
                            <Typography
                                color="#6a6f73"
                                fontSize={16}
                                sx={{
                                    textDecoration: 'line-through'
                                }}
                            >
                                ₹3,499
                            </Typography>
                            <Typography>
                                87% off
                            </Typography>
                        </Stack>
                        <Stack
                            spacing={1}
                            width='100%'
                        >
                            <Button
                                variant='contained'
                                sx={{
                                    borderRadius: 0,
                                    textTransform: 'none',
                                    fontFamily: 'UdemySansBold',
                                    py: 1.3,
                                    fontSize: 16
                                }}
                                fullWidth
                                disableElevation
                                disableRipple
                            >
                                Add to cart
                            </Button>
                            <Button
                                variant='outlined'
                                color='inherit'
                                sx={{
                                    borderRadius: 0,
                                    textTransform: 'none',
                                    fontFamily: 'UdemySansBold',
                                    py: 1.3,
                                    fontSize: 16
                                }}
                                fullWidth
                                disableRipple
                                disableElevation
                            >
                                Buy now
                            </Button>
                        </Stack>
                        <Typography
                            variant='caption'
                            color='#000'
                        >
                            30-Day Money-Back Guarantee
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={1.5}
                        width='100%'
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            This course includes:
                        </Typography>
                        <Stack
                            spacing={1}
                        >
                            {features.map(i => {
                                const clonedIcon = React.cloneElement(i.icon, {
                                    sx: {
                                        fontSize: 18
                                    }
                                })
                                return (<Stack
                                    direction='row'
                                    alignItems='center'
                                    spacing={2}
                                >
                                    {clonedIcon}
                                    <Typography
                                        fontSize={14}
                                    >
                                        {i.title}
                                    </Typography>
                                </Stack>
                                )
                            })}
                        </Stack>
                    </Stack>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                        width='100%'
                        px={1}
                    >
                        <Typography
                            fontSize={14}
                            fontFamily='UdemySansBold'
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            Share
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontFamily='UdemySansBold'
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            Gift this course
                        </Typography>
                        <Typography
                            fontSize={14}
                            fontFamily='UdemySansBold'
                            sx={{
                                textDecoration: 'underline'
                            }}
                        >
                            Apply coupon
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Card>
    )
}

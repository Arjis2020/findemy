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
import VideoPreview from './VideoPreview';

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
                {showVideo && <VideoPreview 
                    sx={{
                        mt: 0,
                        border: '1px solid #fff'
                    }}
                />}
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

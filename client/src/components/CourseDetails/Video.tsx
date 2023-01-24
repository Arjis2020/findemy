import { Box, IconButton, Stack, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import BottomDrawer from './BottomDrawer'
import CourseModel from '../../models/course.model';
import { Close } from '@mui/icons-material';

type VideoProps = {
    open: boolean,
    onClose: () => void,
    course: CourseModel
}

export default function Video({ open, onClose, course }: VideoProps) {
    const { title, learnings } = course
    const partners = [
        'https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/box-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg'
    ]
    return (
        <BottomDrawer
            open={open}
            onClose={onClose}
        >
            <Stack
                spacing={3}
            >
                <Stack
                    spacing={7}
                >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='start'
                    >
                        <Stack
                            spacing={0.5}
                        >
                            <Typography
                                fontFamily='UdemySansBold'
                                fontSize={14}
                                color='#d1d7dc'
                            >
                                Course Preview
                            </Typography>
                            <Typography
                                fontFamily='UdemySansBold'
                                fontSize={18}
                            >
                                {title}
                            </Typography>
                        </Stack>
                        <IconButton
                            disableRipple
                            sx={{
                                "&:hover": {
                                    background: 'none'
                                },
                                p: 0,
                                minWidth: 0,
                                color: '#fff'
                            }}
                            onClick={onClose}
                        >
                            <Close />
                        </IconButton>
                    </Stack>
                    <video
                        src="http://localhost:9000/video/stream/1"
                        controls
                        autoPlay
                        preload='metadata'
                    >

                    </video>
                </Stack>
                <Stack
                    direction='row'
                    justifyContent='space-evenly'
                    mt={2}
                    sx={{
                        flexFlow: 'row wrap'
                    }}
                >
                    {partners.map((partner, i) =>
                        <img
                            key={i}
                            src={partner}
                            height={44}
                        />
                    )}
                </Stack>
                <Stack
                    spacing={2}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={22}
                    >
                        What you'll learn
                    </Typography>
                    <Box>
                        <ul
                            style={{
                                listStyle: 'none',
                                width: '100%',
                                padding: 0,
                                margin: 0
                            }}
                        >
                            {
                                learnings.map(point => {
                                    return (
                                        <li>
                                            <Stack
                                                spacing={2}
                                                direction='row'
                                                alignItems='start'
                                                py={0.5}
                                            >
                                                <CheckIcon
                                                    sx={{
                                                        fontSize: 14
                                                    }}
                                                />
                                                <Typography
                                                    fontSize={14}
                                                >
                                                    {point}
                                                </Typography>
                                            </Stack>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Box>
                </Stack>
            </Stack>
        </BottomDrawer>
    )
}

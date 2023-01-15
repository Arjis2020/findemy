import { StarBorder } from '@mui/icons-material'
import { Box, Rating, Stack, Typography } from '@mui/material'
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LanguageIcon from '@mui/icons-material/Language';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import './index.css'

export default function SummaryBanner() {
    return (
        <Stack
            sx={{
                background: theme => theme.palette.common.black
            }}
            px={10}
            py={4}
        >
            <Stack
                maxWidth='60%'
                spacing={1.5}
                color='#fff'
            >
                <Typography
                    variant='h4'
                    color='#fff'
                    fontFamily='UdemySansBold'
                >
                    React - The Complete Guide (incl Hooks, React Router, Redux)
                </Typography>
                <Typography
                    fontSize={18}
                >
                    Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!
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
                        <Rating
                            value={4.5}
                            readOnly
                            precision={0.5}
                            size='small'
                            sx={{
                                color: '#f3ca8c',
                                fontSize: 15
                            }}
                            emptyIcon={
                                <StarBorder 
                                    fontSize='inherit'
                                    sx={{
                                        color: '#f3ca8c'
                                    }}
                                />
                            }
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
                <Stack
                    direction='row'
                    spacing={0.5}
                    alignItems='center'
                >
                    <Typography
                        fontSize={14}
                    >
                        Created by
                    </Typography>
                    <span className='course-creators'>
                        <Typography
                            component='a'
                            fontSize={14}
                            sx={{
                                textDecoration: 'underline'
                            }}
                            color='#cec0fc'>
                            Academind by Maximillian Schwarmüller
                        </Typography>,
                        <Typography
                            component='a'
                            fontSize={14}
                            sx={{
                                textDecoration: 'underline'
                            }}
                            color='#cec0fc'>
                            Maximillian Schwarmüller
                        </Typography>
                    </span>
                </Stack>
                <Stack
                    spacing={2}
                    direction='row'
                    alignItems='center'
                >
                    <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                    >
                        <NewReleasesIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                        <Typography
                            fontSize={14}
                        >
                            Last updated 01/23
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                    >
                        <LanguageIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                        <Typography
                            fontSize={14}
                        >
                            English
                        </Typography>
                    </Stack>
                    <Stack
                        spacing={1}
                        direction='row'
                        alignItems='center'
                    >
                        <SubtitlesIcon
                            sx={{
                                fontSize: 16
                            }}
                        />
                        <Typography
                            fontSize={14}
                        >
                            English [CC], Dutch [Auto]
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}

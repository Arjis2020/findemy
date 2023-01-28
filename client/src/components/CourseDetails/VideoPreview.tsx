import { Box, Button, Stack, SxProps, Theme, Typography } from '@mui/material'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { useState } from 'react';
import Video from './Video';
import CourseModel from '../../models/course.model';

type VideoPreviewProps = {
    sx?: SxProps<Theme>,
    course: CourseModel
}

export default function VideoPreview({ sx, course }: VideoPreviewProps) {
    const { imageUrl, learnings } = course
    const gradient = 'linear-gradient(180deg,rgba(28,29,31,0) 0%,rgba(28,29,31,0.9) 100%)'

    const [videoOpen, setVideoOpen] = useState<boolean>(false)

    const toggleVideoOpen = () => setVideoOpen(!videoOpen)

    return (
        <>
            <Button
                variant='contained'
                sx={{
                    p: 0,
                    mt: 2,
                    minWidth: 0,
                    background: 'transparent',
                    "&:hover": {
                        background: 'transparent'
                    },
                    ...sx
                }}
                onClick={toggleVideoOpen}
                disableElevation
                disableRipple
                fullWidth
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: '100%'
                    }}
                >
                    <img
                        src={imageUrl}
                        style={{
                            width: '100%',
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: gradient
                        }}
                    >
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 1,
                        }}
                    >
                        <PlayCircleFilledIcon
                            sx={{
                                fontSize: 80
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            alignItems: 'end',
                            justifyContent: 'center',
                            pb: 2
                        }}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            textTransform='none'
                        >
                            Preview this course
                        </Typography>
                    </Box>
                </Box>
            </Button>
            <Video
                open={videoOpen}
                onClose={toggleVideoOpen}
                course={course}
            />
        </>
    )
}

import { Box, Button, Stack, SxProps, Theme, Typography } from '@mui/material'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';

type VideoPreviewProps = {
    sx?: SxProps<Theme>
}

export default function VideoPreview({ sx }: VideoPreviewProps) {
    const gradient = 'linear-gradient(180deg,rgba(28,29,31,0) 0%,rgba(28,29,31,0.9) 100%)'

    return (
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
            disableElevation
            disableRipple
        >
            <Box
                sx={{
                    position: 'relative'
                }}
            >
                <img
                    src='https://img-c.udemycdn.com/course/750x422/1362070_b9a1_2.jpg'
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
    )
}

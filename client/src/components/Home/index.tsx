import { ArrowForwardIos } from '@mui/icons-material'
import { IconButton, Stack, Typography } from '@mui/material'
import Carousel from './Carousel'
import Topics from './Topics'

export default function Home() {
    return (
        <Stack
            spacing={2}
            mt={3}
            sx={{
                position: 'relative'
            }}
        >
            <Typography
                fontFamily='UdemySansBold'
                fontSize='1.5rem'
                px={8}
            >
                Students are viewing
            </Typography>
            <Carousel />
            <div
                style={{
                    marginTop: 60
                }}
            >
                <Topics />
            </div>
        </Stack>
    )
}

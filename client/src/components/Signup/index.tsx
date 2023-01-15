import { Container, Stack, Typography } from '@mui/material'
import Details from './Details'

export default function Signup() {
    return (
        <Container
            maxWidth='xs'
        >
            <Stack
                spacing={2}
                sx={{
                    my: 5
                }}
            >
                <Typography
                    fontFamily='UdemySansBold'
                >
                    Sign up and start learning
                </Typography>
                <Stack
                    spacing={1}
                >
                    <Details />
                </Stack>
            </Stack>
        </Container>
    )
}

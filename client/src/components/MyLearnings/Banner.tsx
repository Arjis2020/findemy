import { Box, Container, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Banner() {
    return (
        <Box
            sx={{
                background: theme => theme.palette.common.black,
            }}
        >
            <Container
                maxWidth='laptop'
                sx={{
                    py: 6,
                    color: '#fff'
                }}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize='3rem'
                    sx={{
                        marginLeft: {
                            md: 15,
                            laptop: 0,
                        }
                    }}
                >
                    My learning
                </Typography>
            </Container>
        </Box >
    )
}

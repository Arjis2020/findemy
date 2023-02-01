import { Button, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Empty() {
    return (
        <Stack
            flex={1}
            spacing={1}
        >
            <Stack
                sx={{
                    boxShadow: '0 0 2px #d1d7dc',
                    py: 5,
                }}
                alignItems='center'
                spacing={3}
            >
                <img
                    src='https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2-2x.jpg'
                    width='240px'
                />
                <Typography
                    textAlign='center'
                >
                    You haven't purchased any courses yet. Keep shopping to find a course!
                </Typography>
                <Link
                    to='/'
                    className='link-unstyled-full'
                >
                    <Button
                        variant='contained'
                        disableElevation
                        disableRipple
                        sx={{
                            py: 1,
                            px: 1.5,
                            fontFamily: 'UdemySansBold',
                            fontSize: 16,
                            textTransform: 'none',
                            borderRadius: 0
                        }}
                    >
                        Keep shopping
                    </Button>
                </Link>
            </Stack>
        </Stack>
    )
}

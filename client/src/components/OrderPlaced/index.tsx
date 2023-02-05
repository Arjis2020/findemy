import { Button, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import CheckMark from './CheckMark'
import './index.css'

export default function OrderPlaced() {
    const location = useLocation()
    const { oid } = useParams()

    if (!location.state?.order_id || location.state.order_id !== oid) return <Navigate
        to='/'
    />

    return (
        <Container
            maxWidth='xs'
            sx={{
                width: '100vw',
                height: '100vh'
            }}
        >
            <Stack
                alignItems='center'
                justifyContent='center'
                color='#000'
                height='100%'
                spacing={8}
            >
                <Stack>
                    <CheckMark />
                    <Typography
                        fontFamily='UdemySansBold'
                        variant='h5'
                    >
                        Order placed successfully
                    </Typography>
                </Stack>
                <Stack
                    spacing={2}
                    width='100%'
                    alignItems='center'
                >
                    <Link
                        to='/my-learning'
                        className='link-unstyled-full'
                        style={{ width: '100%' }}
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
                            Go to courses
                        </Button>
                    </Link>
                    <Link
                        to='/'
                        className='link-unstyled'
                        style={{
                            textDecoration: 'underline'
                        }}
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            Take me home
                        </Typography>
                    </Link>
                </Stack>
            </Stack>
        </Container>
    )
}

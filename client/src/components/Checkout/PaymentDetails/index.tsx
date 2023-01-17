import { Lock } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import React from 'react'
import Methods from './Methods'

export default function PaymentDetails() {
    return (
        <Stack
            spacing={2}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize={26}
                >
                    Payment method
                </Typography>
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={1}
                >
                    <Typography
                        variant='caption'
                    >
                        Secured connection
                    </Typography>
                    <Lock 
                        fontSize='small'
                    />
                </Stack>
            </Stack>
            <Methods />
        </Stack>
    )
}

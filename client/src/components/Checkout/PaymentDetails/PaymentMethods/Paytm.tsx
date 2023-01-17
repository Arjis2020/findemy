import { Box, Typography } from '@mui/material'
import React from 'react'

export default function Paytm() {
    return (
        <Box
            sx={{
                py: 4,
                px: 2
            }}
        >
            <Typography>
                In order to complete your transaction, we will transfer you over to Adyen's secure servers.
            </Typography>
        </Box>
    )
}

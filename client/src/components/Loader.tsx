import { Box, CircularProgress, SxProps, Theme } from '@mui/material'
import React from 'react'

type LoaderProps = {
    sx?: SxProps<Theme>,
    size?: number
}

export default function Loader({ sx, size }: LoaderProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'start',
                justifyContent: 'center',
                mt: 2,
                height: '70vh',
                ...sx
            }}
        >
            <CircularProgress
                thickness={6}
                size={size || 80}
                sx={{
                    color: '#000'
                }}
            />
        </Box>
    )
}

import { Button, Stack, Typography } from '@mui/material'
import React from 'react'

type EmptySearchProps = {
    onClearFilters: () => void
}

export default function EmptySearch({ onClearFilters }: EmptySearchProps) {
    return (
        <Stack
            sx={{
                py: 5,
                mb: 5,
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
                Could not find any course with the given filters!
            </Typography>
            <Button
                variant='contained'
                disableElevation
                disableRipple
                sx={{
                    py: 1,
                    px: 2.5,
                    fontFamily: 'UdemySansBold',
                    fontSize: 16,
                    textTransform: 'none',
                    borderRadius: 0
                }}
                onClick={onClearFilters}
            >
                Clear filters
            </Button>
        </Stack>
    )
}

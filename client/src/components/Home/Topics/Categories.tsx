import { Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Categories({
    category,
    links
}: { category: string, links: Array<string> }) {
    return (
        <Grid
            item
            xs
        >
            <Stack
                spacing={2}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize='1.2rem'
                >
                    {category}
                </Typography>
                <Stack
                    spacing={3}
                >
                    {links.map((link: any) => {
                        return (
                            <Stack
                                spacing={1}
                                alignItems='start'
                            >
                                <Typography
                                    sx={{
                                        fontFamily: 'UdemySansBold',
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        p: 0,
                                        minWidth: 0
                                    }}
                                >
                                    <a href='https://google.com'>
                                        {link}
                                    </a>
                                </Typography>
                                <Typography
                                    color='#6a6f73'
                                >
                                    36,354,994 students
                                </Typography>
                            </Stack>
                        )
                    })}
                </Stack>
            </Stack>
        </Grid>
    )
}

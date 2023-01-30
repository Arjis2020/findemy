import { Button, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Category } from '../../../models/category.model'

export default function Categories({
    category,
    links
}: { category: string, links: Category[] }) {
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
                    {links.map(link => {
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
                                    <Link
                                        to={`/topic/${link.title.toLowerCase()}`}
                                        className='link'
                                    >
                                        {link.title}
                                    </Link>
                                </Typography>
                                <Typography
                                    color='#6a6f73'
                                >
                                    ({link.students.toLocaleString()}) students
                                </Typography>
                            </Stack>
                        )
                    })}
                </Stack>
            </Stack>
        </Grid>
    )
}

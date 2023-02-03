import { Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getGroupedCategories } from '../../../API/handlers/category.handler'
import { GroupedCategories } from '../../../models/category.model'
import Loader from '../../Loader'
import Categories from './Categories'

export default function Topics() {
    const [categories, setCategories] = useState<GroupedCategories[]>()
    useEffect(() => {
        getGroupedCategories()
            .then(data => setCategories(data))
            .catch(err => err.toString())
    }, [])
    return (
        <Stack
            width='100%'
            sx={{
                background: '#f7f9fa',
                py: 8,
                px: 8,
            }}
        >
            <Stack
                spacing={2}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize='1.5rem'
                >
                    Featured topics by category
                </Typography>
                {
                    categories ?
                        <Grid
                            container
                            gap={3}
                        >
                            {categories.map(parent => (
                                <Categories
                                    key={parent._id}
                                    category={parent.title}
                                    links={parent.sub_categories}
                                />
                            ))}
                        </Grid>
                        :
                        <Loader />
                }
            </Stack>
        </Stack>
    )
}

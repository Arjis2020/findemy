import { Container, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { getPurchases } from '../../API/handlers/purchase.handler'
import ICourseModel from '../../models/course.model'
import { useAppSelector } from '../../redux/store'
import Loader from '../Loader'
import Course from './Course'
import Empty from './Empty'

export default function Content() {
    const purchases = useAppSelector(state => state.purchaseReducer)

    return (
        <Container
            maxWidth='laptop'
            sx={{
                py: 2,
            }}
        >
            {
                !purchases.isLoading ?
                    purchases.data.length > 0 ?
                        <Grid
                            container
                            gap={2}
                        >
                            {purchases.data.map(course => (
                                <Grid
                                    item
                                    key={course._id}
                                >
                                    <Course
                                        course={course}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        :
                        <Empty />
                    :
                    <Loader />
            }
        </Container>
    )
}

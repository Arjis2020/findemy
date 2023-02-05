import { Container, Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases } from '../../API/handlers/purchase.handler'
import ICourseModel from '../../models/course.model'
import Loader from '../Loader'
import Course from './Course'
import Empty from './Empty'

export default function Content() {
    const [purchases, setPurchases] = useState<ICourseModel[] | undefined>(undefined)
    useEffect(() => {
        getPurchases()
            .then(data => {
                // console.log(data)
                setPurchases(data)
            })
            .catch(err => console.log(err.toString()))
    }, [])

    return (
        <Container
            maxWidth='laptop'
            sx={{
                py: 2,
            }}
        >
            {
                purchases ?
                    purchases.length > 0 ?
                        <Grid
                            container
                            gap={2}
                        >
                            {purchases.map(course => (
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

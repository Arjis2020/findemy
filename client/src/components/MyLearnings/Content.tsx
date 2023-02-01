import { Container, Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPurchases } from '../../API/handlers/purchase.handler'
import CourseModel from '../../models/course.model'
import { LoginAction } from '../../redux/actions/auth.action'
// import { setPurchases } from '../../redux/actions/purchase.action'
import { RootState } from '../../redux/reducers'
import { PurchaseAction } from '../../redux/reducers/purchase.reducer'
import Loader from '../Loader'
import Course from './Course'
import Empty from './Empty'

export default function Content() {
    const [purchases, setPurchases] = useState<CourseModel[] | undefined>(undefined)
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

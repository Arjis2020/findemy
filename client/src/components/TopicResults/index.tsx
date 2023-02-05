import { Container, Divider, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import Courses from './Courses';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { searchCoursesByCategory } from '../../API/handlers/search.handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { HistoryState } from '../../redux/reducers/history.reducer';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { searchQueryParser } from '../../utils/searchQueryParser';
import { ITopicSearchResultModel } from '../../models/searchResult.model';
import { ITopicSearchResultMetaModel } from '../../models/searchResult.meta.model';

const RESULTS_PER_PAGE = 10

export default function TopicResults() {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const [searchParams, setSearchParams] = useSearchParams()
    const { category } = useParams()
    const navigate = useNavigate()
    const [searchResults, setSearchResults] = useState<ITopicSearchResultModel>()

    const page = Number(searchParams.get('page') || 1)

    const meta: ITopicSearchResultMetaModel | undefined = searchResults

    const pageCount: number = Math.ceil(meta?.totalSize! / RESULTS_PER_PAGE)

    const getCoursesByCategory = () => {
        searchCoursesByCategory(
            category!,
            Number(page)
        )
            .then(data => {
                setSearchResults(data)
            })
            .catch((err) => {
                console.error(err)
                navigate('/')
            })
    }

    useEffect(() => {
        setSearchResults(undefined)
        if (category) {
            getCoursesByCategory()
        }
        else {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        setSearchResults(undefined)
        if (category) {
            getCoursesByCategory()
        }
        else {
            navigate('/')
        }
    }, [page])

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setSearchParams((prevParams) => searchQueryParser(prevParams, {
            page: String(page)
        }))
    }

    return (
        searchResults?.results ?
            <Container
                maxWidth='xl'
            >
                <Stack
                    mt={3}
                    p={!matches ? 4 : 1}
                    py={4}
                    spacing={2.5}
                    overflow='hidden'
                    width='100%'
                >
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                            sx={{
                                color: '#000',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {meta?.totalSize.toLocaleString()} result{meta?.totalSize! > 1 ? 's' : ''}
                        </Typography>
                    </Stack>
                    <Stack
                        direction='row'
                        spacing={!matches ? 7.5 : 0}
                    >
                        <Stack
                            spacing={10}
                            alignItems='center'
                            justifyContent='space-between'
                            width='100%'
                        >
                            <Stack
                                divider={<Divider />}
                                spacing={2}
                                width='100%'
                            >
                                {searchResults.results.map(course => (
                                    <Link
                                        key={course._id}
                                        to={`/course${course.slug}`}
                                        className='link-unstyled-full'
                                    >
                                        <Courses
                                            course={course}
                                        />
                                    </Link>
                                ))}
                            </Stack>
                            <Pagination
                                count={pageCount}
                                onChange={handlePageChange}
                                page={page}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Container>
            :
            <Loader />
    )
}
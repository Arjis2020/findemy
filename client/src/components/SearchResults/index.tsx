import { Box, Button, Container, Divider, FormControl, InputLabel, NativeSelect, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiltersDrawer, { FilterEvents, FilterState } from './FiltersDrawer';
import Courses from './Courses';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchCourses } from '../../API/handlers/search.handler';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { searchQueryParser } from '../../utils/searchQueryParser';
import { ISearchResultModel } from '../../models/searchResult.model';
import { ISearchResultMetaModel } from '../../models/searchResult.meta.model';
import { SortByModel } from '../../models/sortBy.filter.model';
import EmptySearch from './EmptySearch';
import { useAppSelector } from '../../redux/store';

const RESULTS_PER_PAGE = 10

export default function SearchResults() {
    type SortByOptions = {
        title: string,
        value: SortByModel
    }

    const sortByOptions: SortByOptions[] = [
        {
            title: 'Most relevant',
            value: 'mostRelevant'
        },
        {
            title: 'Most reviewed',
            value: 'mostReviewed'
        },
        {
            title: 'Highest rated',
            value: 'highestRated'
        },
        {
            title: 'Newest',
            value: 'newest'
        }
    ]

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const [filtersExpanded, setFiltersExpanded] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()
    const [searchResults, setSearchResults] = useState<ISearchResultModel>()
    const { paths: [previousPath] } = useAppSelector((state) => state.historyReducer)

    const query = searchParams.get('q')
    const page = Number(searchParams.get('page') || 1)

    const meta: ISearchResultMetaModel | undefined = searchResults

    const pageCount: number = Math.ceil(meta?.totalSize! / RESULTS_PER_PAGE)

    const [filters, setFilters] = useState<FilterState>({
        rating: undefined,
        prices: [],
        levels: []
    })

    const [sortBy, setSortBy] = useState<SortByModel>("mostRelevant")

    const appliedFilters = filters.prices.length + filters.levels.length + (filters.rating ? 1 : 0)

    const getCourses = () => {
        searchCourses(
            query!,
            Number(page),
            filters,
            sortBy
        )
            .then(data => {
                setSearchResults(data)
            })
            .catch((err) => {
                console.error(err)
                navigate(previousPath)
            })
    }

    useEffect(() => {
        setSearchResults(undefined)
        setFilters({
            rating: undefined,
            prices: [],
            levels: []
        })
        setSearchParams((prevParams) => searchQueryParser(prevParams, {
            page: '1'
        }))
        if (query) {
            getCourses()
        }
        else {
            navigate('/')
        }
    }, [query])

    useEffect(() => {
        setSearchResults(undefined)
        if (query) {
            getCourses()
        }
        else {
            navigate('/')
        }
    }, [page])

    useEffect(() => {
        setSearchResults(undefined)
        setSearchParams((prevParams) => searchQueryParser(prevParams, {
            page: '1'
        }))
        if (query) {
            getCourses()
        }
    }, [filters, sortBy])

    const handlePageChange = (e: React.ChangeEvent<unknown>, page: number) => {
        setSearchParams((prevParams) => searchQueryParser(prevParams, {
            page: String(page)
        }))
    }

    const filtersEvents: FilterEvents = {
        onRadioChanged(rating) {
            setFilters({
                ...filters,
                rating
            })
        },
        onPriceFilterChanged(prices) {
            setFilters({
                ...filters,
                prices
            })
        },
        onLevelFilterChanged(levels) {
            setFilters({
                ...filters,
                levels
            })
        },
    }

    const clearFilters = () => setFilters({
        rating: undefined,
        levels: [],
        prices: []
    })

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as SortByModel)
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
                    <Typography
                        fontFamily='UdemySansBold'
                        sx={{
                            fontSize: {
                                xs: '1.5rem',
                                md: '2rem'
                            }
                        }}
                    >
                        {meta?.totalSize.toLocaleString()} result{meta?.totalSize! > 1 ? 's' : ''} for "{query}"
                    </Typography>
                    <Stack
                        direction='row'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Stack
                            direction='row'
                            spacing={1}
                            justifyContent='start'
                            width='100%'
                        >
                            <Box
                                sx={{
                                    border: theme => `1px solid ${theme.palette.common.black}`
                                }}
                            >
                                <Button
                                    variant='contained'
                                    disableElevation
                                    disableRipple
                                    sx={{
                                        py: 2,
                                        px: 1.7,
                                        height: '100%',
                                        "&:hover": {
                                            background: 'rgba(0,0,0,.04)',
                                        },
                                        borderRadius: 0,
                                        color: theme => theme.palette.common.black,
                                        fontFamily: 'UdemySansBold',
                                        textTransform: 'none',
                                        fontSize: 16,
                                        background: 'none',
                                        whiteSpace: 'nowrap'
                                    }}
                                    onClick={() => setFiltersExpanded(!filtersExpanded)}
                                    startIcon={
                                        <FilterListIcon />
                                    }
                                >
                                    Filters {appliedFilters > 0 ? `(${appliedFilters})` : null}
                                </Button>
                            </Box>
                            <Stack
                                direction='row'
                                alignItems='center'
                                sx={{
                                    border: theme => `1px solid ${theme.palette.common.black}`,
                                    px: 1.5,
                                    py: 1,
                                    minWidth: '11rem',
                                    width: matches ? '100%' : 'unset',
                                    transition: '0.3s all ease',
                                    "&:hover": {
                                        background: 'rgba(0,0,0,0.04)'
                                    }
                                }}
                            >
                                <FormControl
                                    fullWidth
                                    variant='standard'
                                >
                                    <InputLabel
                                        sx={{
                                            fontFamily: 'UdemySansBold',
                                            color: theme => theme.palette.common.black,
                                            "&.Mui-focused": {
                                                color: theme => theme.palette.common.black,
                                            }
                                        }}
                                    >
                                        Sort by
                                    </InputLabel>
                                    <NativeSelect
                                        fullWidth
                                        IconComponent={() => null}
                                        id='sort-by'
                                        disableUnderline
                                        inputProps={{
                                            sx: {
                                                "&:focus": {
                                                    background: 'none'
                                                }
                                            }
                                        }}
                                        value={sortBy}
                                        // label="Age"
                                        onChange={handleSortChange}
                                    >
                                        {sortByOptions.map(item => {
                                            return (
                                                <option
                                                    value={item.value}
                                                    key={item.title}
                                                >
                                                    {item.title}
                                                </option>
                                            )
                                        })}
                                    </NativeSelect>
                                </FormControl>
                                <ExpandMoreIcon />
                            </Stack>
                            {!matches && <Button
                                variant='text'
                                sx={{
                                    color: '#000',
                                    fontFamily: 'UdemySansBold',
                                    fontSize: '1rem',
                                    textTransform: 'none',
                                    background: 'none',
                                    "&:hover": {
                                        background: 'none'
                                    }
                                }}
                                disableRipple
                                disableElevation
                                onClick={clearFilters}
                            >
                                Clear filters
                            </Button>}
                        </Stack>
                        {!matches && <Typography
                            fontFamily='UdemySansBold'
                            sx={{
                                color: '#6a6f73',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {meta?.totalSize.toLocaleString()} result{meta?.totalSize! > 1 ? 's' : ''}
                        </Typography>}
                    </Stack>
                    <Stack
                        direction='row'
                        spacing={!matches ? 7.5 : 0}
                        sx={{
                            width: !filtersExpanded && !matches ? 'calc(100% + 18.7rem)' : '100%',
                            transform: !filtersExpanded && !matches ? 'translate(-18.7rem)' : 'none',
                            transition: '400ms cubic-bezier(.2,0,.38,.9);',
                        }}
                    >
                        <FiltersDrawer
                            meta={meta!}
                            drawerState={filtersExpanded}
                            toggleDrawerState={() => setFiltersExpanded(!filtersExpanded)}
                            filterEvents={filtersEvents}
                            currentFilterState={filters}
                        />
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
                                {
                                    searchResults.results.length > 0 ? searchResults.results.map(course => (
                                        <Link
                                            key={course._id}
                                            to={`/course${course.slug}`}
                                            className='link-unstyled-full'
                                        >
                                            <Courses
                                                course={course}
                                            />
                                        </Link>
                                    ))
                                        :
                                        <EmptySearch 
                                            onClearFilters={clearFilters}
                                        />
                                }
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
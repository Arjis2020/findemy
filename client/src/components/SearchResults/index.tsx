import { Box, Button, Container, Divider, FormControl, InputLabel, NativeSelect, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiltersDrawer from './FiltersDrawer';
import Courses from './Courses';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchCourses } from '../../API/handlers/search.handler';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { HistoryState } from '../../redux/reducers/history.reducers';
import Loader from '../Loader';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { searchQueryParser } from '../../utils/searchQueryParser';
import SearchResultModel from '../../models/searchResult.model';
import SearchResultMetaModel from '../../models/searchResult.meta.model';
import StyledTooltip from '../GlobalStyles/StyledTooltip';

const RESULTS_PER_PAGE = 10

export default function SearchResults() {
    const sortByOptions = [
        {
            title: 'Most relevant',
            value: 'most-relevant'
        },
        {
            title: 'Most reviewed',
            value: 'most-reviewed'
        },
        {
            title: 'Highest rated',
            value: 'highest-rated'
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
    const [searchResults, setSearchResults] = useState<SearchResultModel>()
    const { paths: [previousPath] } = useSelector<RootState>((state) => state.historyReducer) as HistoryState

    const query = searchParams.get('q')
    const page = Number(searchParams.get('page') || 1)

    const meta: SearchResultMetaModel | undefined = searchResults

    const pageCount: number = Math.ceil(meta?.totalSize! / RESULTS_PER_PAGE)


    useEffect(() => {
        setSearchResults(undefined)
        if (query) {
            searchCourses(query, Number(page))
                .then(data => {
                    setSearchResults(data)
                })
                .catch((err) => {
                    console.error(err)
                    navigate(previousPath)
                })
        }
        else {
            navigate('/')
        }
    }, [query, page])

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
                                        background: 'none'
                                    }}
                                    onClick={() => setFiltersExpanded(!filtersExpanded)}
                                    startIcon={
                                        <FilterListIcon />
                                    }
                                >
                                    Filter
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
                                    // value={age}
                                    // label="Age"
                                    // onChange={handleChange}
                                    >
                                        {sortByOptions.map(item => {
                                            return (
                                                <option
                                                    value={item.value}
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
                        />
                        <Stack
                            spacing={10}
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <Stack
                                divider={<Divider />}
                                spacing={2}
                            >
                                {searchResults.results.map(course => (
                                    <Link
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
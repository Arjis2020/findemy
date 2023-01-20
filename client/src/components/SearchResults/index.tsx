import { Box, Button, Container, Divider, FormControl, InputLabel, NativeSelect, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FiltersDrawer from './FiltersDrawer';
import Courses from './Courses';
import { useState } from 'react';

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

    return (
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
                    8,294 results for "react"
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
                        8,294 results
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
                        drawerState={filtersExpanded}
                        toggleDrawerState={() => setFiltersExpanded(!filtersExpanded)}
                    />
                    <Stack
                        divider={<Divider />}
                        spacing={2}
                        sx={{
                            width:'100%'
                        }}
                    >
                        {Array.from(new Array(10)).map(i => (
                            <Courses />
                        ))}
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    )
}
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Checkbox, Divider, Drawer, Radio, RadioGroup, Rating, Stack, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { ReactNode, useEffect, useState } from 'react';
import { StarBorder } from '@mui/icons-material';
import {ISearchResultMetaModel} from '../../models/searchResult.meta.model';
import Ratings from '../Ratings';
import { RatingFilterModel } from '../../models/rating.filter.model';
import { PricesFilterModel } from '../../models/prices.filter.model';
import { LevelsFilterModel } from '../../models/levels.filter.model';

export type RatingFilter = { [rating: string]: boolean }
export type FilterEvents = {
    onRadioChanged: (rating?: RatingFilterModel) => void,
    onPriceFilterChanged: (price: Array<PricesFilterModel>) => void,
    onLevelFilterChanged: (level: Array<LevelsFilterModel>) => void
}

export type FilterState = {
    rating?: RatingFilterModel,
    prices: Array<PricesFilterModel>,
    levels: Array<LevelsFilterModel>
}

type FiltersDrawerProps = {
    drawerState: boolean,
    toggleDrawerState: () => void,
    meta: ISearchResultMetaModel,
    filterEvents: FilterEvents,
    currentFilterState: FilterState
}

export default function FiltersDrawer({ drawerState, toggleDrawerState, meta, filterEvents, currentFilterState }: FiltersDrawerProps) {
    type AccordionComponentProps = {
        title: string,
        children: ReactNode
    }

    type RatingGeneratorProps = {
        rating: number,
        count: number,
        onChange: (e: React.ChangeEvent, checked: boolean) => void,
        checked: boolean
    }

    type LevelGeneratorProps = {
        label: string,
        count: number,
        onChange: (e: React.ChangeEvent, checked: boolean) => void,
        checked: boolean
    }

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const AccordionComponent = ({ title, children }: AccordionComponentProps) => {
        return (
            <>
                <Divider />
                <Accordion
                    elevation={0}
                    defaultExpanded
                    disableGutters
                    sx={{
                        px: 0
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{
                            fontSize: 20,
                            px: 0,
                            fontFamily: 'UdemySansBold'
                        }}
                    >
                        {title}
                    </AccordionSummary>
                    <AccordionDetails
                        sx={{
                            px: 0,
                        }}
                    >
                        {children}
                    </AccordionDetails>
                </Accordion>
            </>
        )
    }

    const RatingGenerator = ({ rating, count, onChange, checked }: RatingGeneratorProps) => {
        return (
            <Stack
                direction='row'
                alignItems='center'
                spacing={1.2}
            >
                <Stack
                    direction='row'
                    spacing={0.5}
                    alignItems='center'
                >
                    <Radio
                        size='small'
                        color='default'
                        checked={checked}
                        sx={{
                            color: '#000',
                            pl: 0,
                            pr: 0.5
                        }}
                        onChange={onChange}
                        disableRipple
                    />
                    <Stack
                        spacing={0.5}
                        direction='row'
                        alignItems='center'
                    >
                        <Ratings
                            value={rating}
                        />
                        <Typography
                            fontSize={14}
                        >
                            {rating.toFixed(1)} & up
                        </Typography>
                    </Stack>
                </Stack>
                <Typography
                    fontSize={14}
                    color='grey'
                >
                    ({count.toLocaleString()})
                </Typography>
            </Stack>
        )
    }

    const CheckBoxLabelGenerator = ({ label, count, onChange, checked }: LevelGeneratorProps) => {
        return (
            <Stack
                direction='row'
                alignItems='center'
                spacing={1}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={0.5}
                >
                    <Checkbox
                        color='default'
                        sx={{
                            color: '#000',
                            pl: 0,
                            pr: 0.5
                        }}
                        checked={checked}
                        onChange={onChange}
                        disableRipple
                    />
                    <Typography
                        fontSize={14}
                    >
                        {label}
                    </Typography>
                </Stack>
                <Typography
                    fontSize={14}
                    color='grey'
                >
                    ({count.toLocaleString()})
                </Typography>
            </Stack>
        )
    }

    const AccordionContent = () => {
        // const [currentFilterState.rating, setcurrentFilterState.rating] = useState<Rating>()
        // const [currentFilterState.levels, setcurrentFilterState.levels] = useState<Array<Level>>([])
        // const [currentFilterState.prices, setcurrentFilterState.prices] = useState<Array<Price>>([])
        const { onRadioChanged, onPriceFilterChanged, onLevelFilterChanged } = filterEvents



        const handleRatingChanged = (rating: RatingFilterModel) => {
            // setcurrentFilterState.rating(rating)
            onRadioChanged(rating)
        }

        const handleLevelChanged = (level: LevelsFilterModel, checked: boolean) => {
            const newState = checked ? [...currentFilterState.levels, level] : currentFilterState.levels.filter(i => i !== level)
            // setcurrentFilterState.levels(newState)
            onLevelFilterChanged(newState)
        }
        
        const handlePriceChanged = (price: PricesFilterModel, checked: boolean) => {
            const newState = checked ? [...currentFilterState.prices, price] : currentFilterState.prices.filter(i => i !== price)
            // setcurrentFilterState.prices(newState)
            onPriceFilterChanged(newState)
        }

        return (
            <Stack>
                <AccordionComponent
                    title='Ratings'
                >
                    <RadioGroup>
                        <RatingGenerator
                            rating={4.5}
                            count={meta.ratingStats['gte4.5']}
                            onChange={(e, checked) => handleRatingChanged('4.5')}
                            checked={currentFilterState.rating === '4.5'}
                        />
                        <RatingGenerator
                            rating={4.0}
                            count={meta.ratingStats.gte4}
                            onChange={(e, checked) => handleRatingChanged('4')}
                            checked={currentFilterState.rating === '4'}
                        />
                        <RatingGenerator
                            rating={3.5}
                            count={meta.ratingStats['gte3.5']}
                            onChange={(e, checked) => handleRatingChanged('3.5')}
                            checked={currentFilterState.rating === '3.5'}
                        />
                        <RatingGenerator
                            rating={3.0}
                            count={meta.ratingStats.gte3}
                            onChange={(e, checked) => handleRatingChanged('3')}
                            checked={currentFilterState.rating === '3'}
                        />
                    </RadioGroup>
                </AccordionComponent>
                <AccordionComponent
                    title='Level'
                >
                    <Stack
                        spacing={0}
                    >
                        <CheckBoxLabelGenerator
                            label='All Levels'
                            count={meta.levelStats.all}
                            onChange={(e, checked) => handleLevelChanged('all', checked)}
                            checked={!!currentFilterState.levels?.includes('all')}
                        />
                        <CheckBoxLabelGenerator
                            label='Beginner'
                            count={meta.levelStats.beginner}
                            onChange={(e, checked) => handleLevelChanged('beginner', checked)}
                            checked={!!currentFilterState.levels?.includes('beginner')}
                        />
                        <CheckBoxLabelGenerator
                            label='Intermediate'
                            count={meta.levelStats.intermediate}
                            onChange={(e, checked) => handleLevelChanged('intermediate', checked)}
                            checked={!!currentFilterState.levels?.includes('intermediate')}
                        />
                        <CheckBoxLabelGenerator
                            label='Expert'
                            count={meta.levelStats.expert}
                            onChange={(e, checked) => handleLevelChanged('expert', checked)}
                            checked={!!currentFilterState.levels?.includes('expert')}
                        />
                    </Stack>
                </AccordionComponent>
                <AccordionComponent
                    title='Price'
                >
                    <Stack
                        spacing={0}
                    >
                        <CheckBoxLabelGenerator
                            label='Paid'
                            count={meta.priceStats.paid}
                            onChange={(e, checked) => handlePriceChanged('paid', checked)}
                            checked={!!currentFilterState.prices?.includes('paid')}
                        />
                        <CheckBoxLabelGenerator
                            label='Free'
                            count={meta.priceStats.free}
                            onChange={(e, checked) => handlePriceChanged('free', checked)}
                            checked={!!currentFilterState.prices?.includes('free')}
                        />
                    </Stack>
                </AccordionComponent>
            </Stack>
        )
    }

    const DesktopDrawerContent = () => {
        return (
            <Stack
                width={'15rem'}
            >
                <AccordionContent />
            </Stack>
        )
    }

    const MobileDrawerContent = () => {
        return (
            <Stack>
                <AppBar
                    position='sticky'
                    sx={{
                        background: '#fff'
                    }}
                >
                    <Toolbar>
                        <Stack
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            width='100%'
                        >
                            <Typography
                                sx={{
                                    color: 'black',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {meta?.totalSize.toLocaleString()} result{meta?.totalSize! > 1 ? 's' : ''}
                            </Typography>
                            <Button
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
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>
                <Stack
                    px={2}
                >
                    <AccordionContent />
                </Stack>
                <AppBar
                    position='sticky'
                    sx={{
                        top: 'auto',
                        bottom: 0,
                        py: 1.5,
                        background: '#fff'
                    }}
                >
                    <Toolbar>
                        <Button
                            variant='contained'
                            sx={{
                                background: '#000',
                                textTransform: 'none',
                                borderRadius: 0,
                                p: 1,
                                py: 1.2,
                                fontFamily: 'UdemySansBold',
                                fontSize: 16
                            }}
                            fullWidth
                            disableElevation
                            onClick={toggleDrawerState}
                        >
                            Done
                        </Button>
                    </Toolbar>
                </AppBar>
            </Stack>
        )
    }

    const DesktopView = () => {
        return (
            <DesktopDrawerContent />
        )
    }

    return (
        <Box>
            {
                !matches ?
                    <DesktopView />
                    :
                    <Drawer
                        anchor='right'
                        variant='temporary'
                        PaperProps={{
                            sx: {
                                width: '17rem',
                            }
                        }}
                        onClose={toggleDrawerState}
                        open={drawerState}
                    >
                        <MobileDrawerContent />
                    </Drawer>
            }
        </Box>
    )
}
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Checkbox, Divider, Drawer, Radio, RadioGroup, Rating, Stack, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactNode, useState } from 'react';

type FiltersDrawerProps = {
    drawerState: boolean,
    toggleDrawerState: () => void
}

export default function FiltersDrawer({ drawerState, toggleDrawerState }: FiltersDrawerProps) {
    type AccordionComponentProps = {
        title: string,
        children: ReactNode
    }

    type RatingGeneratorProps = {
        rating: number,
        count: number
    }

    type LevelGeneratorProps = {
        label: string,
        count: number
    }

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

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

    const RatingGenerator = ({ rating, count }: RatingGeneratorProps) => {
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
                        checked={false}
                        sx={{
                            color: '#000',
                            pl: 0,
                            pr: 0.5
                        }}
                        disableRipple
                    />
                    <Stack
                        spacing={0.5}
                        direction='row'
                        alignItems='center'
                    >
                        <Rating
                            sx={{
                                color: '#e59819',
                                fontSize: 15
                            }}
                            readOnly
                            value={rating}
                            precision={0.5}
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

    const CheckBoxLabelGenerator = ({ label, count }: LevelGeneratorProps) => {
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
                        defaultChecked={false}
                        color='default'
                        sx={{
                            color: '#000',
                            pl: 0,
                            pr: 0.5
                        }}
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
        return (
            <Stack>
                <AccordionComponent
                    title='Ratings'
                >
                    <RadioGroup>
                        <RatingGenerator
                            rating={4.5}
                            count={3092}
                        />
                        <RatingGenerator
                            rating={4.0}
                            count={4892}
                        />
                        <RatingGenerator
                            rating={3.5}
                            count={1982}
                        />
                        <RatingGenerator
                            rating={3.0}
                            count={5734}
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
                            count={1092}
                        />
                        <CheckBoxLabelGenerator
                            label='Beginner'
                            count={1432}
                        />
                        <CheckBoxLabelGenerator
                            label='Intermediate'
                            count={574}
                        />
                        <CheckBoxLabelGenerator
                            label='Expert'
                            count={471}
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
                            count={7350}
                        />
                        <CheckBoxLabelGenerator
                            label='Free'
                            count={942}
                        />
                    </Stack>
                </AccordionComponent>
            </Stack>
        )
    }

    const DesktopDrawerContent = () => {
        return (
            <Stack
                width='15rem'
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
                                8,294 results
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

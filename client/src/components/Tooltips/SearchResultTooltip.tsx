import { Button, Stack, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';

type SearchResultTooltipProps = {
    learnings: Array<string>,
    doesCourseExistInCart: boolean,
    onAddToCartClicked: (e: React.MouseEvent) => void,
}

export default function SearchResultTooltip({ learnings, doesCourseExistInCart, onAddToCartClicked }: SearchResultTooltipProps) {
    return (
        <Stack
            spacing={2}
            alignItems='start'
        >
            <Typography
                fontFamily='UdemySansBold'
                fontSize={16}
            >
                What you'll learn
            </Typography>
            <Stack
                spacing={1}
            >
                <ul
                    style={{
                        listStyle: 'none',
                        width: '100%',
                        padding: 0,
                        margin: 0
                    }}
                >
                    {
                        learnings.slice(0, 3).map(point => {
                            return (
                                <li>
                                    <Stack
                                        spacing={2}
                                        direction='row'
                                        alignItems='start'
                                        py={0.5}
                                    >
                                        <CheckIcon
                                            sx={{
                                                fontSize: 14
                                            }}
                                        />
                                        <Typography
                                            fontSize={14}
                                        >
                                            {point}
                                        </Typography>
                                    </Stack>
                                </li>
                            )
                        })
                    }
                </ul>
            </Stack>
            <Button
                variant='contained'
                sx={{
                    borderRadius: 0,
                    textTransform: 'none',
                    fontFamily: 'UdemySansBold',
                    py: 1.3,
                    fontSize: 16
                }}
                fullWidth
                disableElevation
                disableRipple
                onClick={onAddToCartClicked}
            >
                {doesCourseExistInCart ? 'Go to cart' : 'Add to cart'}
            </Button>
        </Stack>
    )
}

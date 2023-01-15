import { Stack, Typography } from '@mui/material'
import CheckIcon from '@mui/icons-material/Check';

type WhatYouWillLearnProps = {
    points: Array<string>
}

export default function WhatYouWillLearn({ points }: WhatYouWillLearnProps) {
    return (
        <Stack
            sx={{
                pt: 2,
                pb: 1,
                px: 3,
                border: '1px solid #d1d7dc',
                my: 2
            }}
            width='100%'
        >
            <Typography
                sx={{
                    fontFamily: 'UdemySansBold',
                    fontSize: 22
                }}
            >
                What you'll learn
            </Typography>
            <ul
                className='two-column-ul'
                style={{
                    listStyle: 'none',
                    padding: 0,
                }}
            >
                {
                    points.map(point => {
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
                                            fontSize: 16
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
    )
}

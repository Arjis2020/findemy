import { Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import { APP_NAME } from '../../../utils/Constants'
import Country from './Country'
import StateTerritory from './StateTerritory'

export default function BillingDetails() {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    return (
        <Stack
            spacing={1}
        >
            <Stack
                spacing={2}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize={26}
                >
                    Billing address
                </Typography>
                <Stack
                    direction={!matches ? 'row' : 'column'}
                    spacing={!matches ? 3 : 2}
                >
                    <Country />
                    <StateTerritory />
                </Stack>
            </Stack>
            <Typography
                variant='caption'
                color='#6a6f73'
            >
                {APP_NAME} is required by law to collect applicable transaction taxes for purchases made in certain tax jurisdictions.
            </Typography>
        </Stack>
    )
}

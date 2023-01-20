import { Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material'

export default function Partners() {
    const partners = [
        'https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg',
        'https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg',
        'https://s.udemycdn.com/partner-logos/v4/box-light.svg',
        'https://s.udemycdn.com/partner-logos/v4/netapp-light.svg',
        'https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg'
    ]

    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    return (
        <Stack
            direction={!matches ? 'row' : 'column'}
            alignItems={!matches ? 'center' : 'start'}
            spacing={!matches ? 0 : 3}
            justifyContent='space-between'
            width='100%'
        >
            <Typography
                fontFamily='UdemySansBold'
                fontSize='1.1rem'
                lineHeight={1.2}
                maxWidth={!matches ? 'unset' : 290}
            >
                Top companies choose <span style={{ color: '#cec0fc' }}>Udemy Business</span> to build in-demand career skills.
            </Typography>
            <Grid
                container
                gap={!matches ? 3 : 2}
                pr={!matches ? 0 : 3}
                justifyContent={matches ? 'start' : 'end'}
                width='fit-content'
                alignItems='center'
            >
                {partners.map((partner, i) => <Grid
                    item
                    key={i}
                >
                    <img
                        src={partner}
                        height={44}
                    />
                </Grid>
                )}
            </Grid>
        </Stack>
    )
}

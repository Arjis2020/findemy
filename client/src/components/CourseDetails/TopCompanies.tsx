import { Stack, Typography } from '@mui/material'

export default function TopCompanies() {
    const partners = [
        'https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/volkswagen-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/box-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg',
        'https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg'
    ]

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
                fontFamily='UdemySansBold'
                fontSize={18}
            >
                Top companies offer this course to their employees
            </Typography>
            <Typography
                color='#6a6f73'
                fontSize={14}
                mt={0.5}
            >
                This course was selected for our collection of top-rated courses trusted by businesses worldwide.
            </Typography>
            <Stack
                direction='row'
                justifyContent='space-between'
                mt={2}
                sx={{
                    flexFlow: 'row wrap'
                }}
            >
                {partners.map((partner, i) =>
                    <img
                        key={i}
                        src={partner}
                        height={44}
                    />
                )}
            </Stack>
        </Stack>
    )
}

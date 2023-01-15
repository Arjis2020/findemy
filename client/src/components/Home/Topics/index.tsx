import { Grid, Stack, Typography } from '@mui/material'
import Categories from './Categories'

export default function Topics() {
    return (
        <Stack
            width='100%'
            sx={{
                background: '#f7f9fa',
                py: 8,
                px: 8,
            }}
        >
            <Stack
                spacing={2}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize='1.5rem'
                >
                    Featured topics by category
                </Typography>
                <Grid
                    container
                    gap={3}
                >
                    <Categories
                        category='Development'
                        links={[
                            'Web Development',
                            'React',
                            'Python'
                        ]}
                    />
                    <Categories
                        category='Business'
                        links={[
                            'Financial Analysis',
                            'MBA',
                            'SQL'
                        ]}
                    />
                    <Categories
                        category='IT and Software'
                        links={[
                            'AWS Certification',
                            'Azure',
                            'Cyber Security'
                        ]}
                    />
                    <Categories
                        category='Design'
                        links={[
                            'UI/UX',
                            'Digital Art',
                            'Photoshop'
                        ]}
                    />
                </Grid>
            </Stack>
        </Stack>
    )
}

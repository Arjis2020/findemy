import { Avatar, Box, Stack, Typography } from '@mui/material'

export default function Methods() {
    const methods = [{
        method: 'Google',
        img: 'https://img.icons8.com/color/480/null/google-logo.png'
    },
    {
        method: 'Facebook',
        img: 'https://img.icons8.com/color/480/null/facebook-new.png'
    },
    {
        method: 'Apple',
        img: 'https://img.icons8.com/ios-glyphs/480/null/mac-os.png'
    }]
    return (
        <Stack
            spacing={1}
        >
            {methods.map(method => {
                return (
                    <Box
                        sx={{
                            border: '1px solid #000'
                        }}
                        key={method.method}
                    >
                        <Stack
                            spacing={1}
                            direction='row'
                            alignItems='center'
                            px={1}
                            py={1}
                        >
                            <Avatar
                                src={method.img}
                                sx={{
                                    height: '2.2rem',
                                    width: '2.2rem'
                                }}
                            />
                            <Typography
                                fontFamily='UdemySansBold'
                            >
                                Continue with {method.method}
                            </Typography>
                        </Stack>
                    </Box>
                )
            })}
        </Stack>
    )
}

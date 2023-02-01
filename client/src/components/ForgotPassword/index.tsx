import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import { FieldValues, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export default function ForgotPassword() {
    const { handleSubmit, register, formState: { errors } } = useForm()
    const onSubmit = (values: FieldValues) => {
        console.log(values)
    }

    return (
        <Container
            maxWidth='xs'
        >
            <Stack
                alignItems='center'
                mb={25}
                spacing={1}
            >
                <Stack
                    spacing={1}
                    mt={5}
                    width='100%'
                >
                    <Typography
                        fontFamily='UdemySansBold'
                    >
                        Forgot Password
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                            spacing={1}
                        >
                            <Box
                                sx={{
                                    border: '1px solid #000',
                                    px: 2,
                                    pt: 1,
                                    pb: 1.5
                                }}
                            >
                                <TextField
                                    variant='standard'
                                    type='email'
                                    error={!!errors.email}
                                    helperText={errors.email?.message?.toString()}
                                    label='Email'
                                    InputProps={{
                                        disableUnderline: true,
                                    }}
                                    sx={{
                                        "& .MuiFormLabel-root": {
                                            color: '#000',
                                            fontFamily: 'UdemySansBold',
                                            "&.Mui-focused": {
                                                color: 'black'
                                            },
                                            "&.Mui-error": {
                                                color: 'black'
                                            }
                                        }
                                    }}
                                    fullWidth
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: 'Email is required'
                                        }
                                    })}
                                />
                            </Box>
                            <Button
                                type='submit'
                                variant='contained'
                                sx={{
                                    fontFamily: 'UdemySansBold',
                                    textTransform: 'capitalize',
                                    borderRadius: 0,
                                    py: 1.5,
                                    fontSize: 16,
                                }}
                                disableElevation
                                disableRipple
                                fullWidth
                            >
                                Reset Password
                            </Button>
                        </Stack>
                    </form>
                </Stack>
                <Stack
                    direction='row'
                    spacing={1}
                >
                    <Typography>
                        or
                    </Typography>
                    <Link
                        to='/login'
                        className='link'
                    >
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            Log in
                        </Typography>
                    </Link>
                </Stack>
            </Stack>
        </Container>
    )
}

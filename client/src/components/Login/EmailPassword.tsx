import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function EmailPassword() {
    const { handleSubmit, formState: { errors }, register } = useForm()

    const onSubmit = (values: object, e: any) => {
        console.log(values)
    }

    const [visibility, setVisibility] = useState(false)
    const [password, setPassword] = useState("")

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    return (
        <Stack
            spacing={3}
        >
            <Stack
                spacing={1}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
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
                                label='Email'
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                inputProps={{
                                    required: true
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
                                {...register('email')}
                            />
                        </Box>
                        <Box
                            sx={{
                                border: '1px solid #000',
                                px: 2,
                                pt: 1,
                                pb: 1.5
                            }}
                        >
                            <TextField
                                error={!!errors.password}
                                type={visibility ? 'text' : 'password'}
                                variant='standard'
                                label='Password'
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment:
                                        <IconButton
                                            onClick={toggleVisibility}
                                            sx={{
                                                opacity: !password ? 0 : 1,
                                                transition: '0.3s all ease',
                                                pointerEvents: !password ? 'none' : 'all'
                                            }}
                                        >
                                            {
                                                visibility ?
                                                    <VisibilityOffIcon
                                                        fontSize='small'
                                                        sx={{
                                                            color: '#000'
                                                        }}
                                                    />
                                                    :
                                                    <VisibilityIcon
                                                        fontSize='small'
                                                        sx={{
                                                            color: '#000'
                                                        }}
                                                    />
                                            }
                                        </IconButton>
                                }}
                                inputProps={{
                                    minLength: 8,
                                    required: true,
                                    pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'
                                }}
                                {...register('password', {
                                    onChange: (event) => {
                                        setPassword(event.target.value)
                                    },
                                })}
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
                            />
                        </Box>
                        <Button
                            type='submit'
                            sx={{
                                background: '#a435f0',
                                fontFamily: 'UdemySansBold',
                                textTransform: 'capitalize',
                                color: '#fff',
                                borderRadius: 0,
                                py: 1.5,
                                fontSize: 16,
                                "&:hover": {
                                    background: '#8710d8'
                                }
                            }}
                            fullWidth
                        >
                            Log in
                        </Button>
                    </Stack>
                </form>
                <Stack
                    direction='row'
                    spacing={1}
                    justifyContent='center'
                    alignItems='center'
                >
                    <Typography>
                        or
                    </Typography>
                    <Link
                        to='/'
                    >
                        <Typography>
                            Forgot Password
                        </Typography>
                    </Link>
                </Stack>
            </Stack>
            <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
                justifyContent='center'
            >
                <Typography>
                    Don't have an account?
                </Typography>
                <Link
                    to='/signup'
                >
                    <Typography
                        fontFamily='UdemySansBold'
                    >
                        Sign up
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    )
}

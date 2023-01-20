import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordStrength from './PasswordStrength';

type SignupDetailsProps = {
    onSignup: (values: FieldValues) => void
}

export default function Details({ onSignup }: SignupDetailsProps) {
    const { handleSubmit, formState: { errors }, register } = useForm()
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

    const onSubmit = (values: FieldValues, e: any) => {
        setBtnDisabled(true)
        onSignup(values)
    }

    const [visibility, setVisibility] = useState(false)
    const [password, setPassword] = useState("")

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    return (
        <Stack
            spacing={1.5}
        >
            <Stack
                spacing={1}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Stack
                        spacing={2}
                    >
                        <Stack
                            spacing={1}
                        >
                            <Box
                                sx={{
                                    border: '1px solid #000',
                                    px: 2,
                                    pt: 1,
                                    pb: 1
                                }}
                            >
                                <TextField
                                    variant='standard'
                                    type='text'
                                    error={!!errors.email}
                                    label='Full name'
                                    InputProps={{
                                        disableUnderline: true
                                    }}
                                    inputProps={{
                                        required: true
                                    }}
                                    sx={{
                                        "& .MuiFormLabel-root": {
                                            color: '#000',
                                            fontFamily: 'UdemySansBold',
                                            fontSize: 14,
                                            "&.Mui-focused": {
                                                color: 'black'
                                            },
                                            "&.Mui-error": {
                                                color: 'black'
                                            }
                                        }
                                    }}
                                    fullWidth
                                    {...register('name')}
                                />
                            </Box>
                            <Box
                                sx={{
                                    border: '1px solid #000',
                                    px: 2,
                                    pt: 1,
                                    pb: 1
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
                                            fontSize: 14,
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
                                    pb: 1
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
                                        // pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'
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
                                            fontSize: 14,
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
                            <PasswordStrength
                                password={password}
                            />
                        </Stack>
                        <Stack
                            spacing={2}
                        >
                            <Button
                                type='submit'
                                sx={{
                                    fontFamily: 'UdemySansBold',
                                    textTransform: 'none',
                                    borderRadius: 0,
                                    py: 1.5,
                                    fontSize: 16,
                                }}
                                fullWidth
                                disableElevation
                                disableRipple
                                disabled={btnDisabled}
                            >
                                Sign up
                            </Button>
                            <Typography
                                variant='caption'
                                textAlign='center'
                            >
                                By signing up, you agree to our <span style={{ textDecoration: 'underline' }}>Terms of Use</span> and <span style={{ textDecoration: 'underline' }}>Privacy Policy</span>.
                            </Typography>
                        </Stack>
                    </Stack>
                </form>
            </Stack>
            <Divider />
            <Stack
                direction='row'
                spacing={0.5}
                alignItems='center'
                justifyContent='center'
            >
                <Typography
                    fontSize={14}
                >
                    Already have an account?
                </Typography>
                <Link
                    to='/login'
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={14}
                    >
                        Log in
                    </Typography>
                </Link>
            </Stack>
        </Stack>
    )
}

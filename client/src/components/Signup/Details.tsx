import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PasswordStrength from './PasswordStrength';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers';
import { LoginAction } from '../../redux/actions/auth.action';
import { Report } from '@mui/icons-material';

type SignupDetailsProps = {
    onSignup: (values: FieldValues) => void
}

interface IForm {
    name: string;
    email: string;
    password: string;
}

export default function Details({ onSignup }: SignupDetailsProps) {
    const { handleSubmit, formState: { errors }, register } = useForm<IForm>()
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

    const user = useSelector<RootState>((state) => state.authReducer) as LoginAction

    const onSubmit: SubmitHandler<IForm> = (values) => {
        setBtnDisabled(true)
        onSignup(values)
    }

    const error = user.err?.signup

    useEffect(() => {
        if (error) {
            setBtnDisabled(false)
        }
    }, [error])

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
                {error &&
                    <Stack
                        sx={{
                            background: '#fcaea0'
                        }}
                        spacing={2}
                        p={2}
                        direction='row'
                    >
                        <Report
                            fontSize='large'
                        />
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            There was a problem signing up. An account was found with the same email.
                        </Typography>
                    </Stack>
                }
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
                                    error={!!errors.name}
                                    helperText={errors.name?.message?.toString()}
                                    label='Full name'
                                    InputProps={{
                                        disableUnderline: true
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
                                    {...register('name', {
                                        required: {
                                            value: true,
                                            message: "Name cannot be empty"
                                        }
                                    })}
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
                                    helperText={errors.email?.message?.toString()}
                                    label='Email'
                                    InputProps={{
                                        disableUnderline: true,
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
                                    {...register('email', {
                                        required: {
                                            value: true,
                                            message: "Email cannot be empty"
                                        }
                                    })}
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
                                    helperText={errors.password?.message?.toString()}
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
                                    {...register('password', {
                                        onChange: (event) => {
                                            setPassword(event.target.value)
                                        },
                                        required: {
                                            value: true,
                                            message: "Password cannot be empty"
                                        },
                                        minLength: {
                                            value: 8,
                                            message: "Please enter a strong password of minimum length of 8 characters"
                                        }
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
                                variant='contained'
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

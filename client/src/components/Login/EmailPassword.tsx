import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ReportIcon from '@mui/icons-material/Report';
import { useAppSelector } from '../../redux/store';

type EmailPasswordProps = {
    onLogin: SubmitHandler<ILoginForm>
}

export interface ILoginForm {
    email: string;
    password: string;
}

export default function EmailPassword({ onLogin }: EmailPasswordProps) {
    const { handleSubmit, formState: { errors }, register } = useForm<ILoginForm>()
    const user = useAppSelector((state) => state.authReducer)
    const loading = user.isLoading
    const error = !!(user.err.login?.status)

    const onSubmit: SubmitHandler<ILoginForm> = (values) => {
        onLogin(values)
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
                {error &&
                    <Stack
                        sx={{
                            background: '#fcaea0'
                        }}
                        spacing={2}
                        p={2}
                        direction='row'
                    >
                        <ReportIcon
                            fontSize='large'
                        />
                        <Typography
                            fontFamily='UdemySansBold'
                        >
                            There was a problem logging in. Check your email and password or create an account.
                        </Typography>
                    </Stack>
                }
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
                                error={!!(errors.email?.message)}
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
                                        message: "Please enter your email"
                                    }
                                })}
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
                                error={!!(errors.password)}
                                helperText={errors.password?.message?.toString()}
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
                                {...register('password', {
                                    onChange: (event) => {
                                        setPassword(event.target.value)
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Please enter a minimum of 8 characters"
                                    },
                                    required: {
                                        value: true,
                                        message: "Please enter your password"
                                    }
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
                            variant='contained'
                            sx={{
                                fontFamily: 'UdemySansBold',
                                textTransform: 'capitalize',
                                borderRadius: 0,
                                py: 1.5,
                                fontSize: 16,
                            }}
                            disabled={loading}
                            disableElevation
                            disableRipple
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
                        to='/forgotPassword'
                        className='link'
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
                    className='link'
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

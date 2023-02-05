import { Box, Button, Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { resetPassword } from '../../API/handlers/auth.handler';
import { Link } from 'react-router-dom';
import PasswordStrength from '../Signup/PasswordStrength';
import { useAppDispatch } from '../../redux/store';
import { resetPaths } from '../../redux/reducers/history.reducer';

interface IForm {
    password: string;
    confirm_password: string;
}

export default function ResetPassword() {
    const [searchParams] = useSearchParams()
    const { handleSubmit, watch, formState: { errors }, register, getValues } = useForm<IForm>()
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

    const token = searchParams.get('token')
    const navigate = useNavigate()

    const password = watch('password', "")
    const confirm_password = watch('confirm_password', "")

    const [success, setSuccess] = useState<boolean>(false)

    const [password_visibility, setPasswordVisibility] = useState<boolean>(false)
    const [confirm_password_visibility, setConfirmPasswordVisibility] = useState<boolean>(false)

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!password_visibility)
    }

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisibility(!confirm_password_visibility)
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    const dispatch = useAppDispatch()

    if (!searchParams.get('token')) return <Navigate to='/' />

    const onSubmit : SubmitHandler<IForm> = async (values) => {
        try {
            setBtnDisabled(true)
            await resetPassword(values.password, token!)
            dispatch(resetPaths())
            setSuccess(true)
        }
        catch (err) {
            setBtnDisabled(false)
        }
    }

    return (
        <Container
            maxWidth='xs'
            sx={{
                mt: 5,
                mb: 15
            }}
        >
            <Stack
                spacing={2}
            >
                <Typography
                    fontFamily='UdemySansBold'
                >
                    Reset Password
                </Typography>
                {!success ? <form
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
                                error={!!(errors.password)}
                                helperText={errors.password?.message?.toString()}
                                type={password_visibility ? 'text' : 'password'}
                                variant='standard'
                                label='Password'
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment:
                                        <IconButton
                                            onClick={togglePasswordVisibility}
                                            sx={{
                                                opacity: !password ? 0 : 1,
                                                transition: '0.3s all ease',
                                                pointerEvents: !password ? 'none' : 'all'
                                            }}
                                        >
                                            {
                                                password_visibility ?
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
                                    required: {
                                        value: true,
                                        message: "Please create a new password"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Please create a password of minimum 8 characters"
                                    },
                                    validate: (value) => value === getValues('confirm_password'),
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
                        <Box
                            sx={{
                                border: '1px solid #000',
                                px: 2,
                                pt: 1,
                                pb: 1.5
                            }}
                        >
                            <TextField
                                error={!!(errors.confirm_password)}
                                helperText={errors.confirm_password?.message?.toString()}
                                type={confirm_password_visibility ? 'text' : 'password'}
                                variant='standard'
                                label='Confirm password'
                                InputProps={{
                                    disableUnderline: true,
                                    endAdornment:
                                        <IconButton
                                            onClick={toggleConfirmPasswordVisibility}
                                            sx={{
                                                opacity: !confirm_password ? 0 : 1,
                                                transition: '0.3s all ease',
                                                pointerEvents: !confirm_password ? 'none' : 'all'
                                            }}
                                        >
                                            {
                                                confirm_password_visibility ?
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
                                {...register('confirm_password', {
                                    required: {
                                        value: true,
                                        message: "Please re-enter your password"
                                    },
                                    minLength: {
                                        value: 8,
                                        message: "Please create a password of minimum 8 characters"
                                    },
                                    validate: (value) => value === getValues('password'),
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
                        {
                            !!errors.password || !!errors.confirm_password ?
                                <Typography
                                    sx={{
                                        color: theme => theme.palette.error.main
                                    }}
                                    variant='body2'
                                >
                                    Passwords don't match
                                </Typography>
                                :
                                null
                        }
                        <PasswordStrength
                            password={password}
                        />
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
                            disabled={btnDisabled}
                            disableElevation
                            disableRipple
                            fullWidth
                        >
                            Reset password
                        </Button>
                    </Stack>
                </form>
                    :
                    <Stack
                        spacing={1}
                    >
                        <Typography>
                            Password reset was successful. Hit the <strong>Log in</strong> button below to login to your account.
                        </Typography>
                        <Link
                            className='link-unstyled'
                            to='/login'
                        >
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
                                Log in
                            </Button>
                        </Link>
                    </Stack>
                }
            </Stack>
        </Container>
    )
}

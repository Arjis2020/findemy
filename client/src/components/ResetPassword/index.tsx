import { Box, Button, Container, Divider, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { resetPassword } from '../../API/handlers/auth.handler';
import { resetPaths } from '../../redux/actions/history.action';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
    const [searchParams] = useSearchParams()
    const { handleSubmit, formState: { errors }, register, getValues } = useForm()
    const [btnDisabled, setBtnDisabled] = useState<boolean>(false)

    const token = searchParams.get('token')
    const navigate = useNavigate()

    const [success, setSuccess] = useState<boolean>(false)

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    const dispatch = useDispatch()

    if (!searchParams.get('token')) return <Navigate to='/' />

    const onSubmit = async (values: FieldValues) => {
        try {
            setBtnDisabled(true)
            await resetPassword(values.password, token!)
            dispatch(resetPaths())
            setSuccess(true)
        }
        catch(err) {
            setBtnDisabled(false)
        }
    }

    type TextInputProps = {
        name: string,
        label: string,
        validation: (value: string) => boolean
    }

    const TextInput = ({ name, label, validation }: TextInputProps) => {
        const [visibility, setVisibility] = useState(false)
        const [password, setPassword] = useState("")

        const toggleVisibility = () => {
            setVisibility(!visibility)
        }

        return (
            <Box
                sx={{
                    border: '1px solid #000',
                    px: 2,
                    pt: 1,
                    pb: 1.5
                }}
            >
                <TextField
                    error={!!(errors[name])}
                    helperText={errors[name]?.message?.toString()}
                    type={visibility ? 'text' : 'password'}
                    variant='standard'
                    label={label}
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
                    {...register(name, {
                        onChange: (event) => {
                            setPassword(event.target.value)
                        },
                        required: {
                            value: true,
                            message: "Please create a new password"
                        },
                        minLength: {
                            value: 8,
                            message: "Please create a password of minimum 8 characters"
                        },
                        validate: validation
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
        )
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
                        <TextInput
                            name='password'
                            label='Password'
                            validation={(value) => value === getValues('confirm_password')}
                        />
                        <TextInput
                            name='confirm_password'
                            label='Confirm Password'
                            validation={(value) => value === getValues('password')}
                        />
                        {
                            getValues('password') !== getValues('confirm_password') ?
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

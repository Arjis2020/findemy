import { Button, Divider, Stack, TextField, Theme, Typography, useMediaQuery } from '@mui/material'
import React, { BaseSyntheticEvent, useEffect } from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setPaymentDetails, UPIDetails } from '../../../../redux/actions/payment.action'
import { RootState } from '../../../../redux/reducers'
import { PaymentState } from '../../../../redux/reducers/payment.reducer'

export default function UPI() {
    const { handleSubmit, register, formState: { errors }, reset } = useForm()
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const dispatch = useDispatch()
    const payment = useSelector<RootState>((state) => state.paymentReducer) as PaymentState
    const paymentMethod = payment.method

    const onSubmit = (values: FieldValues, e?: BaseSyntheticEvent<object, any, any>) => {
        const details: UPIDetails = {
            vpa: values.upi
        }
        dispatch(setPaymentDetails(details))
    }

    useEffect(() => {
        reset()
    }, [paymentMethod])
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <Stack
                direction={!matches ? 'row' : 'column'}
                alignItems='start'
                px={2}
                pt={2}
                spacing={2}
            >
                <Stack
                    spacing={2}
                    flex={1}
                    pb={!matches ? 10 : 0}
                >
                    <Typography>
                        Enter your UPI ID / VPA and make payment on your UPI app.
                    </Typography>
                    <Stack
                        spacing={1}
                    >
                        <Typography
                            fontSize={14}
                            fontFamily='UdemySansBold'
                        >
                            UPI ID / VPA
                        </Typography>
                        <TextField
                            placeholder='UPI ID / VPA'
                            error={!!errors.upi}
                            helperText={errors.upi?.message?.toString()}
                            InputProps={{
                                sx: {
                                    borderRadius: 0,
                                },
                                required: true,
                            }}
                            inputProps={{
                                sx: {
                                    py: 1.5
                                },
                                // required: true,
                                // pattern: "[a-z.0-9]*@[a-z]*"
                            }}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: '#000',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#000',
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#000',
                                    },
                                },
                            }}
                            {...register('upi', {
                                required: {
                                    value: true,
                                    message: 'Please enter a UPI ID / VPA'
                                },
                                pattern: {
                                    value: /[a-z.0-9]*@[a-z]*/,
                                    message: 'Please enter a valid UPI ID'
                                }
                            })}
                        />
                    </Stack>
                    <Button
                        variant='contained'
                        sx={{
                            background: '#000',
                            color: '#fff',
                            borderRadius: 0,
                            textTransform: 'none',
                            fontFamily: 'UdemySansBold',
                            "&:hover": {
                                background: '#000'
                            }
                        }}
                        disableElevation
                        disableRipple
                        type='submit'
                    >
                        Make Payment
                    </Button>
                </Stack>
                <Divider
                    orientation={!matches ? 'vertical' : 'horizontal'}
                    flexItem
                >
                    or
                </Divider>
                <Stack
                    flex={1}
                    spacing={1}
                    alignItems='center'
                >
                    <Typography>
                        Scan QR code to complete your UPI payment on your mobile device.
                    </Typography>
                    <img
                        src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png'
                        style={{
                            width: 150,
                        }}
                    />
                </Stack>
            </Stack>
        </form>
    )
}

import { Button, Divider, Stack, TextField, Theme, Typography, useMediaQuery } from '@mui/material'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { IUPIDetails } from '../../../../models/order.model'
// import { setPaymentDetails, IUPIDetails } from '../../../../redux/actions/payment.action'
import { setPaymentDetails } from '../../../../redux/reducers/payment.reducer'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import Loader from '../../../Loader'

type UPIProps = {
    qrCode?: string
}

interface IForm {
    upi: string;
}

export default function UPI({ qrCode }: UPIProps) {
    const { handleSubmit, register, formState: { errors }, reset, setError } = useForm<IForm>()
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('laptop'))

    const dispatch = useAppDispatch()
    const payment = useAppSelector((state) => state.paymentReducer)
    const paymentMethod = payment.method

    const onSubmit: SubmitHandler<IForm> = (values) => {
        const details: IUPIDetails = {
            vpa: values.upi
        }
        // verifyVpa(details.vpa)
        //     .then(data => {
        //         if (data.success) {
        //         }
        //         else {
        //             setError('upi', {
        //                 type: 'pattern'
        //             }, {
        //                 shouldFocus: true
        //             })
        //         }
        //     })
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
                width='100%'
            >
                <Stack
                    spacing={2}
                    flex={1}
                    pb={!matches ? 10 : 0}
                    width='100%'
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
                            }}
                            inputProps={{
                                sx: {
                                    py: 1.5
                                },
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
                    // spacing={1}
                    alignItems='center'
                    width='100%'
                >
                    <Typography>
                        Scan QR code to complete your UPI payment on your mobile device.
                    </Typography>
                    {qrCode ?
                        <img
                            src={qrCode}
                            style={{
                                width: 150,
                            }}
                        />
                        :
                        <Loader
                            size={40}
                            sx={{
                                height: 'auto',
                                mt: 2
                            }}
                        />
                    }
                </Stack>
            </Stack>
        </form>
    )
}

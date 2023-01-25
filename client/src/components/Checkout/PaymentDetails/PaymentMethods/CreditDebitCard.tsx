import { Box, Stack, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { PaymentMethodProps } from '../..'
import { CardDetails, setPaymentDetails } from '../../../../redux/actions/payment.action'

export default function CreditDebitCard({ register, errors }: PaymentMethodProps) {
    // const { handleSubmit, register } = useForm()

    const dispatch = useDispatch()

    const onSubmit = (values: FieldValues, e: any) => {
        const details: CardDetails = {
            name: values.name,
            number: values.number,
            cvv: values.cvv,
            expiry: values.expiry
        }
        dispatch(setPaymentDetails(details))
    }

    return (
        <Stack
            spacing={2}
            p={2}
        >
            <Stack
                spacing={1}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize={14}
                >
                    Name on card
                </Typography>
                <TextField
                    placeholder='Name on card'
                    error={!!errors.name}
                    helperText={errors.name?.message?.toString()}
                    InputProps={{
                        sx: {
                            borderRadius: 0
                        },
                    }}
                    inputProps={{
                        sx: {
                            py: 1.5
                        }
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
                    {...register('name', {
                        required: {
                            value: true,
                            message: 'Name cannot be blank'
                        }
                    })}
                />
            </Stack>
            <Stack
                spacing={1}
            >
                <Typography
                    fontFamily='UdemySansBold'
                    fontSize={14}
                >
                    Card number
                </Typography>
                <TextField
                    placeholder='0000 0000 0000 0000'
                    type='tel'
                    inputMode='numeric'
                    error={!!errors.number}
                    helperText={errors.number?.message?.toString()}
                    InputProps={{
                        sx: {
                            borderRadius: 0
                        },
                    }}
                    inputProps={{
                        sx: {
                            py: 1.5
                        }
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
                    {...register('number', {
                        required: {
                            value: true,
                            message: 'Card number cannot be blank'
                        },
                        pattern: {
                            value: /^\d{16}$/,
                            message: 'Please enter a valid card number'
                        }
                    })}
                />
            </Stack>
            <Stack
                direction='row'
                spacing={2}
            >
                <Stack
                    spacing={1}
                    flex={1}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={14}
                    >
                        CVC/CVV
                    </Typography>
                    <TextField
                        placeholder='CVC'
                        type='tel'
                        inputMode='numeric'
                        error={!!errors.cvv}
                        helperText={errors.cvv?.message?.toString()}
                        InputProps={{
                            sx: {
                                borderRadius: 0
                            },
                        }}
                        inputProps={{
                            sx: {
                                py: 1.5
                            }
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
                        {...register('cvv', {
                            required: {
                                value: true,
                                message: 'CVV / CVC cannot be blank'
                            },
                            pattern: {
                                value: /^\d{3}$/,
                                message: 'Enter a valid CVV / CVC'
                            }
                        })}
                    />
                </Stack>
                <Stack
                    spacing={1}
                    flex={1}
                >
                    <Typography
                        fontFamily='UdemySansBold'
                        fontSize={14}
                    >
                        Expiry date
                    </Typography>
                    <TextField
                        placeholder='MM/YY'
                        type='tel'
                        inputMode='numeric'
                        error={!!errors.expiry}
                        helperText={errors.expiry?.message?.toString()}
                        InputProps={{
                            sx: {
                                borderRadius: 0
                            },
                        }}
                        inputProps={{
                            sx: {
                                py: 1.5
                            }
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
                        {...register('expiry', {
                            required: {
                                value: true,
                                message: 'Expiry date cannot be blank'
                            },
                            pattern: {
                                value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                                message: 'Expiry date should be in MM/YY format',
                            }
                        })}
                    />
                </Stack>
            </Stack>
        </Stack>
    )
}

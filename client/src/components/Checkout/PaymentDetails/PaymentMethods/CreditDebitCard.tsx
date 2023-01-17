import { Box, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function CreditDebitCard() {
    const { handleSubmit, register } = useForm()

    const onSubmit = (values: object, e: any) => {
        console.log(values)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
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
                        InputProps={{
                            sx: {
                                borderRadius: 0
                            },
                            required: true
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
                            required: true
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
                        InputProps={{
                            sx: {
                                borderRadius: 0
                            },
                            required: true
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
                        {...register('card', {
                            required: true
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
                            InputProps={{
                                sx: {
                                    borderRadius: 0
                                },
                                required: true
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
                            {...register('card', {
                                required: true
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
                            InputProps={{
                                sx: {
                                    borderRadius: 0
                                },
                                required: true
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
                            {...register('card', {
                                required: true
                            })}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </form>
    )
}

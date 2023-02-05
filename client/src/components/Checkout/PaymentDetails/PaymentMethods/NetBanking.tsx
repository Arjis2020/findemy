import { ExpandMore } from '@mui/icons-material'
import { NativeSelect, Stack, Typography } from '@mui/material'
import React from 'react'
import { PaymentMethodProps } from '../..'

export default function NetBanking({ formValues: { register, formState: { errors }}, banks }: PaymentMethodProps) {
    return (
        <Stack
            sx={{
                py: 4,
                px: 2
            }}
            spacing={2}
        >
            <Typography>
                In order to complete your transaction, we will transfer you over to Razorpay's secure servers.
            </Typography>
            <Stack
                spacing={0.5}
            >
                <Stack
                    direction='row'
                    alignItems='center'
                    spacing={2}
                    sx={{
                        border: theme => `1px solid ${errors.bank ? theme.palette.error.main : theme.palette.common.black}`,
                        py: 1,
                        px: 1.5,
                        width: '100%',
                        transition: '0.3s all ease',
                        "&:hover": {
                            background: 'rgba(0,0,0,0.04)'
                        }
                    }}
                >
                    <NativeSelect
                        fullWidth
                        IconComponent={() => null}
                        id='sort-by'
                        error={!!errors.bank}
                        disableUnderline
                        inputProps={{
                            sx: {
                                "&:focus": {
                                    background: 'none'
                                }
                            },
                        }}
                        defaultValue='disabled'
                        {...register('bank', {
                            validate: (value) => value !== 'disabled' || 'Please select a bank',
                        })}
                    >
                        <option
                            disabled
                            value='disabled'
                        >
                            Please select...
                        </option>
                        {banks && Object.keys(banks).map(key => {
                            const item = banks[key]
                            return (
                                <option
                                    value={key}
                                    key={key}
                                >
                                    {item}
                                </option>
                            )
                        })}
                    </NativeSelect>
                    <ExpandMore />
                </Stack>
                <Typography
                    variant='caption'
                    sx={{
                        color: theme => theme.palette.error.main
                    }}
                >
                    {errors.bank?.message?.toString()}
                </Typography>
            </Stack>
        </Stack>
    )
}

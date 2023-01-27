import { ExpandMore } from '@mui/icons-material'
import { FormControl, NativeSelect, Stack, Theme, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { PaymentMethodProps } from '..'

export default function StateTerritory({ formValues: { register, formState: { errors } } }: PaymentMethodProps) {
    const stateTerritories = [
        'Andaman and Nicobar Islands',
        'Andhra Pradesh',
        'Arunachal Pradesh',
        'Assam',
        'Bihar',
        'Chandigarh',
        'Chhattisgarh',
        'Dadra and Nagar Haveli and Daman and Diu',
        'Goa',
        'Gujarat',
        'Haryana',
        'Himachal Pradesh',
        'Jammu and Kashmir',
        'Jharkhand',
        'Karnataka',
        'Kerala',
        'Ladakh',
        'Lakshadweep',
        'Madhya Pradesh',
        'Maharashtra',
        'Manipur',
        'Meghalaya',
        'Mizoram',
        'Nagaland',
        'NCT of Delhi',
        'Odisha',
        'Puducherry',
        'Punjab',
        'Rajasthan',
        'Sikkim',
        'Tamil Nadu',
        'Telangana',
        'Tripura',
        'Uttarakhand',
        'Uttar Pradesh',
        'West Bengal'
    ]

    return (
        <Stack
            spacing={1}
            flex={1}
        >
            <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
            >
                <Typography
                    sx={{
                        fontFamily: 'UdemySansBold',
                        color: theme => theme.palette.common.black,
                        fontSize: 14,
                        whiteSpace: 'nowrap'
                    }}
                >
                    State / Union Territory
                </Typography>
                <Typography
                    variant='caption'
                >
                    Required
                </Typography>
            </Stack>
            <Stack
                spacing={0.5}
            >
                <FormControl
                    fullWidth
                    variant='standard'
                >
                    <Stack
                        direction='row'
                        alignItems='center'
                        sx={{
                            // minWidth: '11rem',
                            // width: matches ? '100%' : 'unset',
                            border: theme => `1px solid ${!!errors.state ? theme.palette.error.main : theme.palette.common.black}`,
                            py: 1,
                            px: 1.5,
                            width: '100%',
                            transition: '0.3s all ease',
                            "&:hover": {
                                background: 'rgba(0,0,0,0.04)'
                            }
                        }}
                        spacing={2}
                    >
                        <NativeSelect
                            fullWidth
                            IconComponent={() => null}
                            id='state-territory'
                            disableUnderline
                            error={!!errors.state}
                            inputProps={{
                                sx: {
                                    "&:focus": {
                                        background: 'none'
                                    }
                                },
                                required: true
                            }}
                            defaultValue='disabled'
                            {...register('address', {
                                validate: (value) => value !== 'disabled' || 'State / Union Territory needs to be specified'
                            })}
                        >
                            <option
                                disabled
                                value='disabled'
                            >
                                Please select...
                            </option>
                            {stateTerritories.map(item => {
                                return (
                                    <option
                                        value={item}
                                    >
                                        {item}
                                    </option>
                                )
                            })}
                        </NativeSelect>
                        <ExpandMore />
                    </Stack>
                </FormControl>
                <Typography
                    variant='caption'
                    sx={{
                        color: theme => theme.palette.error.main
                    }}
                >
                    {errors.address?.message?.toString()}
                </Typography>
            </Stack>
        </Stack>
    )
}
